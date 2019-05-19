import { RemoverPropiedades } from 'src/typings/remover-propiedades';

export interface Subasta {
	idSubasta: string;
	idResidencia: string;
	fechaDeInicio: string;
	fechaDeFin: string;
	montoInicial: number;
	//ofertas: Oferta[]
}

export type SubastaParaCrear = RemoverPropiedades<Subasta, 'idSubasta'>;
export type SubastaParaModificar = RemoverPropiedades<Subasta, 'idSubasta'>;