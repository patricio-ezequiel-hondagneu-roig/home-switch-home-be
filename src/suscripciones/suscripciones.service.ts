import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CrearSuscripcionDTO } from './dto/crear-suscripcion.dto';
import { Suscripcion } from './interfaces/suscripcion.interface';
import { ModuleRef } from '@nestjs/core';
import { ObjectIdPipe } from 'src/helpers/validadores/ObjectIdPipe';

@Injectable( )
export class SuscripcionesService {

	public constructor(
		@InjectModel( 'Suscripcion' )
		private readonly suscripcionModel: Model<Suscripcion>
	) { }

	public async obtenerTodas( ): Promise<Suscripcion[ ]> {
		return this.suscripcionModel.find( ).exec( );
	}

	public async obtenerPorId( idSuscripcion: Types.ObjectId ): Promise<Suscripcion> {
		const suscripcion = await this.suscripcionModel.findById( idSuscripcion ).exec( );

		if ( suscripcion !== null ) {
			return suscripcion;
		}
		else {
			throw new NotFoundException( `No existen suscripciones con idSuscripcion "${ idSuscripcion }".` );
		}
	}

	public async agregar( crearSuscripcionDTO: CrearSuscripcionDTO ): Promise<Suscripcion> {
		const suscripcionAgregada = new this.suscripcionModel( crearSuscripcionDTO ).save( );
		return suscripcionAgregada;
	}

	public async eliminar( idSuscripcion: Types.ObjectId ): Promise<Suscripcion | null> {
		return this.suscripcionModel.findByIdAndRemove( idSuscripcion ).exec( );
	}

}