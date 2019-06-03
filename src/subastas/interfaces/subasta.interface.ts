import { Document, Types } from 'mongoose';

export interface Subasta extends Document {
	idResidencia: Types.ObjectId;
	montoInicial: number;
	fechaDeInicio: string;
	fechaDeFin: string;
}