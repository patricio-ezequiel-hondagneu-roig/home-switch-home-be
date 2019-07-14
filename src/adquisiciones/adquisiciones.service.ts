import { forwardRef, Inject, Injectable, NotFoundException, UnprocessableEntityException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CrearAdquisicionDTO } from './dto/crear-adquisicion.dto';
import { Adquisicion } from './interfaces/adquisicion.interface';
import { ModificarAdquisicionDTO } from './dto/modificar-adquisicion.dto';

/**
 * Servicio que administra las operaciones sobre adquisiciones en la base de datos.
 */
@Injectable( )
export class AdquisicionesService {

	public constructor(
		@InjectModel( 'Adquisicion' )
		private readonly adquisicionModel: Model<Adquisicion>
	) { }

	/**
	 * Retorna todas las Adquisiciones.
	 */
	public async obtenerTodas( ): Promise<Adquisicion[ ]> {
		return this.adquisicionModel.find( ).exec( );
	}

	/**
	 * Retorna la Adquisicion con el ID provisto.
	 *
	 * @param idAdquisicion ID de la Adquisicion a obtener.
	 *
	 * @throws {NotFoundException} - No existen Adquisiciones con el ID provisto.
	 */
	public async obtenerPorId( idAdquisicion: Types.ObjectId ): Promise<Adquisicion> {
		const adquisicion = await this.adquisicionModel.findById( idAdquisicion ).exec( );

		if ( adquisicion !== null ) {
			return adquisicion;
		}
		else {
			throw new NotFoundException( `No existen adquisiciones con idAdquisicion "${ idAdquisicion }".` );
		}
	}

	/**
	 * Retorna las adquisiciones asociadas a un ID de cliente provisto.
	 *
	 * @param idCliente ID de cliente asociado a las adquisiciones a obtener.
	 */
	public async obtenerPorIdCliente( idCliente: Types.ObjectId ): Promise<Adquisicion[ ]> {
		const adquisiciones = await this.adquisicionModel
			.find({
				idCliente: idCliente
			})
			.exec( );

		return adquisiciones;
	}

	/**
	 * Agrega una Adquisicion de acuerdo al DTO provisto, y la retorna.
	 *
	 * @param crearAdquisicionDTO DTO para agregar la Adquisicion.
	 */
	public async agregar( crearAdquisicionDTO: CrearAdquisicionDTO ): Promise<Adquisicion> {
		const adquisicionAgregada = new this.adquisicionModel( crearAdquisicionDTO ).save( );
		return adquisicionAgregada;
	}

	/**
	 * Modifica la Adquisicion con el ID provisto de acuerdo al DTO provisto, y la retorna.
	 *
	 * @param idAdquisicion ID de la Adquisicion a modificar
	 * @param modificarAdquisicionDTO DTO para modificar la Adquisicion
	 *
	 * @throws {NotFoundException} - No existen Adquisiciones con el ID provisto.
	 */
	public async modificar(
		idAdquisicion: Types.ObjectId,
		modificarAdquisicionDTO: ModificarAdquisicionDTO
	): Promise<Adquisicion> {
		const adquisicionModificada = await this.adquisicionModel
			.findByIdAndUpdate( idAdquisicion, modificarAdquisicionDTO, { new: true } )
			.exec( );

		if ( adquisicionModificada !== null ) {
			return adquisicionModificada;
		}
		else {
			throw new NotFoundException(
				`No existe ninguna adquisicion con el ID "${ idAdquisicion }"`
			);
		}
	}

	/**
	 * Elimina la Adquisicion con el ID provisto y la retorna.
	 *
	 * Si no existía ninguna Adquisicion con el ID provisto, retorna null.
	 *
	 * @param idAdquisicion ID de la Adquisicion a eliminar.
	 */
	public async eliminar( idAdquisicion: Types.ObjectId ): Promise<Adquisicion | null> {
		return this.adquisicionModel.findByIdAndRemove( idAdquisicion ).exec( );
	}
}