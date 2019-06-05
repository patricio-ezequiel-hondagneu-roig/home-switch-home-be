import { Document, Types } from 'mongoose';

export interface Suscripcion extends Document {
	readonly _id: Types.ObjectId;
	readonly tipoDeSuscripcion: string;
	readonly monto: number;
	readonly fechaDeCreacion: string;
}