import { Types } from 'mongoose';

export class CrearSubastaDTO {
	public readonly idResidencia: string;
	public readonly montoInicial: number;
	public readonly fechaDeInicio: string;
	public readonly fechaDeFin: string;
}