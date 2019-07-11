import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { Types } from 'mongoose';
import { ObjectIdPipe } from '../helpers/validadores/ObjectIdPipe';
import { CrearCreditoBDDTO } from './dto/crear-credito.dto';
import { CreditoBD } from './interfaces/creditoBD.interface';
import { CreditosService } from './creditos.service';

@Controller( '/creditos' )
export class CreditosController {

	public constructor(
		private readonly creditosService: CreditosService,
	) { }

	@Get( '/' )
	public async obtenerCreditos(
		@Res( ) respuesta: Response
	): Promise<Response> {
		const creditos: CreditoBD[ ] = await this.creditosService.obtenerTodos( );
		return respuesta.status( HttpStatus.OK ).json( creditos );
	}

	@Post( '/' )
	public async agregarCredito(
		@Res( ) respuesta: Response,
		@Body( ) crearCreditoDTO: CrearCreditoBDDTO
	): Promise<Response> {
		const creditoAgregado: CreditoBD = await this.creditosService.agregar( crearCreditoDTO );
		return respuesta.status( HttpStatus.CREATED ).json( creditoAgregado );
	}

}