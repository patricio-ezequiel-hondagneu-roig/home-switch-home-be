import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { Types } from 'mongoose';
import { ObjectIdPipe } from '../helpers/validadores/ObjectIdPipe';
import { CrearSolicitudDTO } from './dto/crear-solicitud.dto';
import { SolicitudesService } from '../solicitudes/solicitudes.service';
import { Solicitud } from './interfaces/solicitud.interface';

@Controller( '/solicitudes' )
export class SolicitudesController {

	public constructor(
		private readonly solicitudesService: SolicitudesService,
	) { }

	@Get( '/' )
	public async obtenerSolicitudes(
		@Res( ) respuesta: Response
	): Promise<Response> {
		const solicitudes: Solicitud[ ] = await this.solicitudesService.obtenerTodas( );
		return respuesta.status( HttpStatus.OK ).json( solicitudes );
	}

	@Get( '/:idSolicitud' )
	public async obtenerSolicitudPorId(
		@Res( ) respuesta: Response,
		@Param( 'idSolicitud', new ObjectIdPipe( ) ) idSolicitud: Types.ObjectId,
	): Promise<Response> {
		const solicitudObtenida: Solicitud = await this.solicitudesService.obtenerPorId( idSolicitud );
		return respuesta.status( HttpStatus.OK ).json( solicitudObtenida );
	}

	@Post( '/' )
	public async agregarSolicitud(
		@Res( ) respuesta: Response,
		@Body( ) crearSolicitudDTO: CrearSolicitudDTO
	): Promise<Response> {
		const solicitudAgregada: Solicitud = await this.solicitudesService.agregar( crearSolicitudDTO );
		return respuesta.status( HttpStatus.CREATED ).json( solicitudAgregada );
	}

	@Delete( '/:idSolicitud' )
	public async eliminarSolicitud(
		@Res( ) respuesta: Response,
		@Param( 'idSolicitud', new ObjectIdPipe( ) ) idSolicitud: Types.ObjectId
	): Promise<Response> {
		const solicitudEliminada: Solicitud | null = await this.solicitudesService.eliminar( idSolicitud );

		if ( solicitudEliminada === null ) {
			return respuesta.status( HttpStatus.NO_CONTENT ).json( null );
		}
		else {
			return respuesta.status( HttpStatus.OK ).json( solicitudEliminada );
		}
	}

}