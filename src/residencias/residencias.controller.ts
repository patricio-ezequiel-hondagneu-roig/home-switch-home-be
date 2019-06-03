import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { Types } from 'mongoose';
import { ObjectIdPipe } from '../helpers/validadores/ObjectIdPipe';
import { CrearResidenciaDTO } from './dto/crear-residencia.dto';
import { ResidenciasService } from './residencias.service';
import { ModificarResidenciaDTO } from './dto/modificar-residencia.dto';
import { Residencia } from './interfaces/residencia.interface';

@Controller( '/residencias' )
export class ResidenciasController {

	public constructor(
		private readonly residenciasService: ResidenciasService,
	) { }

	@Get( '/' )
	public async obtenerResidencias(
		@Res( ) respuesta: Response
	): Promise<Response> {
		const residencias: Residencia[ ] = await this.residenciasService.obtenerTodas( );
		return respuesta.status( HttpStatus.OK ).json( residencias );
	}

	@Get( '/:idResidencia' )
	public async obtenerResidenciaPorId(
		@Res( ) respuesta: Response,
		@Param( 'idResidencia', new ObjectIdPipe( ) ) idResidencia: Types.ObjectId,
	): Promise<Response> {
		const residenciaObtenida: Residencia = await this.residenciasService.obtenerPorId( idResidencia );
		return respuesta.status( HttpStatus.OK ).json( residenciaObtenida );
	}

	@Post( '/' )
	public async agregarResidencia(
		@Res( ) respuesta: Response,
		@Body( ) crearResidenciaDTO: CrearResidenciaDTO
	): Promise<Response> {
		const residenciaAgregada: Residencia = await this.residenciasService.agregar( crearResidenciaDTO );
		return respuesta.status( HttpStatus.CREATED ).json( residenciaAgregada );
	}

	@Put( '/:idResidencia' )
	public async modificarResidencia(
		@Res( ) respuesta: Response,
		@Param( 'idResidencia', new ObjectIdPipe( ) ) idResidencia: Types.ObjectId,
		@Body( ) modificarResidenciaDTO: ModificarResidenciaDTO
	): Promise<Response> {
		const residenciaModificada: Residencia = await this.residenciasService.modificar(
			idResidencia,
			modificarResidenciaDTO
		);
		return respuesta.status( HttpStatus.OK ).json( residenciaModificada );
	}

	@Delete( '/:idResidencia' )
	public async eliminarResidencia(
		@Res( ) respuesta: Response,
		@Param( 'idResidencia', new ObjectIdPipe( ) ) idResidencia: Types.ObjectId
	): Promise<Response> {
		const residenciaEliminada: Residencia = await this.residenciasService.eliminar( idResidencia );

		if ( residenciaEliminada === null ) {
			return respuesta.status( HttpStatus.NO_CONTENT ).json( null );
		}
		else {
			return respuesta.status( HttpStatus.OK ).json( residenciaEliminada );
		}
	}

}