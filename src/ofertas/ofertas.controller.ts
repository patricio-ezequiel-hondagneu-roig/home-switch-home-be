import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { Types } from 'mongoose';
import { ObjectIdPipe } from '../helpers/validadores/ObjectIdPipe';
import { CrearOfertaDTO } from './dto/crear-oferta.dto';
import { Oferta } from './interfaces/oferta.interface';
import { OfertasService } from './ofertas.service';
import { ModificarOfertaDTO } from './dto/modificar-oferta.dto';


@Controller( '/ofertas' )
export class OfertasController {

	public constructor(
		private readonly ofertasService: OfertasService,
	) { }

	@Get( '/' )
	public async obtenerOfertas(
		@Res( ) respuesta: Response
	): Promise<Response> {
		const ofertas: Oferta[ ] = await this.ofertasService.obtenerTodas( );
		return respuesta.status( HttpStatus.OK ).json( ofertas );
	}

	@Get( '/:idOferta' )
	public async obtenerOfertaPorId(
		@Res( ) respuesta: Response,
		@Param( 'idOferta', new ObjectIdPipe( ) ) idOferta: Types.ObjectId,
	): Promise<Response> {
		const ofertaObtenida: Oferta = await this.ofertasService.obtenerPorId( idOferta );
		return respuesta.status( HttpStatus.OK ).json( ofertaObtenida );
	}

	@Post( '/' )
	public async agregarOferta(
		@Res( ) respuesta: Response,
		@Body( ) crearOfertaDTO: CrearOfertaDTO
	): Promise<Response> {
		const ofertaAgregada: Oferta = await this.ofertasService.agregar( crearOfertaDTO );
		return respuesta.status( HttpStatus.CREATED ).json( ofertaAgregada );
	}

	@Put( '/:idOferta' )
	public async modificarOferta(
		@Res( ) respuesta: Response,
		@Param( 'idOferta', new ObjectIdPipe( ) ) idOferta: Types.ObjectId,
		@Body( ) modificarOfertaDTO: ModificarOfertaDTO
	): Promise<Response> {
		const ofertaModificada: Oferta = await this.ofertasService.modificar(
			idOferta,
			modificarOfertaDTO
		);
		return respuesta.status( HttpStatus.OK ).json( ofertaModificada );
	}

	@Delete( '/:idOferta' )
	public async eliminarOferta(
		@Res( ) respuesta: Response,
		@Param( 'idOferta', new ObjectIdPipe( ) ) idOferta: Types.ObjectId
	): Promise<Response> {
		const ofertaEliminada: Oferta | null = await this.ofertasService.eliminar( idOferta );
		if ( ofertaEliminada === null ) {
			return respuesta.status( HttpStatus.NO_CONTENT ).json( null );
		}
		else {
			return respuesta.status( HttpStatus.OK ).json( ofertaEliminada );
		}
	}

}