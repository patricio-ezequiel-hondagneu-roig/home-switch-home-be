import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable( )
export class ObjectIdPipe implements PipeTransform<string, Promise<Types.ObjectId>> {

	public static transform( value: string ): Promise<Types.ObjectId> {
		const instancia = new ObjectIdPipe( );
		return instancia.transform( value );
	}

	public async transform( value: string ): Promise<Types.ObjectId> {
		if ( ! Types.ObjectId.isValid( value ) ) {
			throw new BadRequestException( `"${ value }" no es un identificador válido.` );
		}
		return new Types.ObjectId( value );
	}

}