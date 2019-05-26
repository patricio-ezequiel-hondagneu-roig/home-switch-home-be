import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class ValidateObjectId implements PipeTransform<string> {
	public async transform(value: string, metadata: ArgumentMetadata) {
		const isValid = mongoose.Types.ObjectId.isValid(value);
		if (!isValid){ throw new BadRequestException('ID MInvalida!'); }
		return value;
	}
}