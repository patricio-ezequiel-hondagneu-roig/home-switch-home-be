import { Document, Types } from 'mongoose';

export interface Solicitud extends Document {
	readonly _id: Types.ObjectId;
	readonly idCliente: Types.ObjectId;
}