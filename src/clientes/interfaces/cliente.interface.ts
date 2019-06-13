import { Document, Types } from 'mongoose';
import { Credito } from 'src/creditos/interfaces/credito.interface';

export interface Cliente extends Document {
	readonly _id: Types.ObjectId;
	readonly idSuscripcion: string;
	readonly nombre: string;
	readonly apellido: string;
	readonly email: string;
	readonly contraseña: string;
	readonly fechaDeNacimiento: string;
	readonly celular: string;
	readonly pais: string;
	readonly tarjetaDeCredito: string;
	readonly codigoDeSeguridad: string;
	readonly fechaDeExpiracion: string;

	readonly creditos: Credito[ ];

	// readonly creditos: {
	// 	fechaDeCreacion: string,
	// 	activo: boolean
	// }[ ];
}