import { Injectable, NotFoundException } from '@nestjs/common';
import { Subasta, SubastaParaCrear, SubastaParaModificar,  } from './interfaces/subasta.interface';
import { OfertaParaCrear , Oferta } from './interfaces/ofertas.interface';
// TODO: Eliminar mocks
/**
 * Servicio que administra las operaciones sobre subastas en la base de datos.
 */
@Injectable( )
export class SubastasService {
	private _subastas: Subasta[ ] = [ ];
	private _ofertas: Oferta [] = [];
	private _siguienteIdSubasta: number = 0;
	private _siguienteIdOferta: number = 0;
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
			...subastaParaCrear,
			ofertas: [ ]
		};

		// TODO: Fallar si existe una subasta con los mismos campos clave

		this._subastas.push( subasta );
		this._siguienteIdSubasta++;

		return subasta;
	}

	/** Crear oferta de una subasta con id asociada */
	public crearOferta(idSubasta: string ,  ofertaParaCrear: OfertaParaCrear ): Oferta {
		// genero una oferta completa para ingresar al sistema
		const oferta: Oferta = {
			idOferta: this._siguienteIdOferta.toString( ),
			...ofertaParaCrear
		};

		// busco la subasta dueña de la oferta creada
		const subastaEncontrada: Subasta = this._subastas.find( ( subasta ) => {
			return subasta.idSubasta === idSubasta;
		});

		if ( subastaEncontrada !== undefined ) {
			// Pusheo oferta nueva en arreglo de ofertas de todo el sistema
			this._ofertas.push(oferta);
			// Actualizo las ofertas de la subasta encontrada
			subastaEncontrada.ofertas.push(oferta);
			// Actualizo la subasta guardada en el las subastas del sistema
			this._subastas = this._subastas.map( ( _subastaActual ) => {
				return ( _subastaActual.idSubasta === subastaEncontrada.idSubasta )
					? subastaEncontrada
					: _subastaActual;
			});
			// se incremenda id de ofertas a la espera de una nueva oferta
			this._siguienteIdOferta++;
			// retorno la oferta guardada
			return oferta;
		}
		else {
			throw new NotFoundException( `No existen subastas con idSubasta "${ idSubasta }".` );
		}
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