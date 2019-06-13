import { Schema, Types } from 'mongoose';

export const creditoSchema = new Schema({
	fechaDeCreacion: {
		type:  String,
		required: [ true, 'El campo fecha de creacion es requerido.' ],
	},
	activo: {
		type:  Boolean,
		required: [ true, 'El campo activo es requerido.' ],
	},
}, { _id : false });