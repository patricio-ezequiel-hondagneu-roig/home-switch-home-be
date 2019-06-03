import { Document, Types } from 'mongoose';

export interface Residencia extends Document {
	readonly _id: Types.ObjectId;
	readonly titulo: string;
	readonly pais: string;
	readonly provincia: string;
	readonly localidad: string;
	readonly domicilio: string;
	readonly descripcion: string;
	readonly fotos: string[ ];
	readonly montoInicialDeSubasta: number;
}