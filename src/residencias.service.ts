import { Injectable, NotFoundException } from '@nestjs/common';
import { Residencia, ResidenciaParaCrear, ResidenciaParaModificar } from './interfaces/residencia.interface';

// TODO: Eliminar mocks
/**
 * Servicio que administra las operaciones sobre residencias en la base de datos.
 */
@Injectable( )
export class ResidenciasService {
	private _residencias: Residencia[ ] = [ ];
	private _siguienteIdResidencia: number = 0;

	/**
	 * Retorna todas las residencias.
	 */
	public obtenerTodas( ): Residencia[ ] {
		return this._residencias;
	}

	/**
	 * Retorna la residencia con el identificador provisto, si existe, o _null_ en caso contrario.
	 *
	 * @param idResidencia identificador de la residencia buscada
	 */
	public obtenerPorId( idResidencia: string ): Residencia {
		const residenciaEncontrada: Residencia = this._residencias.find( ( residencia ) => {
			return residencia.idResidencia === idResidencia;
		});

		return ( residenciaEncontrada !== undefined )
			? residenciaEncontrada
			: null;
	}

	/**
	 * Crea una nueva residencia y la retorna.
	 *
	 * @param residenciaParaCrear objeto con las propiedades necesarias para crear una residencia
	 */
	public crear( residenciaParaCrear: ResidenciaParaCrear ): Residencia {
		const residencia: Residencia = {
			idResidencia: this._siguienteIdResidencia.toString( ),
			...residenciaParaCrear
		};

		// TODO: Fallar si existe una residencia con los mismos campos clave

		this._residencias.push( residencia );
		this._siguienteIdResidencia++;

		return residencia;
	}

	/**
	 * Modifica la residencia con el identificador provisto, si existe, o falla en caso contrario.
	 *
	 * @param idResidencia identificador de la residencia a modificar
	 * @param residenciaParaModificar objeto con las propiedades necesarias para modificar una residencia
	 */
	public modificar( idResidencia: string, residenciaParaModificar: ResidenciaParaModificar ): void {
		let residencia: Residencia = this.obtenerPorId( idResidencia );

		if ( residencia === null ) {
			throw new NotFoundException( `No existe residencia con idResidencia "${ idResidencia }".` );
		}

		residencia = {
			...residencia,
			...residenciaParaModificar
		};

		this._residencias = this._residencias.map( ( _residenciaActual ) => {
			return ( _residenciaActual.idResidencia === residencia.idResidencia )
				? residencia
				: _residenciaActual;
		});
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

		this._residencias.splice( indiceDeResidencia, 1 );
	}

}