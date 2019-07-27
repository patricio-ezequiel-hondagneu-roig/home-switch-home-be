import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException, NotImplementedException, UnprocessableEntityException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ObjectIdPipe } from 'src/helpers/validadores/ObjectIdPipe';
import { ResidenciasService } from '../residencias/residencias.service';
import { Cliente } from 'src/clientes/interfaces/cliente.interface';
import { ClientesService } from 'src/clientes/clientes.service';
import { Publicacion } from 'src/publicaciones/interfaces/publicacion.interface';
import * as moment from 'moment';
import { CrearPublicacionDTO } from 'src/publicaciones/dto/crear-publicacion.dto';
import { PublicacionesService } from 'src/publicaciones/publicaciones.service';
import { ModificarPublicacionDTO } from 'src/publicaciones/dto/modificar-publicacion.dto';

@Injectable( )
export class SubastasService {

	public constructor(
		@InjectModel( 'Publicacion' )
		private readonly publicacionModel: Model<Publicacion>,
		@Inject( forwardRef( ( ) => PublicacionesService ) )
		private readonly publicacionesService: PublicacionesService,
		@Inject( forwardRef( ( ) => ResidenciasService ) )
		private readonly residenciasService: ResidenciasService,
		@Inject( forwardRef( ( ) => ClientesService ) )
		private readonly clientesService: ClientesService,
	) { }

	/**
	 * Retorna todas las publicaciones en subasta.
	 */
	public async obtenerTodas( ): Promise<Publicacion[ ]> {
		const publicaciones: Publicacion[ ] = await this.publicacionModel.find( ).exec( );
		const subastas: Publicacion[ ] = publicaciones.filter( ( _publicacion ) => {
			return this.esSubasta( _publicacion );
		});

		return subastas;
	}

	/**
	 * Retorna la publicación en subasta con el ID indicado.
	 *
	 * Arroja una excepción si no existe.
	 *
	 * @param idPublicacion ID de la subasta a retornar
	 */
	public async obtenerPorId( idPublicacion: Types.ObjectId ): Promise<Publicacion> {
		const publicacion: Publicacion | null = await this.publicacionModel.findById( idPublicacion ).exec( );

		if ( publicacion !== null && this.esSubasta( publicacion ) ) {
			return publicacion;
		}
		else {
			throw new NotFoundException( `No existen subastas con idSubasta "${ idPublicacion }".` );
		}
	}

	/**
	 * Agrega una publicación en subasta al sistema.
	 *
	 * @param crearPublicacionDTO DTO de la publicación en subasta a crear
	 */
	public async agregar( crearPublicacionDTO: CrearPublicacionDTO ): Promise<Publicacion> {
		const idResidencia = await new ObjectIdPipe( ).transform( crearPublicacionDTO.idResidencia );
		const residencia = await this.residenciasService.obtenerPorId( idResidencia );

		if ( crearPublicacionDTO.montoInicialDeSubasta < residencia.montoInicialDeSubasta ) {
			throw new UnprocessableEntityException(
				`No se puede crear la subasta porque el monto inicial provisto ` +
				`(${ crearPublicacionDTO.montoInicialDeSubasta }) es inferior al monto mínimo ` +
				`permitido (${ residencia.montoInicialDeSubasta }).`
			);
		}

		const publicacion: Publicacion = new this.publicacionModel({
			...crearPublicacionDTO,
			cerroSubasta: false,
		});

		const fechaDeInicio = moment.utc( publicacion.fechaDeInicioDeSemana );
		const fechaDeFin = fechaDeInicio.clone( ).add({ days: 7 });
		let publicacionesSolapadas = await this.publicacionesService.obtenerEntreFechas( fechaDeInicio, fechaDeFin );
		publicacionesSolapadas = publicacionesSolapadas.filter( ( _publicacion ) => {
			return _publicacion.idResidencia.equals( crearPublicacionDTO.idResidencia );
		});

		if ( publicacionesSolapadas.length > 0 ) {
			throw new ConflictException(
				`No se puede crear la subasta porque ya existe otra publicación para la residencia ` +
				`en la fecha provista.`
			);
		}

		if ( this.esSubasta( publicacion ) ) {
			publicacion.save( );
			return publicacion;
		}
		else {
			const formatoAMostrar: string = '[el] DD-MM-YYYY [a las] HH:mm:ss';

			const fechaDeInicioMinimaAMostrar: string = moment
				.utc( )
				.add({ months: 6 })
				.subtract({ days: 3 })
				.format( formatoAMostrar );
			const fechaDeInicioMaximaAMostrar: string = moment
				.utc( )
				.add({ months: 6 })
				.format( formatoAMostrar );

			throw new UnprocessableEntityException(
				`No se puede crear la subasta porque la fecha de inicio de semana provista no recae dentro del ` +
				`período necesario (desde ${ fechaDeInicioMinimaAMostrar } hasta ${ fechaDeInicioMaximaAMostrar }).`
			);
		}
	}

	public async modificar(
		idPublicacion: Types.ObjectId,
		modificarPublicacionDTO: ModificarPublicacionDTO
	): Promise<Publicacion> {
		const publicacion = await this.obtenerPorId( idPublicacion );
		const residencia = await this.residenciasService.obtenerPorId( publicacion.idResidencia );

		if ( modificarPublicacionDTO.montoInicialDeSubasta < residencia.montoInicialDeSubasta ) {
			throw new UnprocessableEntityException(
				`No se puede modificar la subasta porque el monto inicial provisto ` +
				`(${ modificarPublicacionDTO.montoInicialDeSubasta }) es inferior al monto mínimo ` +
				`permitido (${ residencia.montoInicialDeSubasta }).`
			);
		}

		if ( publicacion.cerroSubasta && ! modificarPublicacionDTO.cerroSubasta ) {
			throw new BadRequestException( `No se puede volver a abrir una subasta finalizada.` );
		}
		else if ( ! publicacion.cerroSubasta && modificarPublicacionDTO.cerroSubasta ) {
			await this.publicacionesService.cerrarSubasta( publicacion );
		}

		const publicacionModificada = await this.publicacionModel
			.findByIdAndUpdate( idPublicacion, modificarPublicacionDTO, { new: true } )
			.exec( );

		if ( publicacionModificada !== null ) {
			return publicacionModificada;
		}
		else {
			throw new NotFoundException(
				`No existe ninguna subasta con el ID "${ idPublicacion }"`
			);
		}
	}

	public async eliminar( idPublicacion: Types.ObjectId ): Promise<Publicacion | null> {
		return this.publicacionModel.findByIdAndRemove( idPublicacion ).exec( );
	}

	public async obtenerPorIdResidencia( idResidencia: Types.ObjectId ): Promise<Publicacion[ ]> {
		const publicaciones: Publicacion[ ] = await this.publicacionModel
			.find({
				idResidencia: idResidencia,
			})
			.exec( );

		return publicaciones.filter( ( _publicacion ) => this.esSubasta( _publicacion ) );
	}

	public esSubasta( publicacion: Publicacion ): boolean {
		const fechaDeInicioDeSemana = moment.utc( publicacion.fechaDeInicioDeSemana );

		const fechaDeInicioDeSubasta = fechaDeInicioDeSemana.clone( ).subtract({ months: 6 });
		const fechaDeFinDeSubasta = fechaDeInicioDeSubasta.clone( ).add({ days: 3 });
		const fechaActual = moment.utc( );

		return fechaActual > fechaDeInicioDeSubasta && fechaActual < fechaDeFinDeSubasta;
	}

	public async cerrar( idSubasta: Types.ObjectId ): Promise<Cliente | null> {
		throw new NotImplementedException( );
	}

}