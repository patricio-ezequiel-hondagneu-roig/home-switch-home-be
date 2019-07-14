import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { Types } from 'mongoose';
import { ObjectIdPipe } from '../helpers/validadores/ObjectIdPipe';
import { CrearHotsaleDTO } from './dto/crear-hotsale.dto';
import { HotsalesService } from '../hotsales/hotsales.service';
import { Hotsale } from './interfaces/hotsale.interface';

@Controller( '/hotsales' )
export class HotsalesController {

	public constructor(
		private readonly hotsalesService: HotsalesService,
	) { }

	@Get( '/' )
	public async obtenerHotsales(
		@Res( ) respuesta: Response
	): Promise<Response> {
		const hotsales: Hotsale[ ] = await this.hotsalesService.obtenerTodos( );
		return respuesta.status( HttpStatus.OK ).json( hotsales );
	}

	@Get( '/:idHotsale' )
	public async obtenerHotsalePorId(
		@Res( ) respuesta: Response,
		@Param( 'idHotsale', new ObjectIdPipe( ) ) idHotsale: Types.ObjectId,
	): Promise<Response> {
		const hotsaleObtenida: Hotsale = await this.hotsalesService.obtenerPorId( idHotsale );
		return respuesta.status( HttpStatus.OK ).json( hotsaleObtenida );
	}

	@Post( '/' )
	public async agregarHotsale(
		@Res( ) respuesta: Response,
		@Body( ) crearHotsaleDTO: CrearHotsaleDTO
	): Promise<Response> {
		const hotsaleAgregada: Hotsale = await this.hotsalesService.agregar( crearHotsaleDTO );
		return respuesta.status( HttpStatus.CREATED ).json( hotsaleAgregada );
	}

	@Delete( '/:idHotsale' )
	public async eliminarHotsale(
		@Res( ) respuesta: Response,
		@Param( 'idHotsale', new ObjectIdPipe( ) ) idHotsale: Types.ObjectId
	): Promise<Response> {
		const hotsaleEliminado: Hotsale | null = await this.hotsalesService.eliminar( idHotsale );

		if ( hotsaleEliminado === null ) {
			return respuesta.status( HttpStatus.NO_CONTENT ).json( null );
		}
		else {
			return respuesta.status( HttpStatus.OK ).json( hotsaleEliminado );
		}
	}

}