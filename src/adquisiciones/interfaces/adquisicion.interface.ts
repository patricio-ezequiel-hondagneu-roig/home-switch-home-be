import { Document, Types } from 'mongoose';

export interface Adquisicion extends Document {
	readonly _id: Types.ObjectId;
	readonly idCliente: string;
	readonly idPublicacion: string;
	readonly monto: number;
	readonly fechaDeCreacion: string;
	readonly tipoDeAdquisicion: string;
}