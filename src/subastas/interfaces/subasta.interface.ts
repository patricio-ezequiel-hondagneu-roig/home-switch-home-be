import { Document, Types } from 'mongoose';

export interface Subasta extends Document {
	readonly _id: Types.ObjectId;
	readonly idResidencia: Types.ObjectId;
	readonly montoInicial: number;
	readonly fechaDeInicio: string;
	readonly fechaDeFin: string;
	readonly ofertas: string[ ];
}