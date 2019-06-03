import { forwardRef, Inject, Injectable, NotFoundException, UnprocessableEntityException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UbicacionDeResidencia } from './interfaces/ubicacion-de-residencia.interface';
import { SubastasService } from '../subastas/subastas.service';
import { CrearResidenciaDTO } from './dto/crear-residencia.dto';
import { Residencia } from './interfaces/residencia.interface';
import { ModificarResidenciaDTO } from './dto/modificar-residencia.dto';
import { ModuleRef } from '@nestjs/core';

/**
 * Servicio que administra las operaciones sobre residencias en la base de datos.
 */
@Injectable( )
export class ResidenciasService {

	public constructor(
		@InjectModel( 'Residencia' )
		private readonly residenciaModel: Model<Residencia>,
		@Inject( forwardRef( ( ) => SubastasService ) )
		private readonly subastasService: SubastasService,
	) { }

	/**
	 * Retorna todas las residencias.
	 */
	public async obtenerTodas( ): Promise<Residencia[ ]> {
		return this.residenciaModel.find( ).exec( );
	}

	/**
	 * Retorna la residencia con el ID provisto.
	 *
	 * @param idResidencia ID de la residencia a obtener.
	 *
	 * @throws {NotFoundException} - No existen residencias con el ID provisto.
	 */
	public async obtenerPorId( idResidencia: Types.ObjectId ): Promise<Residencia> {
		const residencia = await this.residenciaModel.findById( idResidencia ).exec( );

		if ( residencia !== null ) {
			return residencia;
		}
		else {
			throw new NotFoundException( `No existen residencias con idResidencia "${ idResidencia }".` );
		}
	}

	/**
	 * Agrega una residencia de acuerdo al DTO provisto, y la retorna.
	 *
	 * @param crearResidenciaDTO DTO para agregar la residencia.
	 *
	 * @throws {UnprocessableEntityException} - Ya existe otra residencia con la ubicación provista en el DTO.
	 */
	public async agregar( crearResidenciaDTO: CrearResidenciaDTO ): Promise<Residencia> {
		const residenciasConMismaUbicacion = await this.obtenerPorUbicacion( crearResidenciaDTO );

		if ( residenciasConMismaUbicacion.length > 0 ) {
			throw new UnprocessableEntityException( 'Ya existe una residencia en la ubicación provista' );
		}

		const residenciaAgregada = new this.residenciaModel( crearResidenciaDTO ).save( );
		return residenciaAgregada;
	}

	/**
	 * Modifica la residencia con el ID provisto de acuerdo al DTO provisto, y la retorna.
	 *
	 * @param idResidencia ID de la residencia a modificar
	 * @param modificarResidenciaDTO DTO para modificar la residencia
	 *
	 * @throws {NotFoundException} - No existen residencias con el ID provisto.
	 * @throws {UnprocessableEntityException} - Ya existe otra residencia con la ubicación provista en el DTO.
	 */
	public async modificar(
		idResidencia: Types.ObjectId,
		modificarResidenciaDTO: ModificarResidenciaDTO
	): Promise<Residencia> {
		const residenciasConUbicacionProvista = await this.obtenerPorUbicacion( modificarResidenciaDTO );
		const hayOtrasResidenciasConUbicacionProvista = residenciasConUbicacionProvista.some( ( residencia ) => {
			return ! residencia._id.equals( idResidencia );
		});

		if ( hayOtrasResidenciasConUbicacionProvista ) {
			throw new UnprocessableEntityException(
				'No se puede modificar la residencia porque ya existe otra residencia en la ubicación provista'
			);
		}

		const residenciaModificada = await this.residenciaModel
			.findByIdAndUpdate( idResidencia, modificarResidenciaDTO, { new: true } )
			.exec( );

		if ( residenciaModificada !== null ) {
			return residenciaModificada;
		}
		else {
			throw new NotFoundException(
				`No existe ninguna residencia con el ID "${ idResidencia }"`
			);
		}
	}

	/**
	 * Elimina la residencia con el ID provisto y la retorna.
	 *
	 * Si no existía ninguna residencia con el ID provisto, retorna null.
	 *
	 * @param idResidencia ID de la residencia a eliminar.
	 *
	 * @throws {ConflictException} - No se puede eliminar la residencia porque tiene subastas activas asociadas.
	 */
	public async eliminar( idResidencia: Types.ObjectId ): Promise<Residencia | null> {
		const subastasAsociadas = await this.subastasService.obtenerPorIdResidencia( idResidencia );

		if ( subastasAsociadas.length > 0 ) {
			throw new ConflictException(
				`No se puede eliminar la residencia porque tiene ${ subastasAsociadas.length } subastas asociadas`
			);
		}

		return this.residenciaModel.findByIdAndRemove( idResidencia ).exec( );
	}

	/**
	 * Retorna todas las residencias con la ubicación provista.
	 *
	 * @param ubicación país, provincia, localidad y domicilio de la residencia a obtener.
	 */
	public async obtenerPorUbicacion( ubicación: UbicacionDeResidencia ): Promise<Residencia[ ]> {
		return this.residenciaModel
			.find({
				pais:      ubicación.pais,
				provincia: ubicación.provincia,
				localidad: ubicación.localidad,
				domicilio: ubicación.domicilio
			})
			.exec( );
	}

}