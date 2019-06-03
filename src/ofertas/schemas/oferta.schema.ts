import { Schema } from 'mongoose';

export const ofertaSchema = new Schema({
	email: String,
	tarjeta: String,
	monto: Number,
});