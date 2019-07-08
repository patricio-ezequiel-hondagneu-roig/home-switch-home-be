import { Document, Types } from 'mongoose';
import { TipoDeAdquisicion } from '../schemas/tipoDeAdquisicion.enum';

export interface Adquisicion extends Document {
	readonly _id: Types.ObjectId;
	readonly idCliente: string;
	readonly idPublicacion: string;
	readonly monto: number;
	readonly fechaDeCreacion: string;
	readonly tipoDeAdquisicion: TipoDeAdquisicion;
}