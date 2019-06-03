import { Residencia } from 'src/residencias/interfaces/residencia.interface';

export interface UbicacionDeResidencia extends Pick<Residencia, 'pais' | 'provincia' | 'localidad' | 'domicilio'> { }