import { Schema, Types } from 'mongoose';
import { creditoSchema } from 'src/creditos/schemas/credito.schema';

export const clienteSchema = new Schema({
	idSuscripcion: {
		type: Schema.Types.ObjectId,
		validate: {
			validator: ( value: string ): boolean => {
				return Types.ObjectId.isValid( value );
			}
		},
		required: [ true, 'El campo idSuscripcion es requerido.' ],
	},
	nombre: {
		type:  String,
		required: [ true, 'El campo nombre es requerido.' ],
	},
	apellido: {
		type:  String,
		required: [ true, 'El campo apellido es requerido.' ],
	},
	email: {
		type:  String,
		required: [ true, 'El campo email es requerido.' ],
	},
	contraseña: {
		type:  String,
		required: [ true, 'El campo contraseña es requerido.' ],
	},
	fechaDeNacimiento: {
		type:  String,
		required: [ true, 'El campo fechaDeNacimiento es requerido.' ],
	},
	celular: {
		type:  String,
		required: [ true, 'El campo celular es requerido.' ],
	},
	pais: {
		type:  String,
		required: [ true, 'El campo pais es requerido.' ],
	},
	tarjetaDeCredito: {
		type:  String,
		required: [ true, 'El campo tarjetaDeCredito es requerido.' ],
	},
	codigoDeSeguridad: {
		type:  String,
		required: [ true, 'El campo codigoDeSeguridad es requerido.' ],
	},
	fechaDeExpiracion: {
		type:  String,
		required: [ true, 'El campo fechaDeExpiracion es requerido.' ],
	},
	creditos: {
		type:  [ creditoSchema ],
		required: [ true, 'El campo creditos[] es requerido.' ],
	},
});