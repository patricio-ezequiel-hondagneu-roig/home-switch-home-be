import { Schema, Types } from 'mongoose';
import { TipoDeAdquisicion } from './tipoDeAdquisicion.enum';

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
		validate: {
			validator: ( value: string ): boolean => {
				return ( value === TipoDeAdquisicion.ReservaDirecta ) ||
				( value === TipoDeAdquisicion.Subasta ) ||
				( value === TipoDeAdquisicion.HotSale );
			}
		},
	},
});