import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { Types } from 'mongoose';
import { ObjectIdPipe } from 'src/helpers/validadores/ObjectIdPipe';
import { CrearSubastaDTO } from './dto/crear-subasta.dto';
import { ModificarSubastaDTO } from './dto/modificar-subasta.dto';
import { Subasta } from './interfaces/subasta.interface';
import { SubastasService } from './subastas.service';

@Controller( '/subastas' )
export class SubastasController {

	public constructor(
		private readonly subastasService: SubastasService,
	) { }

	@Get( '/' )
	public async obtenerSubastas(
		@Res( ) respuesta: Response,
	): Promise<Response> {
		const subastas: Subasta[ ] = await this.subastasService.obtenerTodas( );
		return respuesta.status( HttpStatus.OK ).json( subastas );
	}

	@Get( '/:idSubasta' )
	public async obtenerSubastaPorId(
		@Res( ) respuesta: Response,
		@Param( 'idSubasta', new ObjectIdPipe( ) ) idSubasta: Types.ObjectId,
	): Promise<Response> {
		const subastaObtenida: Subasta = await this.subastasService.obtenerPorId( idSubasta );
		return respuesta.status( HttpStatus.OK ).json( subastaObtenida );
	}

	@Post( '/' )
	public async crearSubasta(
		@Res( ) respuesta: Response,
		@Body( ) crearSubastaDTO: CrearSubastaDTO
	): Promise<Response> {
		const subastaAgregada: Subasta = await this.subastasService.agregar( crearSubastaDTO );
		return respuesta.status( HttpStatus.CREATED ).json( subastaAgregada );
	}

	@Put( '/:idSubasta' )
	public async modificarSubasta(
		@Res( ) respuesta: Response,
		@Param( 'idSubasta', new ObjectIdPipe( ) ) idSubasta: Types.ObjectId,
		@Body( ) modificarSubastaDTO: ModificarSubastaDTO
	): Promise<Response> {
		const subastaModificada: Subasta = await this.subastasService.modificar(
			idSubasta,
			modificarSubastaDTO
		);
		return respuesta.status( HttpStatus.OK ).json( subastaModificada );
	}

	@Delete( '/:idSubasta' )
	public async eliminarSubasta(
		@Res( ) respuesta: Response,
		@Param( 'idSubasta', new ObjectIdPipe( ) ) idSubasta: Types.ObjectId
	): Promise<Response> {
		const subastaEliminada: Subasta = await this.subastasService.eliminar( idSubasta );

		if ( subastaEliminada === null ) {
			return respuesta.status( HttpStatus.NO_CONTENT ).json( null );
		}
		else {
			return respuesta.status( HttpStatus.OK ).json( subastaEliminada );
		}
	}

}