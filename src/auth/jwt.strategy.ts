import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { TokenPayload } from './interfaces/token-payload.interface';
import { Cliente } from 'src/clientes/interfaces/cliente.interface';

@Injectable( )
export class JwtStrategy extends PassportStrategy( Strategy ) {

	public constructor(
		private readonly authService: AuthService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken( ),
			secretOrKey: 'secretKey',
		});
	}

	public async validate( payload: TokenPayload ): Promise<Cliente> {
		const cliente = await this.authService.validarPayload( payload );

		if ( cliente === null ) {
			throw new UnauthorizedException( 'Necesitas iniciar sesión para acceder a este recurso' );
		}

		return cliente;
	}

}