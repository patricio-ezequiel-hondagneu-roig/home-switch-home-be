import { Injectable, NotFoundException } from '@nestjs/common';
import { Subasta, SubastaParaCrear, SubastaParaModificar } from './interfaces/subasta.interface';

// TODO: Eliminar mocks
/**
 * Servicio que administra las operaciones sobre subastas en la base de datos.
 */
@Injectable( )
export class SubastasService {
	private _subastas: Subasta[ ] = [ ];
	private _siguienteIdSubasta: number = 0;

	/**
	 * Retorna todas las subastas.
	 */
	public obtenerTodas( ): Subasta[ ] {
		return this._subastas;
	}

	/**
	 * Retorna la subastas con el identificador provisto, si existe, o falla en caso contrario.
	 *
	 * @param idSubasta identificador de la subasta buscada
	 */
	public obtenerPorId( idSubasta: string ): Subasta {
		const subastaEncontrada: Subasta = this._subastas.find( ( subasta ) => {
			return subasta.idSubasta === idSubasta;
		});

		if ( subastaEncontrada !== undefined ) {
			return subastaEncontrada;
		}
		else {
			throw new NotFoundException( `No existen subastas con idSubasta "${ idSubasta }".` );
		}
	}

	/**
	 * Crea una nueva subasta y la retorna.
	 *
	 * @param subastaParaCrear objeto con las propiedades necesarias para crear una subasta
	 */
	public crear( subastaParaCrear: SubastaParaCrear ): Subasta {
		const subasta: Subasta = {
			idSubasta: this._siguienteIdSubasta.toString( ),
			...subastaParaCrear
		};

		// TODO: Fallar si existe una subasta con los mismos campos clave

		this._subastas.push( subasta );
		this._siguienteIdSubasta++;

		return subasta;
	}

	/**
	 * Modifica la subasta con el identificador provisto y la retorna, si existe, o falla en caso contrario.
	 *
	 * @param idSubasta identificador de la subasta a modificar
	 * @param subastaParaModificar objeto con las propiedades necesarias para modificar una subasta
	 */
	public modificar( idSubasta: string, subastaParaModificar: SubastaParaModificar ): Subasta {
		let subasta: Subasta = this.obtenerPorId( idSubasta );

		if ( subasta === null ) {
			throw new NotFoundException( `No existen subastas con idSubasta "${ idSubasta }".` );
		}

		subasta = {
			...subasta,
			...subastaParaModificar
		};

		this._subastas = this._subastas.map( ( _subastaActual ) => {
			return ( _subastaActual.idSubasta === subasta.idSubasta )
				? subasta
				: _subastaActual;
		});

		return subasta;
	}

	/**
	 * Elimina la subasta con el identificador provisto, si existe, o falla en caso contrario.
	 *
	 * @param idSubasta identificador de la subasta a eliminar
	 */
	public eliminar( idSubasta: string ): void {
		const indiceDeSubasta: number = this._subastas.findIndex( ( subasta ) => {
			return subasta.idSubasta === idSubasta;
		});

		if ( indiceDeSubasta === -1 ) {
			throw new NotFoundException( `No existen subastas con idSubasta "${ idSubasta }".` );
		}

		this._subastas.splice( indiceDeSubasta, 1 );
	}

	/**
	 * Retorna las subastas con el ID de residencia indicado.
	 *
	 * @param idResidencia ID de la residencia buscada
	 */
	public obtenerPorIdResidencia( idResidencia: string ): Subasta[ ] {
		const subastasEncontradas: Subasta[ ] = this._subastas.filter( ( subasta ) => {
			return subasta.idResidencia === idResidencia;
		});

		return subastasEncontradas;
	}

}