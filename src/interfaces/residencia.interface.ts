import { RemoverPropiedades } from 'src/typings/remover-propiedades';

export interface Residencia {
	idResidencia: string;
	titulo: string;
	pais: string;
	provincia: string;
	localidad: string;
	domicilio: string;
	descripcion: string;
	fotos: string[];
}

export type ResidenciaParaCrear = RemoverPropiedades<Residencia, 'idResidencia'>;
export type ResidenciaParaModificar = RemoverPropiedades<Residencia, 'idResidencia'>;