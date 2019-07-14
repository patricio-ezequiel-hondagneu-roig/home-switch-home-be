import { Schema, Types } from 'mongoose';

export const hotsaleSchema = new Schema({
	idPublicacion: {
		type: Schema.Types.ObjectId,
		validate: {
			validator: ( value: string ): boolean => {
				return Types.ObjectId.isValid( value );
			}
		},
		required: [ true, 'El campo idCliente es requerido.' ],
	},
	fechaDeInicio: {
		type:  String,
		required: [ true, 'El campo fechaDeInicio es requerido.' ],
	},
	fechaDeFin: {
		type:  String,
		required: [ true, 'El campo fechaDeFin es requerido.' ],
	},
	monto: {
		type:  Number,
		required: [ true, 'El campo monto es requerido.' ],
	},
});