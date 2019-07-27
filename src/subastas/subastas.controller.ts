import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { Types } from 'mongoose';
import { ObjectIdPipe } from 'src/helpers/validadores/ObjectIdPipe';
import { SubastasService } from './subastas.service';
import { Publicacion } from 'src/publicaciones/interfaces/publicacion.interface';
import { CrearPublicacionDTO } from 'src/publicaciones/dto/crear-publicacion.dto';
import { ModificarPublicacionDTO } from 'src/publicaciones/dto/modificar-publicacion.dto';

@Controller( '/subastas' )
export class SubastasController {

	public constructor(
		private readonly subastasService: SubastasService,
	) { }

	@Get( '/' )
	public async obtenerSubastas(
		@Res( ) respuesta: Response,
	): Promise<Response> {
		const subastas: Publicacion[ ] = await this.subastasService.obtenerTodas( );
		return respuesta.status( HttpStatus.OK ).json( subastas );
	}

	@Get( '/:idPublicacion' )
	public async obtenerSubastaPorId(
		@Res( ) respuesta: Response,
		@Param( 'idPublicacion', new ObjectIdPipe( ) ) idPublicacion: Types.ObjectId,
	): Promise<Response> {
		const subastaObtenida: Publicacion = await this.subastasService.obtenerPorId( idPublicacion );
		return respuesta.status( HttpStatus.OK ).json( subastaObtenida );
	}

	@Post( '/' )
	public async crearSubasta(
		@Res( ) respuesta: Response,
		@Body( ) crearPublicacionDTO: CrearPublicacionDTO
	): Promise<Response> {
		const subastaAgregada: Publicacion = await this.subastasService.agregar( crearPublicacionDTO );
		return respuesta.status( HttpStatus.CREATED ).json( subastaAgregada );
	}

	@Put( '/:idPublicacion' )
	public async modificarSubasta(
		@Res( ) respuesta: Response,
		@Param( 'idPublicacion', new ObjectIdPipe( ) ) idPublicacion: Types.ObjectId,
		@Body( ) modificarPublicacionDTO: ModificarPublicacionDTO
	): Promise<Response> {
		const publicacionModificada: Publicacion = await this.subastasService.modificar(
			idPublicacion,
			modificarPublicacionDTO
		);
		return respuesta.status( HttpStatus.OK ).json( publicacionModificada );
	}

	@Delete( '/:idPublicacion' )
	public async eliminarSubasta(
		@Res( ) respuesta: Response,
		@Param( 'idPublicacion', new ObjectIdPipe( ) ) idPublicacion: Types.ObjectId
	): Promise<Response> {
		const publicacionEliminada: Publicacion | null = await this.subastasService.eliminar( idPublicacion );

		if ( publicacionEliminada === null ) {
			return respuesta.status( HttpStatus.NO_CONTENT ).json( null );
		}
		else {
			return respuesta.status( HttpStatus.OK ).json( publicacionEliminada );
		}
	}

}