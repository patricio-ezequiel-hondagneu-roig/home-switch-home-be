import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { Residencia } from './interfaces/residencia.interface';
import { ResidenciasService } from './residencias.service';

/**
 * Controlador que procesa las peticiones HTTP al endpoint /residencias
 */
@Controller( '/residencias' )
export class ResidenciasController {
	public constructor(
		private readonly residenciasService: ResidenciasService,
	) { }

	/**
	 * Método que procesa las peticiones HTTP con método **GET** al endpoint /residencias.
	 *
	 * Retorna una lista con todas las residencias.
	 */
	@Get( '/' )
	public obtenerTodasLasResidencias( ): Residencia[ ] {
		return this.residenciasService.obtenerTodas( );
	}

	/**
	 * Método que procesa las peticiones HTTP con método **GET** al endpoint /residencias/_:idResidencia_, donde
	 * _:idResidencia_ se mapea al parámetro `idResidencia`.
	 *
	 * Retorna la residencia con el identificador provisto, si existe, o _null_ en caso contrario.
	 *
	 * @param idResidencia identificador de la residencia buscada
	 */
	@Get( '/:idResidencia' )
	public obtenerResidencia(
		@Param( 'idResidencia' ) idResidencia: string
	): Residencia {
		return this.residenciasService.obtenerPorId( idResidencia );
	}

	/**
	 * Método que procesa las peticiones HTTP con método **POST** al endpoint /residencias.
	 *
	 * Crea una residencia nueva según el cuerpo de la petición y la retorna.
	 *
	 * @param peticion petición HTTP recibida
	 */
	@Post( '/' )
	public crearResidencia(
		@Req( ) peticion: Request
	): Residencia {
		return this.residenciasService.crear( peticion.body );
	}

	/**
	 * Método que procesa las peticiones HTTP con método **PUT** al endpoint /residencias/_:idResidencia_, donde
	 * _:idResidencia_ se mapea al parámetro `idResidencia`.
	 *
	 * Modifica la residencia con el identificador provisto, si existe, o falla en caso contrario.
	 *
	 * @param idResidencia identificador de la residencia a modificar
	 * @param peticion petición HTTP recibida
	 */
	@Put( '/:idResidencia' )
	public modificarResidencia(
		@Param( 'idResidencia' ) idResidencia: string,
		@Req( ) peticion: Request
	): void {
		this.residenciasService.modificar( idResidencia, peticion.body );
	}

	/**
	 * Método que procesa las peticiones HTTP con método **DELETE** al endpoint /residencias/_:idResidencia_, donde
	 * _:idResidencia_ se mapea al parámetro `idResidencia`.
	 *
	 * Elimina la residencia con el identificador provisto, si existe, o falla en caso contrario.
	 *
	 * @param idResidencia identificador de la residencia a modificar
	 */
	@Delete( '/:idResidencia' )
	public eliminarResidencia(
		@Param( 'idResidencia' ) idResidencia: string
	): void {
		this.residenciasService.eliminar( idResidencia );
	}

}