import { Document } from 'mongoose';

export interface Oferta extends Document {
	email: string;
	tarjeta: string;
	monto: number;
}