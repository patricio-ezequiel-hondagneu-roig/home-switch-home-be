import { Schema, Types } from 'mongoose';

export const subastaSchema = new Schema({
	idResidencia: {
		type: Schema.Types.ObjectId,
		validate: {
			validator: ( value: string ): boolean => {
				return Types.ObjectId.isValid( value );
			},
			message: ({ value }) => `"${ value }" no es un valor válido para el campo idResidencia.`,
		},
		required: [ true, 'El campo idResidencia es requerido.' ],
	},
	montoInicial: {
		type: Number,
		required: [ true, 'El campo montoInicial es requerido.' ],
	},
	fechaDeInicio: {
		type: String,
		required: [ true, 'El campo fechaDeInicio es requerido.' ],
	},
	fechaDeFin: {
		type: String,
		required: [ true, 'El campo fechaDeFin es requerido.' ],
	},
});