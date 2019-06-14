export class CrearAdquisicionDTO {
	public readonly idCliente!: string;
	public readonly idPublicacion!: string;
	public readonly monto!: number;
	public readonly fechaDeCreacion!: string;
	public readonly tipoDeAdquisicion!: string;
}

// Tipo de adquisicion supongo que va a tener los siguientes valores:
// 	> 'Reserva Directa'
// 	> 'Oferta'
// 	> 'Hot Sale'