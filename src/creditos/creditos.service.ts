import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CrearCreditoBDDTO } from './dto/crear-credito.dto';
import { CreditoBD } from './interfaces/creditoBD.interface';
import { ModuleRef } from '@nestjs/core';
import { ObjectIdPipe } from 'src/helpers/validadores/ObjectIdPipe';
import * as moment from 'moment';

@Injectable( )
export class CreditosService {

	public constructor(
		@InjectModel( 'Credito' )
		private readonly creditoModel: Model<CreditoBD>
	) { }

	public async obtenerTodos( ): Promise<CreditoBD[ ]> {
		return this.creditoModel.find( ).exec( );
	}

	public async obtenerPorId( idCredito: Types.ObjectId ): Promise<CreditoBD> {
		const credito = await this.creditoModel.findById( idCredito ).exec( );

		if ( credito !== null ) {
			return credito;
		}
		else {
			throw new NotFoundException( `No existen Creditos con idCredito "${ idCredito }".` );
		}
	}

	public async agregar( crearCreditoDTO: CrearCreditoBDDTO ): Promise<CreditoBD> {
		const creditoAgregada = await new this.creditoModel( crearCreditoDTO ).save( );
		return creditoAgregada;
	}

	public async obtenerCreditoActual(): Promise<CreditoBD | null> {
		const creditoRegularActual = await this.creditoModel
			.findOne( )
			.sort('-fechaDeCreacion')
			.exec();

		return creditoRegularActual;
	}
}