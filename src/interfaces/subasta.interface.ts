import { RemoverPropiedades } from 'src/typings/remover-propiedades';
import { Oferta } from 'src/interfaces/ofertas.interface';

export interface Subasta {
	idSubasta: string;
	idResidencia: string;
	montoInicial: number;
	fechaDeInicio: string;
	fechaDeFin: string;
	ofertas: Oferta[];
}

export type SubastaParaCrear = RemoverPropiedades<Subasta, 'idSubasta' | 'ofertas'>;
export type SubastaParaModificar = RemoverPropiedades<Subasta, 'idSubasta' | 'idResidencia' | 'ofertas'>;