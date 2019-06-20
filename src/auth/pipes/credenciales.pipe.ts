import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { CredencialesDTO } from '../dto/credenciales.dto';

@Injectable( )
export class CredencialesPipe implements PipeTransform<unknown, CredencialesDTO> {

	public static transform( valor: string ): CredencialesDTO {
		const instancia = new CredencialesPipe( );
		return instancia.transform( valor );
	}

	public transform( valor: unknown ): CredencialesDTO {
		if ( typeof valor !== 'object' || valor === null ) {
			throw new BadRequestException( `Las credenciales deben enviarse en un objeto.` );
		}

		if ( ! this.esCredencialesDTO( valor ) ) {
			throw new BadRequestException( 'Las credenciales deben contener un email y una contraseña.' );
		}

		return valor;
	}

	private esCredencialesDTO( valor: unknown ): valor is CredencialesDTO {
		const credencialesDTO: CredencialesDTO = valor as CredencialesDTO;

		if ( credencialesDTO.email === undefined || typeof credencialesDTO.email !== 'string' ) {
			return false;
		}
		if ( credencialesDTO.contraseña === undefined || typeof credencialesDTO.contraseña !== 'string' ) {
			return false;
		}

		return true;
	}

}