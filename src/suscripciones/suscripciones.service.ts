import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CrearSuscripcionDTO } from './dto/crear-suscripcion.dto';
import { Suscripcion } from './interfaces/suscripcion.interface';
import { ModuleRef } from '@nestjs/core';
import { ObjectIdPipe } from 'src/helpers/validadores/ObjectIdPipe';
import * as moment from 'moment';

@Injectable( )
export class SuscripcionesService {

	public constructor(
		@InjectModel( 'Suscripcion' )
		private readonly suscripcionModel: Model<Suscripcion>
	) { }

	public async obtenerTodas( ): Promise<Suscripcion[ ]> {
		return this.suscripcionModel.find( ).exec( );
	}

	public async obtenerSuscripcionesPremium( ): Promise<Suscripcion[ ]> {
		return this.suscripcionModel.find( { tipoDeSuscripcion: 'Premium' } ).exec( );
	}

	public async obtenerSuscripcionesRegular( ): Promise<Suscripcion[ ]> {
		return this.suscripcionModel.find( { tipoDeSuscripcion: 'Regular' } ).exec( );
	}

	public async obtenerFechaMayor( ): Promise<Suscripcion[ ]> {
		return this.suscripcionModel.find( { tipoDeSuscripcion: 'Regular' } ).exec( );
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
		const suscripcionAgregada = await new this.suscripcionModel( crearSuscripcionDTO ).save( );
		return suscripcionAgregada;
	}

	public async eliminar( idSuscripcion: Types.ObjectId ): Promise<Suscripcion | null> {
		return this.suscripcionModel.findByIdAndRemove( idSuscripcion ).exec( );
	}

	public async obtenerSuscripcionRegularActual(): Promise<Suscripcion | null> {
		const suscripcionRegularActual = await this.suscripcionModel
			.findOne( { tipoDeSuscripcion: 'Regular' } )
			.sort('-fechaDeCreacion')
			.exec();

		return suscripcionRegularActual;
	}

	public async obtenerSuscripcionPremiumActual(): Promise<Suscripcion | null> {
		const suscripcionPremiumActual = await this.suscripcionModel
			.findOne( { tipoDeSuscripcion: 'Premium' } )
			.sort('-fechaDeCreacion')
			.exec();

		return suscripcionPremiumActual;
	}

}