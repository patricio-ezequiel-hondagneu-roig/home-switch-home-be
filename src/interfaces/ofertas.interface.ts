import { RemoverPropiedades } from 'src/typings/remover-propiedades';

export interface Oferta {
	idOferta: string;
	email: string;
	tarjeta: string;
	monto: number;
}

export type OfertaParaCrear = RemoverPropiedades<Oferta, 'idOferta'>;
export type OfertaParaModificar = RemoverPropiedades<Oferta, 'idOferta'>;