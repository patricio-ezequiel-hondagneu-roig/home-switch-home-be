import { Schema, Types } from 'mongoose';

export const suscripcionSchema = new Schema({
	monto: {
		type: Number,
		required: [ true, 'El campo monto es requerido.' ],
	},
	tipoDeSuscripcion: {
		type: String,
		required: [ true, 'El campo tipoDeSuscripcion es requerido.' ],
	},
	fechaDeCreacion: {
		type: String,
		required: [ true, 'El campo fechaDeCreacion es requerido.' ],
	},
});