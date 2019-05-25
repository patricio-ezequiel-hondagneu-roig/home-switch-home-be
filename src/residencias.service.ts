import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException, Inject, forwardRef } from '@nestjs/common';
import { Residencia, ResidenciaParaCrear, ResidenciaParaModificar } from './interfaces/residencia.interface';
import { Subasta } from './interfaces/subasta.interface';
import { UbicacionDeResidencia } from './interfaces/ubicacion-de-residencia.interface';
import { SubastasService } from './subastas.service';

// TODO: Eliminar mocks
/**
 * Servicio que administra las operaciones sobre residencias en la base de datos.
 */
@Injectable( )
export class ResidenciasService {
	private _residencias: Residencia[ ] = [ ];
	private _siguienteIdResidencia: number = 0;

	public constructor(
		// Resuelve dependencias circulares (https://docs.nestjs.com/fundamentals/circular-dependency)
		@Inject( forwardRef( ( ) => SubastasService ) )
		private readonly subastasService: SubastasService,
	) { }

	/**
	 * Retorna todas las residencias.
	 */
	public obtenerTodas( ): Residencia[ ] {
		return this._residencias;
	}

	/**
	 * Retorna la residencia con el identificador provisto, si existe, o falla en caso contrario.
	 *
	 * @param idResidencia identificador de la residencia buscada
	 */
	public obtenerPorId( idResidencia: string ): Residencia {
		const residenciaEncontrada: Residencia = this._residencias.find( ( residencia ) => {
			return residencia.idResidencia === idResidencia;
		});

		if ( residenciaEncontrada !== undefined ) {
			return residenciaEncontrada;
		}
		else {
			throw new NotFoundException( `No existen residencias con idResidencia "${ idResidencia }".` );
		}
	}

	/**
	 * Crea una nueva residencia y la retorna.
	 *
	 * Falla si la ubicación que se le desea asignar ya corresponde a otra residencia.
	 *
	 * @param residenciaParaCrear objeto con las propiedades necesarias para crear una residencia
	 */
	public crear( residenciaParaCrear: ResidenciaParaCrear ): Residencia {
		if ( this.obtenerPorUbicacion( residenciaParaCrear ).length > 0 ) {
			throw new UnprocessableEntityException(
				`No se puede crear la residencia porque ya existe otra con la ubicación indicada.`,
			);
		}

		const residencia: Residencia = {
			idResidencia: this._siguienteIdResidencia.toString( ),
			...residenciaParaCrear
		};

		this._residencias.push( residencia );
		this._siguienteIdResidencia++;

		return residencia;
	}

	/**
	 * Modifica la residencia con el identificador provisto y la retorna, si existe, o falla en caso contrario.
	 *
	 * Falla también si la ubicación que se le desea asignar ya corresponde a otra residencia.
	 *
	 * @param idResidencia identificador de la residencia a modificar
	 * @param residenciaParaModificar objeto con las propiedades necesarias para modificar una residencia
	 */
	public modificar( idResidencia: string, residenciaParaModificar: ResidenciaParaModificar ): Residencia {
		const residencia: Residencia = this.obtenerPorId( idResidencia );

		const otrasResidenciasConMismaUbicacion: Residencia[ ] = this
			.obtenerPorUbicacion( residenciaParaModificar )
			.filter( ( _residencia ) => _residencia.idResidencia !== idResidencia );

		if ( otrasResidenciasConMismaUbicacion.length > 0 ) {
			throw new UnprocessableEntityException(
				`No se puede modificar la residencia porque ya existe otra con la ubicación indicada.`,
			);
		}

		const residenciaModificada = {
			...residencia,
			...residenciaParaModificar
		};

		this._residencias = this._residencias.map( ( _residenciaActual ) => {
			return ( _residenciaActual.idResidencia === residenciaModificada.idResidencia )
				? residenciaModificada
				: _residenciaActual;
		});

		return residenciaModificada;
	}

	/**
	 * Elimina la residencia con el identificador provisto, si existe, o falla en caso contrario.
	 *
	 * @param idResidencia identificador de la residencia a eliminar
	 */
	public eliminar( idResidencia: string ): void {
		const indiceDeResidencia: number = this._residencias.findIndex( ( residencia ) => {
			return residencia.idResidencia === idResidencia;
		});

		if ( indiceDeResidencia === -1 ) {
			throw new NotFoundException( `No existe residencia con idResidencia "${ idResidencia }".` );
		}

		const subastasEncontradas: Subasta[ ] = this.subastasService.obtenerPorIdResidencia( idResidencia );

		if ( subastasEncontradas.length > 0 ) {
			throw new BadRequestException(
				`No se puede eliminar la residencia porque tiene ${ subastasEncontradas.length } subastas asociadas.`
			);
		}

		this._residencias.splice( indiceDeResidencia, 1 );
	}

	/**
	 * Retorna las residencias con la ubicación indicada.
	 *
	 * @param ubicación objeto que contiene el país, la provincia, la localidad y el domicilio buscados
	 */
	public obtenerPorUbicacion( ubicación: UbicacionDeResidencia ): Residencia[ ] {
		const residenciasEncontradas: Residencia[ ] = this._residencias.filter( ( residencia ) => {
			return (
				residencia.pais      === ubicación.pais      &&
				residencia.provincia === ubicación.provincia &&
				residencia.localidad === ubicación.localidad &&
				residencia.domicilio === ubicación.domicilio
			);
		});

		return residenciasEncontradas;
	}
}