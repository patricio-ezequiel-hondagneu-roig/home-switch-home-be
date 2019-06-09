import { Schema, Types } from 'mongoose';

export const publicacionSchema = new Schema({
	idResidencia: {
		type: Schema.Types.ObjectId,
		validate: {
			validator: ( value: string ): boolean => {
				return Types.ObjectId.isValid( value );
			}
		},
		required: [ true, 'El campo idResidencia es requerido.' ],
	},
	montoInicialDeSubasta: {
		type: Schema.Types.Number,
		required: [ true, 'El campo montoInicialDeSubasta es requerido.' ],
	},
	fechaDeInicio: {
		type: Schema.Types.String,
		required: [ true, 'El campo fechaDeInicio es requerido.' ],
	},
	fechaDeFin: {
		type: Schema.Types.String,
		required: [ true, 'El campo fechaDeFin es requerido.' ],
	},
});