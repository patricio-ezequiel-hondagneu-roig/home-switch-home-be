import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable( )
export class ObjectIdPipe implements PipeTransform<string> {

	public async transform( value: string ): Promise<Types.ObjectId> {
		if ( ! Types.ObjectId.isValid( value ) ) {
			throw new BadRequestException( `"${ value }" no es un identificador válido.` );
		}
		return new Types.ObjectId( value );
	}

}