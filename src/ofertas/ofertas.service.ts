import { forwardRef, Inject, Injectable, NotFoundException, UnprocessableEntityException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CrearOfertaDTO } from './dto/crear-oferta.dto';
import { Oferta } from './interfaces/oferta.interface';
import { ModificarOfertaDTO } from './dto/modificar-oferta.dto';
import { Publicacion } from 'src/publicaciones/interfaces/publicacion.interface';
import { PublicacionesService } from 'src/publicaciones/publicaciones.service';
import * as moment from 'moment';

@Injectable( )
export class OfertasService {

	public constructor(
		@InjectModel( 'Oferta' )
		private readonly ofertaModel: Model<Oferta>,
	) { }

	public async obtenerTodas( ): Promise<Oferta[ ]> {
		return this.ofertaModel.find( ).exec( );
	}

	public async obtenerPorId( idOferta: Types.ObjectId ): Promise<Oferta> {
		const oferta = await this.ofertaModel.findById( idOferta ).exec( );

		if ( oferta !== null ) {
			return oferta;
		}
		else {
			throw new NotFoundException( `No existen ofertas con idOferta "${ idOferta }".` );
		}
	}

	public async obtenerPorIdPublicacion( idPublicacion: Types.ObjectId ): Promise<Oferta[ ]> {
		return this.ofertaModel.find({
			idPublicacion: idPublicacion
		});
	}

	public async agregar( crearOfertaDTO: CrearOfertaDTO ): Promise<Oferta> {
		const ofertaAgregada = new this.ofertaModel( crearOfertaDTO ).save( );
		return ofertaAgregada;
	}

	public async modificar(
		idOferta: Types.ObjectId,
		modificarOfertaDTO: ModificarOfertaDTO
	): Promise<Oferta> {
		const ofertaModificada = await this.ofertaModel
			.findByIdAndUpdate( idOferta, modificarOfertaDTO, { new: true } )
			.exec( );

		if ( ofertaModificada !== null ) {
			return ofertaModificada;
		}
		else {
			throw new NotFoundException(
				`No existe ninguna oferta con el ID "${ idOferta }"`
			);
		}
	}

	public async eliminar( idOferta: Types.ObjectId ): Promise<Oferta | null> {
		return this.ofertaModel.findByIdAndRemove( idOferta ).exec( );
	}
}