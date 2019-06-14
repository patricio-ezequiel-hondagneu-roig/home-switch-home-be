import { forwardRef, Inject, Injectable, NotFoundException, UnprocessableEntityException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CrearSolicitudDTO } from './dto/crear-solicitud.dto';
import { Solicitud } from './interfaces/Solicitud.interface';
import { ModuleRef } from '@nestjs/core';
import { ObjectIdPipe } from 'src/helpers/validadores/ObjectIdPipe';

/**
 * Servicio que administra las operaciones sobre las solicitudes en la base de datos.
 */
@Injectable( )
export class SolicitudesService {

	public constructor(
		@InjectModel( 'Solicitud' )
		private readonly solicitudModel: Model<Solicitud>
	) { }

	/**
	 * Retorna todas las solicitudes.
	 */
	public async obtenerTodas( ): Promise<Solicitud[ ]> {
		return this.solicitudModel.find( ).exec( );
	}

	/**
	 * Retorna la Solicitud con el ID provisto.
	 *
	 * @param idSolicitud ID de la Solicitud a obtener.
	 *
	 * @throws {NotFoundException} - No existen Solicitudes con el ID provisto.
	 */
	public async obtenerPorId( idSolicitud: Types.ObjectId ): Promise<Solicitud> {
		const solicitud = await this.solicitudModel.findById( idSolicitud ).exec( );

		if ( solicitud !== null ) {
			return solicitud;
		}
		else {
			throw new NotFoundException( `No existen solicitudes con idSolicitud "${ idSolicitud }".` );
		}
	}

	/**
	 * Agrega una Solicitud de acuerdo al DTO provisto, y lo retorna.
	 *
	 * @param crearSolicitudDTO DTO para agregar la Solicitud.
	 *
	 * @throws {UnprocessableEntityException} - Ya existe otra Solicitud con el id provisto en el DTO.
	 */
	public async agregar( crearSolicitudDTO: CrearSolicitudDTO ): Promise<Solicitud> {

		// Me fijo que no se haya repetido el id de cliente en la bd
		const solicitudesConMiIdCliente = await this.obtenerPorIdDeCliente( crearSolicitudDTO.idCliente );

		if ( solicitudesConMiIdCliente.length > 0 ) {
			throw new UnprocessableEntityException( 'Ya existe una solicitud con el idCliente provisto' );
		}

		const solicitudAgregada = new this.solicitudModel( crearSolicitudDTO ).save( );
		return solicitudAgregada;
	}

	/**
	 * Elimina la solicitud con el ID provisto y la retorna.
	 *
	 * Si no existía ninguna solicitud con el ID provisto, retorna null.
	 *
	 * @param idSolicitud ID de la solicitud a eliminar.
	 *
	 */
	public async eliminar( idSolicitud: Types.ObjectId ): Promise<Solicitud | null> {

		return this.solicitudModel.findByIdAndRemove( idSolicitud ).exec( );

	}

	/**
	 * Retorna todas las solicitudes con el idCLiente provisto.
	 *
	 * @param idCliente es la id que corresponde al cliente que realizo la solicitud.
	 */
	public async obtenerPorIdDeCliente( idCliente: String ): Promise<Solicitud[ ]> {
		return this.solicitudModel
			.find({
				idCliente: idCliente
			})
			.exec( );
	}

}