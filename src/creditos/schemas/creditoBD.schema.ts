import { Schema, Types } from 'mongoose';

export const creditoBDSchema = new Schema({
	fechaDeCreacion: {
		type:  String,
		required: [ true, 'El campo fecha de creacion es requerido.' ],
	},
	monto: {
		type:  Number,
		required: [ true, 'El campo monto es requerido.' ],
	},
});