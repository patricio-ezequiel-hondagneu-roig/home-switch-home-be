import { Residencia } from 'src/interfaces/residencia.interface';

export interface UbicacionDeResidencia extends Pick<Residencia, 'pais' | 'provincia' | 'localidad' | 'domicilio'> { }