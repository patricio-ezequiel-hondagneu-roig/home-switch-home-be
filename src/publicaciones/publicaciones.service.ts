import { Injectable, NotImplementedException, NotFoundException, forwardRef, Inject, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Publicacion } from './interfaces/publicacion.interface';
import { CrearPublicacionDTO } from './dto/crear-publicacion.dto';
import { ModificarPublicacionDTO } from './dto/modificar-publicacion.dto';
import { ObjectIdPipe } from 'src/helpers/validadores/ObjectIdPipe';
import { ResidenciasService } from 'src/residencias/residencias.service';

@Injectable( )
export class PublicacionesService {

	public constructor(
		@InjectModel( 'Publicacion' )
		private readonly publicacionModel: Model<Publicacion>,
		@Inject( forwardRef( ( ) => ResidenciasService ) )
		private readonly residenciasService: ResidenciasService,
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

		const publicacionAgregada = new this.publicacionModel( crearPublicacionDTO ).save( );
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

		if ( ! publicacion.estaEnSubasta && modificarPublicacionDTO.estaEnSubasta ) {
			throw new BadRequestException( `No se puede volver a subastar una publicación cuya subasta finalizó.` );
		}
		else if ( publicacion.estaEnSubasta && ! modificarPublicacionDTO.estaEnSubasta ) {
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

	private async cerrarSubasta( publicacion: Publicacion ): Promise<void> {
		// TODO: Calcular ganador de la subasta, y crear adquisición en caso de que haya uno
	}

}