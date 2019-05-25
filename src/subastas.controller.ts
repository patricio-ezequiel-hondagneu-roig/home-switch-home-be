import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { Oferta } from './interfaces/ofertas.interface';
import { Subasta } from './interfaces/subasta.interface';
import { SubastasService } from './subastas.service';
/**
 * Controlador que procesa las peticiones HTTP al endpoint /subastas
 */
@Controller( '/subastas' )
export class SubastasController {
	public constructor(
		private readonly subastasService: SubastasService,
	) { }

	/**
	 * Método que procesa las peticiones HTTP con método **GET** al endpoint /subastas.
	 *
	 * Retorna una lista con todas las subastas.
	 */
	@Get( '/' )
	public obtenerTodasLasSubasta( ): Subasta[ ] {
		return this.subastasService.obtenerTodas( );
	}

	/**
	 * Método que procesa las peticiones HTTP con método **GET** al endpoint /subastas/_:idSubasta_, donde
	 * _:idSubasta_ se mapea al parámetro `idSubasta`.
	 *
	 * Retorna la subasta con el identificador provisto, si existe, o _null_ en caso contrario.
	 *
	 * @param idSubasta identificador de la subasta buscada
	 */
	@Get( '/:idSubasta' )
	public obtenerSubasta(
		@Param( 'idSubasta' ) idSubasta: string
	): Subasta {
		return this.subastasService.obtenerPorId( idSubasta );
	}

	/**
	 * Método que procesa las peticiones HTTP con método **POST** al endpoint /subastas.
	 *
	 * Crea una subasta nueva según el cuerpo de la petición y la retorna.
	 *
	 * @param peticion petición HTTP recibida
	 */
	@Post( '/' )
	public crearResidencia(
		@Req( ) peticion: Request
	): Subasta {
		return this.subastasService.crear( peticion.body );
	}

	/**
	 * Método que procesa las peticiones HTTP con el método **POST** al endpoint /subastas/_:idSubasta_/ofertas, donde
	 * _:idSubasta_ se mapea al parámetro `idSubasta`.
	 *
	 * Crea una oferta para la subasta según el cuerpo de la petición y la retorna.
	 *
	 * @param idSubasta identificador de la subasta para la cual crear la oferta
	 * @param peticion petición HTTP recibida
	 */
	@Post( '/:idSubasta/ofertas' )
	public crearOferta(
		@Param( 'idSubasta' ) idSubasta: string,
		@Req( ) peticion: Request
	): Oferta {
		return this.subastasService.crearOferta( idSubasta, peticion.body );
	}

	/**
	 * Método que procesa las peticiones HTTP con método **PUT** al endpoint /subastas/_:idSubasta_, donde
	 * _:idSubasta_ se mapea al parámetro `idSubasta`.
	 *
	 * Modifica la subasta con el identificador provisto y la retorna, si existe, o falla en caso contrario.
	 *
	 * @param idSubasta identificador de la subasta a modificar
	 * @param peticion petición HTTP recibida
	 */
	@Put( '/:idSubasta' )
	public modificarSubasta(
		@Param( 'idSubasta' ) idSubasta: string,
		@Req( ) peticion: Request
	): Subasta {
		return this.subastasService.modificar( idSubasta, peticion.body );
	}

	/**
	 * Método que procesa las peticiones HTTP con método **DELETE** al endpoint /subastas/_:idSubasta_, donde
	 * _:idSubasta_ se mapea al parámetro `idSubasta`.
	 *
	 * Elimina la subasta con el identificador provisto, si existe, o falla en caso contrario.
	 *
	 * @param idSubasta identificador de la subasta a modificar
	 */
	@Delete( '/:idSubasta' )
	public eliminarSubasta(
		@Param( 'idSubasta' ) idSubasta: string
	): void {
		this.subastasService.eliminar( idSubasta );
	}

}