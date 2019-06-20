import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientesService } from 'src/clientes/clientes.service';
import { TokenPayload } from './interfaces/token-payload.interface';
import { Cliente } from 'src/clientes/interfaces/cliente.interface';

@Injectable()
export class AuthService {

	public constructor(
		private readonly clientesService: ClientesService,
		private readonly jwtService: JwtService
	) { }

	public async generarToken( email: string, contraseña: string ): Promise<string> {
		const clientesConEmail = await this.clientesService.obtenerPorEmail( email );

		if ( clientesConEmail.length === 0 ) {
			throw new UnprocessableEntityException( 'Las credenciales no coinciden' );
		}

		const cliente = clientesConEmail[ 0 ];

		if ( cliente.contraseña !== contraseña ) {
			throw new UnprocessableEntityException( 'Las credenciales no coinciden' );
		}

		const tokenPayload: TokenPayload = {
			email: cliente.email
		};
		return this.jwtService.sign( tokenPayload );
	}

	public async validarPayload( tokenPayload: TokenPayload ): Promise<Cliente | null> {
		if ( tokenPayload.email === undefined ) {
			return null;
		}

		const clientesConEmail = await this.clientesService.obtenerPorEmail( tokenPayload.email );

		if ( clientesConEmail.length === 0 ) {
			return null;
		}

		return clientesConEmail[ 0 ];
	}

}