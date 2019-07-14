import { Document, Types } from 'mongoose';

export interface Hotsale extends Document {
	readonly _id: Types.ObjectId;
	readonly idPublicacion: string;
	readonly fechaDeInicio: string;
	readonly fechaDeFin: string;
	readonly monto: number;
}