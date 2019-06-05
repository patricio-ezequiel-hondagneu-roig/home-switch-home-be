import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Moment } from 'moment';
import { Response } from 'express';
import { Types } from 'mongoose';
import { ObjectIdPipe } from 'src/helpers/validadores/ObjectIdPipe';
import { CrearSuscripcionDTO } from './dto/crear-suscripcion.dto';
import { Suscripcion } from './interfaces/suscripcion.interface';
import { SuscripcionesService } from './suscripciones.service';

@Controller( '/suscripciones' )
export class SuscripcionesController {

	public constructor(
		private readonly suscripcionesService: SuscripcionesService,
	) { }

	@Get( '/' )
	public async obtenerSuscripciones(
		@Res( ) respuesta: Response,
	): Promise<Response> {
		const suscripciones: Suscripcion[ ] = await this.suscripcionesService.obtenerTodas( );
		return respuesta.status( HttpStatus.OK ).json( suscripciones );
	}

	@Get( '/:idSuscripcion' )
	public async obtenerSuscripcionPorId(
		@Res( ) respuesta: Response,
		@Param( 'idSuscripcion', new ObjectIdPipe( ) ) idSuscripcion: Types.ObjectId,
	): Promise<Response> {
		const suscripcionObtenida: Suscripcion = await this.suscripcionesService.obtenerPorId( idSuscripcion );
		return respuesta.status( HttpStatus.OK ).json( suscripcionObtenida );
	}

	/*
	* Tener en cuenta que al "modificar" una suscripcion (en realidad se crea una nueva suscripcion)
	* se tendría que crear con una fechaDeCreacion con un valor de fecha igual al día de hoy,
	* pero no nos sirve eso xq' si queremos testear diferentes cosas sobre las suscripciones
	* es mejor dejar el campo de fechaDeCreacion como un valor a completar
	*/
	@Post( '/' )
	public async crearSuscripcion(
		@Res( ) respuesta: Response,
		@Body( ) crearSuscripcionDTO: CrearSuscripcionDTO
	): Promise<Response> {
		const suscripcionAgregada: Suscripcion = await this.suscripcionesService.agregar( crearSuscripcionDTO );
		return respuesta.status( HttpStatus.CREATED ).json( suscripcionAgregada );
	}

	@Delete( '/:idSuscripcion' )
	public async eliminarSuscripcion(
		@Res( ) respuesta: Response,
		@Param( 'idSuscripcion', new ObjectIdPipe( ) ) idSuscripcion: Types.ObjectId
	): Promise<Response> {
		const suscripcionEliminada: Suscripcion | null = await this.suscripcionesService.eliminar( idSuscripcion );

		if ( suscripcionEliminada === null ) {
			return respuesta.status( HttpStatus.NO_CONTENT ).json( null );
		}
		else {
			return respuesta.status( HttpStatus.OK ).json( suscripcionEliminada );
		}
	}

}