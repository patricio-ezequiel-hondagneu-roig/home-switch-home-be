import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CredencialesPipe } from './pipes/credenciales.pipe';
import { CredencialesDTO } from './dto/credenciales.dto';
import { AuthService } from './auth.service';

@Controller( '/auth' )
export class AuthController {

	public constructor(
		private authService: AuthService,
	) { }

	@Post( '/ingresar' )
	public async ingresar(
		@Res( ) respuesta: Response,
		@Body( new CredencialesPipe( ) ) credencialesDTO: CredencialesDTO,
	): Promise<Response> {
		const token = await this.authService.generarToken( credencialesDTO.email, credencialesDTO.contraseña );

		return respuesta.status( HttpStatus.OK ).json( token );
	}
}
