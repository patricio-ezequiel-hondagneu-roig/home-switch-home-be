import { Document, Types } from 'mongoose';

export interface Publicacion extends Document {
	readonly _id: Types.ObjectId;
	readonly idResidencia: Types.ObjectId;
	readonly montoInicialDeSubasta: number;
	readonly fechaDeInicioDeSemana: string;
	readonly cerroSubasta: boolean;
}