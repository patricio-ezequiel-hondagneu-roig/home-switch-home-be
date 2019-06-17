import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable( )
export class ObjectIdPipe implements PipeTransform<string> {

	public static transform( value: string ): Promise<Types.ObjectId> {
		const instance = new ObjectIdPipe( );
		return instance.transform( value );
	}

	public async transform( value: string ): Promise<Types.ObjectId> {
		if ( ! Types.ObjectId.isValid( value ) ) {
			throw new BadRequestException( `"${ value }" no es un identificador válido.` );
		}
		return new Types.ObjectId( value );
	}

}