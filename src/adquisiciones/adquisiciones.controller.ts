import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { Types } from 'mongoose';
import { ObjectIdPipe } from '../helpers/validadores/ObjectIdPipe';
import { CrearAdquisicionDTO } from './dto/crear-adquisicion.dto';
import { Adquisicion } from './interfaces/adquisicion.interface';
import { AdquisicionesService } from './adquisiciones.service';
import { ModificarAdquisicionDTO } from './dto/modificar-adquisicion.dto';

@Controller( '/adquisiciones' )
export class AdquisicionesController {

	public constructor(
		private readonly adquisicionesService: AdquisicionesService,
	) { }

	@Get( '/' )
	public async obtenerAdquisiciones(
		@Res( ) respuesta: Response
	): Promise<Response> {
		const adquisiciones: Adquisicion[ ] = await this.adquisicionesService.obtenerTodas( );
		return respuesta.status( HttpStatus.OK ).json( adquisiciones );
	}

	@Get( '/:idAdquisicion' )
	public async obtenerAdquisicionPorId(
		@Res( ) respuesta: Response,
		@Param( 'idAdquisicion', new ObjectIdPipe( ) ) idAdquisicion: Types.ObjectId,
	): Promise<Response> {
		const adquisicionObtenida: Adquisicion = await this.adquisicionesService.obtenerPorId( idAdquisicion );
		return respuesta.status( HttpStatus.OK ).json( adquisicionObtenida );
	}

	@Post( '/' )
	public async agregarAdquisicion(
		@Res( ) respuesta: Response,
		@Body( ) crearAdquisicionDTO: CrearAdquisicionDTO
	): Promise<Response> {
		const adquisicionAgregada: Adquisicion = await this.adquisicionesService.agregar( crearAdquisicionDTO );
		return respuesta.status( HttpStatus.CREATED ).json( adquisicionAgregada );
	}

	@Put( '/:idAdquisicion' )
	public async modificarAdquisicion(
		@Res( ) respuesta: Response,
		@Param( 'idAdquisicion', new ObjectIdPipe( ) ) idAdquisicion: Types.ObjectId,
		@Body( ) modificarAdquisicionDTO: ModificarAdquisicionDTO
	): Promise<Response> {
		const adquisicionModificada: Adquisicion = await this.adquisicionesService.modificar(
			idAdquisicion,
			modificarAdquisicionDTO
		);
		return respuesta.status( HttpStatus.OK ).json( adquisicionModificada );
	}

	@Delete( '/:idAdquisicion' )
	public async eliminarAdquisicion(
		@Res( ) respuesta: Response,
		@Param( 'idAdquisicion', new ObjectIdPipe( ) ) idAdquisicion: Types.ObjectId
	): Promise<Response> {
		const adquisicionEliminada: Adquisicion | null = await this.adquisicionesService.eliminar( idAdquisicion );
		if ( adquisicionEliminada === null ) {
			return respuesta.status( HttpStatus.NO_CONTENT ).json( null );
		}
		else {
			return respuesta.status( HttpStatus.OK ).json( adquisicionEliminada );
		}
	}

}