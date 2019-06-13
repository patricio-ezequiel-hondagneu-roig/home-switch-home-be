import { forwardRef, Inject, Injectable, NotFoundException, UnprocessableEntityException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CrearClienteDTO } from './dto/crear-cliente.dto';
import { Cliente } from './interfaces/cliente.interface';
import { ModificarClienteDTO } from './dto/modificar-cliente.dto';
import { ModuleRef } from '@nestjs/core';
import { ObjectIdPipe } from 'src/helpers/validadores/ObjectIdPipe';

/**
 * Servicio que administra las operaciones sobre los clientes en la base de datos.
 */
@Injectable( )
export class ClientesService {

	public constructor(
		@InjectModel( 'Cliente' )
		private readonly clienteModel: Model<Cliente>
	) { }

	/**
	 * Retorna todos los clientes.
	 */
	public async obtenerTodos( ): Promise<Cliente[ ]> {
		return this.clienteModel.find( ).exec( );
	}

	/**
	 * Retorna el cliente con el ID provisto.
	 *
	 * @param idCliente ID del cliente a obtener.
	 *
	 * @throws {NotFoundException} - No existen clientes con el ID provisto.
	 */
	public async obtenerPorId( idCliente: Types.ObjectId ): Promise<Cliente> {
		const cliente = await this.clienteModel.findById( idCliente ).exec( );

		if ( cliente !== null ) {
			return cliente;
		}
		else {
			throw new NotFoundException( `No existen clientes con idCliente "${ idCliente }".` );
		}
	}

	/**
	 * Agrega un cliente de acuerdo al DTO provisto, y lo retorna.
	 *
	 * @param crearClienteDTO DTO para agregar al cliente.
	 *
	 * @throws {UnprocessableEntityException} - Ya existe otro cliente con el email provista en el DTO.
	 */
	public async agregar( crearClienteDTO: CrearClienteDTO ): Promise<Cliente> {

		// Me fijo que la idSuscripcion es una id
		await new ObjectIdPipe( ).transform( crearClienteDTO.idSuscripcion );

		// Me fijo que no se haya repetido el email en la bd
		const clientesConMiEmail = await this.obtenerPorEmail( crearClienteDTO.email );

		if ( clientesConMiEmail.length > 0 ) {
			throw new UnprocessableEntityException( 'Ya existe un cliente con el email provisto' );
		}

		const clienteAgregado = new this.clienteModel( crearClienteDTO ).save( );
		return clienteAgregado;
	}

	/**
	 * Modifica al cliente con el ID provisto de acuerdo al DTO provisto, y la retorna.
	 *
	 * @param idCliente ID del cliente a modificar
	 * @param modificarClienteDTO DTO para modificar al cliente
	 *
	 * @throws {NotFoundException} - No existen clientes con el ID provisto.
	 * @throws {UnprocessableEntityException} - Ya existe otro cliente con el email provista en el DTO.
	 */
	public async modificar(
		idCliente: Types.ObjectId,
		modificarClienteDTO: ModificarClienteDTO
	): Promise<Cliente> {
		const clientesConMiEmail = await this.obtenerPorEmail( modificarClienteDTO.email );
		const hayOtrosClientesConEmailProvisto = clientesConMiEmail.some( ( cliente ) => {
			return ! cliente._id.equals( idCliente );
		});

		if ( hayOtrosClientesConEmailProvisto ) {
			throw new UnprocessableEntityException(
				'No se puede modificar el email porque ya esta en uso'
			);
		}

		const clienteModificado = await this.clienteModel
			.findByIdAndUpdate( idCliente, modificarClienteDTO, { new: true } )
			.exec( );

		if ( clienteModificado !== null ) {
			return clienteModificado;
		}
		else {
			throw new NotFoundException(
				`No existe ningun cliente con el ID "${ idCliente }"`
			);
		}
	}

	/**
	 * Elimina al cliente con el ID provisto y lo retorna.
	 *
	 * Si no existía ningun cliente con el ID provisto, retorna null.
	 *
	 * @param idCliente ID del cliente a eliminar.
	 *
	 * @throws {ConflictException} - No se puede eliminar al cliente porque tiene publicaciones.
	 */
	public async eliminar( idCliente: Types.ObjectId ): Promise<Cliente | null> {
		// ------------------------------------------------------------------------------------------------------------
		// FALTAN HACER LAS PUBLICACIONES ADQUIRIDAS
		// const publicacionesAsociadas = await this.publicacionesService.obtenerPorIdCliente( idCliente );
		//
		// if ( subastasAsociadas.length > 0 ) {
		// 	throw new ConflictException(
		// 		`No se puede eliminar la residencia porque tiene ${ subastasAsociadas.length } subastas asociadas`
		// 	);
		// }
		// ------------------------------------------------------------------------------------------------------------

		return this.clienteModel.findByIdAndRemove( idCliente ).exec( );
	}

	/**
	 * Retorna todos los clientes con el email provisto.
	 *
	 * @param cliente que contiene todos los datos del cliente pasado.
	 */
	public async obtenerPorEmail( unEmail: String ): Promise<Cliente[ ]> {
		return this.clienteModel
			.find({
				email: unEmail
			})
			.exec( );
	}

}