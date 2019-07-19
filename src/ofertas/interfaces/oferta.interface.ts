import { Document, Types } from 'mongoose';

export interface Oferta extends Document {
	readonly _id: Types.ObjectId;
	readonly idCliente: Types.ObjectId;
	readonly idPublicacion: Types.ObjectId;
	readonly monto: number;
	readonly fechaDeCreacion: string;
}