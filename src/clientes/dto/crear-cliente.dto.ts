import { Credito } from 'src/creditos/interfaces/credito.interface';

export class CrearClienteDTO {
	public readonly idSuscripcion!: string;
	public readonly esAdmin!: boolean;
	public readonly nombre!: string;
	public readonly apellido!: string;
	public readonly email!: string;
	public readonly contraseña!: string;
	public readonly fechaDeNacimiento!: string;
	public readonly celular!: string;
	public readonly pais!: string;
	public readonly tarjetaDeCredito!: string;
	public readonly codigoDeSeguridad!: string;
	public readonly fechaDeExpiracion!: string;
	public readonly creditos!: Credito[ ];
}