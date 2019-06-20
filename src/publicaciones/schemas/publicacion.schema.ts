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
		validate: {
			validator: ( value: number ): boolean => {
				return value >= 0;
			}
		},
		required: [ true, 'El campo montoInicialDeSubasta es requerido.' ],
	},
	fechaDeInicioDeSemana: {
		type: Schema.Types.String,
		required: [ true, 'El campo fechaDeInicioDeSemana es requerido.' ],
	},
	cerroSubasta: {
		type: Schema.Types.Boolean,
		required: [ true, 'El campo cerroSubasta es requerido.' ],
	},
});