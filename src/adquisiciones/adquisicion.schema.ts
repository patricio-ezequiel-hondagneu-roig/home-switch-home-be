import { Schema, Types } from 'mongoose';

export const adquisicionSchema = new Schema({
	idCliente: {
		type: Schema.Types.ObjectId,
		validate: {
			validator: ( value: string ): boolean => {
				return Types.ObjectId.isValid( value );
			}
		},
		required: [ true, 'El campo idCliente es requerido.' ],
	},
	idPublicacion: {
		type: Schema.Types.ObjectId,
		validate: {
			validator: ( value: string ): boolean => {
				return Types.ObjectId.isValid( value );
			}
		},
		required: [ true, 'El campo idPublicacion es requerido.' ],
	},
	monto: {
		type:  Number,
		required: [ true, 'El campo monto es requerido.' ],
	},
	fechaDeCreacion: {
		type:  String,
		required: [ true, 'El campo fechaDeCreacion es requerido.' ],
	},
	tipoDeSuscripcion: {
		type:  String,
		required: [ true, 'El campo tipoDeSuscripcion es requerido.' ],
	},
});