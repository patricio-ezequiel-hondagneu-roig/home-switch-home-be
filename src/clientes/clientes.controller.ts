import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { Types } from 'mongoose';
import { ObjectIdPipe } from '../helpers/validadores/ObjectIdPipe';
import { CrearClienteDTO } from './dto/crear-cliente.dto';
import { ModificarClienteDTO } from './dto/modificar-cliente.dto';
import { ClientesService } from '../clientes/clientes.service';
import { Cliente } from './interfaces/cliente.interface';

@Controller( '/clientes' )
export class ClientesController {

	public constructor(
		private readonly clientesService: ClientesService,
	) { }
	@Get( '/admins' )
	public async obtenerClientesAdmins(
		@Res( ) respuesta: Response
	): Promise<Response> {
		const admins: Cliente[ ] = await this.clientesService.obtenerAdmins( );
		return respuesta.status( HttpStatus.OK ).json( admins );
	}
	@Get( '/' )
	public async obtenerClientes(
		@Res( ) respuesta: Response
	): Promise<Response> {
		const clientes: Cliente[ ] = await this.clientesService.obtenerTodos( );
		return respuesta.status( HttpStatus.OK ).json( clientes );
	}

	@Get( '/:idCliente' )
	public async obtenerClientePorId(
		@Res( ) respuesta: Response,
		@Param( 'idCliente', new ObjectIdPipe( ) ) idCliente: Types.ObjectId,
	): Promise<Response> {
		const clienteObtenido: Cliente = await this.clientesService.obtenerPorId( idCliente );
		return respuesta.status( HttpStatus.OK ).json( clienteObtenido );
	}

	// ----------------------------------------------------------------------------------------------------------------
	@Post( '/' )
	public async agregarCliente(
		@Res( ) respuesta: Response,
		@Body( ) crearClienteDTO: CrearClienteDTO
	): Promise<Response> {
		const clienteAgregado: Cliente = await this.clientesService.agregar( crearClienteDTO );
		return respuesta.status( HttpStatus.CREATED ).json( clienteAgregado );
	}

	@Put( '/:idCliente' )
	public async modificarCliente(
		@Res( ) respuesta: Response,
		@Param( 'idCliente', new ObjectIdPipe( ) ) idCliente: Types.ObjectId,
		@Body( ) modificarClienteDTO: ModificarClienteDTO
	): Promise<Response> {
		const clienteModificado: Cliente = await this.clientesService.modificar(
			idCliente,
			modificarClienteDTO
		);
		return respuesta.status( HttpStatus.OK ).json( clienteModificado );
	}

	@Delete( '/:idCliente' )
	public async eliminarCliente(
		@Res( ) respuesta: Response,
		@Param( 'idCliente', new ObjectIdPipe( ) ) idCliente: Types.ObjectId
	): Promise<Response> {
		const clienteEliminado: Cliente | null = await this.clientesService.eliminar( idCliente );

		if ( clienteEliminado === null ) {
			return respuesta.status( HttpStatus.NO_CONTENT ).json( null );
		}
		else {
			return respuesta.status( HttpStatus.OK ).json( clienteEliminado );
		}
	}

}