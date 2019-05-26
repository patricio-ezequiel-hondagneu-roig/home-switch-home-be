import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { SubastasService } from './subastas.service';
// interfaces
import { Residencia } from './interfaces/residencia.interface';
import { UbicacionDeResidencia } from './interfaces/ubicacion-de-residencia.interface';
// dto: data transfer object
import { CrearResidenciaDTO } from './dto/crearResidencia.dto';
// mongoose
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// TODO: Eliminar mocks
/**
 * Servicio que administra las operaciones sobre residencias en la base de datos.
 */
@Injectable( )
export class ResidenciasService {
	public _residencias: Residencia[] = [];
	public constructor(
		// Resuelve dependencias circulares (https://docs.nestjs.com/fundamentals/circular-dependency)
		@Inject( forwardRef( ( ) => SubastasService ) )
		private readonly subastasService: SubastasService,
		@InjectModel('Residencia') private readonly residenciaModel: Model<Residencia>
	) { }

	/**
	 * Retorna todas las residencias.
	 */
	public async obtenerTodas( ): Promise<Residencia[ ]> {
		const residencias = await this.residenciaModel.find().exec();
		return residencias;
	}

	/**
	 * Retorna la residencia con el identificador provisto, si existe, o falla en caso contrario.
	 *
	 * @param idResidencia identificador de la residencia buscada
	 */
	public async obtenerPorId( idResidencia: string ): Promise<Residencia> {
		const residencia = await this.residenciaModel
			.findById(idResidencia)
			.exec();
		if ( residencia !== undefined ) {
			return residencia;
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
	public async crear( crearResidenciaDTO: CrearResidenciaDTO ): Promise<Residencia> {
		const nuevaResidencia = await this.residenciaModel(crearResidenciaDTO);
		return nuevaResidencia.save();
	}

	/**
	 * Modifica la residencia con el identificador provisto y la retorna, si existe, o falla en caso contrario.
	 *
	 * Falla también si la ubicación que se le desea asignar ya corresponde a otra residencia.
	 *
	 * @param idResidencia identificador de la residencia a modificar
	 * @param residenciaParaModificar objeto con las propiedades necesarias para modificar una residencia
	 */
	public async modificar( idResidencia: string, crearResidenciaDTO: CrearResidenciaDTO ): Promise<Residencia> {
		const residenciaModificada = await this.residenciaModel
			.findByIdAndUpdate(idResidencia, crearResidenciaDTO, { new: true });
		return residenciaModificada;
	}

	/**
	 * Elimina la residencia con el identificador provisto, si existe, o falla en caso contrario.
	 *
	 * @param idResidencia identificador de la residencia a eliminar
	 */
	public async eliminar( idResidencia: string ): Promise<Residencia>  {
		const residenciaEliminada = await this.residenciaModel
			.findByIdAndRemove(idResidencia);
		return residenciaEliminada;
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