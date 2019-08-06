import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { Types } from 'mongoose';
import { ObjectIdPipe } from '../helpers/validadores/ObjectIdPipe';
import { CrearPublicacionDTO } from './dto/crear-publicacion.dto';
import { ModificarPublicacionDTO } from './dto/modificar-publicacion.dto';
import { Publicacion } from './interfaces/publicacion.interface';
import { PublicacionesService } from './publicaciones.service';

@Controller( '/publicaciones' )
export class PublicacionesController {

	public constructor(
		private readonly publicacionesService: PublicacionesService,
	) { }

	@Get( '/' )
	public async obtenerPublicaciones(
		@Res( ) respuesta: Response
	): Promise<Response> {
		const publicaciones: Publicacion[ ] = await this.publicacionesService.obtenerTodas( );
		return respuesta.status( HttpStatus.OK ).json( publicaciones );
	}

	@Get( '/:idPublicacion' )
	public async obtenerPublicacionPorId(
		@Res( ) respuesta: Response,
		@Param( 'idPublicacion', new ObjectIdPipe( ) ) idPublicacion: Types.ObjectId,
	): Promise<Response> {
		const publicacionObtenida: Publicacion = await this.publicacionesService.obtenerPorId( idPublicacion );
		return respuesta.status( HttpStatus.OK ).json( publicacionObtenida );
	}

	@Post( '/' )
	public async agregarPublicacion(
		@Res( ) respuesta: Response,
		@Body( ) crearPublicacionDTO: CrearPublicacionDTO
	): Promise<Response> {
		const publicacionAgregada: Publicacion = await this.publicacionesService.agregar( crearPublicacionDTO );
		return respuesta.status( HttpStatus.CREATED ).json( publicacionAgregada );
	}

	@Put( '/:idPublicacion' )
	public async modificarPublicacion(
		@Res( ) respuesta: Response,
		@Param( 'idPublicacion', new ObjectIdPipe( ) ) idPublicacion: Types.ObjectId,
		@Body( ) modificarPublicacionDTO: ModificarPublicacionDTO
	): Promise<Response> {
		const publicacionModificada: Publicacion = await this.publicacionesService.modificar(
			idPublicacion,
			modificarPublicacionDTO
		);
		return respuesta.status( HttpStatus.OK ).json( publicacionModificada );
	}

	@Put( '/:idSubasta/finalizar' )
	public async cerrarSubasta(
		@Res( ) respuesta: Response,
		@Param( 'idSubasta', new ObjectIdPipe( ) ) idSubasta: Types.ObjectId
	): Promise<Response> {
		const publicacion: Publicacion = await this.publicacionesService.obtenerPorId( idSubasta );
		await this.publicacionesService.cerrarSubasta( publicacion );
		return respuesta.status( HttpStatus.OK );
	}

	@Delete( '/:idPublicacion' )
	public async eliminarPublicacion(
		@Res( ) respuesta: Response,
		@Param( 'idPublicacion', new ObjectIdPipe( ) ) idPublicacion: Types.ObjectId
	): Promise<Response> {
		const publicacionEliminada: Publicacion | null = await this.publicacionesService.eliminar( idPublicacion );

		if ( publicacionEliminada === null ) {
			return respuesta.status( HttpStatus.NO_CONTENT ).json( null );
		}
		else {
			return respuesta.status( HttpStatus.OK ).json( publicacionEliminada );
		}
	}

}