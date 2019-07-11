import { Document, Types } from 'mongoose';

export interface CreditoBD extends Document {
	readonly fechaDeCreacion: string;
	readonly monto: number;
}