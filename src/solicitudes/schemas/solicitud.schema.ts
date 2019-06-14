import { Schema, Types } from 'mongoose';

export const solicitudSchema = new Schema({
	idCliente: {
		type: Schema.Types.ObjectId,
		validate: {
			validator: ( value: string ): boolean => {
				return Types.ObjectId.isValid( value );
			}
		},
		required: [ true, 'El campo idCliente es requerido.' ],
	},
});