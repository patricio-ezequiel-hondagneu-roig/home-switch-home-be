import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ObjectIdPipe } from 'src/helpers/validadores/ObjectIdPipe';
import { ResidenciasService } from 'src/residencias/residencias.service';
import { CrearPublicacionDTO } from './dto/crear-publicacion.dto';
import { ModificarPublicacionDTO } from './dto/modificar-publicacion.dto';
import { Publicacion } from './interfaces/publicacion.interface';
import { AdquisicionesService } from 'src/adquisiciones/adquisiciones.service';
import { SubastasService } from 'src/subastas/subastas.service';
import * as moment from 'moment';
import { OfertasService } from 'src/ofertas/ofertas.service';

@Injectable( )
export class PublicacionesService {

	public constructor(
		@InjectModel( 'Publicacion' )
		private readonly publicacionModel: Model<Publicacion>,
		@Inject( forwardRef( ( ) => SubastasService ) )
		private readonly subastasService: SubastasService,
		@Inject( forwardRef( ( ) => ResidenciasService ) )
		private readonly residenciasService: ResidenciasService,
		@Inject( forwardRef( ( ) => AdquisicionesService ) )
		private readonly adquisicionesService: AdquisicionesService,
		@Inject( forwardRef( ( ) => OfertasService ) )
		private readonly ofertasService: OfertasService,
	) { }

	public async obtenerTodas( ): Promise<Publicacion[ ]> {
		return this.publicacionModel.find( ).exec( );
	}

	public async obtenerPorId( idPublicacion: Types.ObjectId ): Promise<Publicacion> {
		const publicacion = await this.publicacionModel.findById( idPublicacion ).exec( );

		if ( publicacion !== null ) {
			return publicacion;
		}
		else {
			throw new NotFoundException( `No existen publicaciones con idPublicacion "${ idPublicacion }".` );
		}
	}

	public async agregar( crearPublicacionDTO: CrearPublicacionDTO ): Promise<Publicacion> {
		const idResidencia = await ObjectIdPipe.transform( crearPublicacionDTO.idResidencia );
		const residencia = await this.residenciasService.obtenerPorId( idResidencia );

		if ( crearPublicacionDTO.montoInicialDeSubasta < residencia.montoInicialDeSubasta ) {
			throw new BadRequestException(
				`No se puede crear la publicacion porque el monto inicial de subasta provisto ` +
				`(${ crearPublicacionDTO.montoInicialDeSubasta }) es inferior al monto mínimo ` +
				`permitido (${ residencia.montoInicialDeSubasta }).`
			);
		}

		const publicacionAgregada = new this.publicacionModel({
			...crearPublicacionDTO,
			cerroSubasta: false,
		})
			.save( );
		return publicacionAgregada;
	}

	public async modificar(
		idPublicacion: Types.ObjectId,
		modificarPublicacionDTO: ModificarPublicacionDTO
	): Promise<Publicacion> {
		const publicacion = await this.obtenerPorId( idPublicacion );
		const residencia = await this.residenciasService.obtenerPorId( publicacion.idResidencia );

		if ( modificarPublicacionDTO.montoInicialDeSubasta < residencia.montoInicialDeSubasta ) {
			throw new BadRequestException(
				`No se puede modificar la publicación porque el monto inicial de subasta provisto ` +
				`(${ modificarPublicacionDTO.montoInicialDeSubasta }) es inferior al monto mínimo ` +
				`permitido (${ residencia.montoInicialDeSubasta }).`
			);
		}

		if ( publicacion.cerroSubasta && ! modificarPublicacionDTO.cerroSubasta ) {
			throw new BadRequestException( `No se puede volver a subastar una publicación cuya subasta finalizó.` );
		}
		else if ( ! publicacion.cerroSubasta && modificarPublicacionDTO.cerroSubasta ) {
			await this.cerrarSubasta( publicacion );
		}

		const publicacionModificada = await this.publicacionModel
			.findByIdAndUpdate( idPublicacion, modificarPublicacionDTO, { new: true } )
			.exec( );

		if ( publicacionModificada !== null ) {
			return publicacionModificada;
		}
		else {
			throw new NotFoundException( `No existe ninguna publicación con el ID "${ idPublicacion }"` );
		}
	}

	public async eliminar( idPublicacion: Types.ObjectId ): Promise<Publicacion | null> {
		return this.publicacionModel.findByIdAndRemove( idPublicacion ).exec( );
	}

	public async obtenerPorIdResidencia( idResidencia: Types.ObjectId ): Promise<Publicacion[ ]> {
		return this.publicacionModel
			.find({
				idResidencia: idResidencia,
			})
			.exec( );
	}

	/**
	 * Retorna las publicaciones cuyo período de vigencia se solape con el período indicado por las fechas provistas.
	 *
	 * @param fechaDeInicio fecha de inicio del intervalo de búsqueda
	 * @param fechaDeFin fecha de fin del intervalo de búsqueda
	 */
	public async obtenerEntreFechas(
		fechaDeInicio: moment.Moment,
		fechaDeFin: moment.Moment
	): Promise<Publicacion[ ]> {
		const publicaciones = await this.publicacionModel.find( ).exec( );

		const publicacionesEntreFechas = publicaciones.filter( ( _publicacion ) => {
			const inicioDePublicacion = moment.utc( _publicacion.fechaDeInicioDeSemana );
			const finDePublicacion = inicioDePublicacion.clone( ).add({ days: 7 });

			const iniciaEnIntervalo = inicioDePublicacion < fechaDeFin && inicioDePublicacion >= fechaDeInicio;
			const finalizaEnIntervalo = finDePublicacion > fechaDeInicio && finDePublicacion <= fechaDeFin;

			return iniciaEnIntervalo || finalizaEnIntervalo;
		});

		return publicacionesEntreFechas;
	}

	public async cerrarSubasta( publicacion: Publicacion ): Promise<void> {
		/*
		 * Verificar que no esté adquirida, cerrada, la fecha permita cerrarla, tenga ofertas.
		 * Si no tiene ofertas cerrar vacante, caso contrario buscar la primera oferta no descalificada
		 * Si no hay ninguna oferta asi, cerrar vacante. Si la hay, crear y asociar adquisicion al ganador
		 */
	}

}