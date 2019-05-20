import { RemoverPropiedades } from 'src/typings/remover-propiedades';

export interface Subasta {
	idSubasta: string;
	idResidencia: string;
	montoInicial: number;
	fechaDeInicio: string;
	fechaDeFin: string;
	ofertas: string[];
}

export type SubastaParaCrear = RemoverPropiedades<Subasta, 'idSubasta' | 'ofertas'>;
export type SubastaParaModificar = RemoverPropiedades<Subasta, 'idSubasta' | 'idResidencia' | 'ofertas'>;