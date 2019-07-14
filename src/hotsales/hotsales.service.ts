import { forwardRef, Inject, Injectable, NotFoundException, UnprocessableEntityException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CrearHotsaleDTO } from './dto/crear-hotsale.dto';
import { Hotsale } from './interfaces/hotsale.interface';
import { ModuleRef } from '@nestjs/core';
import { ObjectIdPipe } from 'src/helpers/validadores/ObjectIdPipe';

/**
 * Servicio que administra las operaciones sobre los hot sales en la base de datos.
 */
@Injectable( )
export class HotsalesService {

	public constructor(
		@InjectModel( 'Hotsale' )
		private readonly hotsaleModel: Model<Hotsale>
	) { }

	public async obtenerTodos( ): Promise<Hotsale[ ]> {
		return this.hotsaleModel.find( ).exec( );
	}

	public async obtenerPorId( idHotsale: Types.ObjectId ): Promise<Hotsale> {
		const hotsale = await this.hotsaleModel.findById( idHotsale ).exec( );

		if ( hotsale !== null ) {
			return hotsale;
		}
		else {
			throw new NotFoundException( `No existen hot sales con idHotsale "${ idHotsale }".` );
		}
	}

	public async agregar( crearHotsaleDTO: CrearHotsaleDTO ): Promise<Hotsale> {
		const hotsaleAgregado = new this.hotsaleModel( crearHotsaleDTO ).save( );
		return hotsaleAgregado;
	}

	public async eliminar( idHotsale: Types.ObjectId ): Promise<Hotsale | null> {

		return this.hotsaleModel.findByIdAndRemove( idHotsale ).exec( );

	}

}