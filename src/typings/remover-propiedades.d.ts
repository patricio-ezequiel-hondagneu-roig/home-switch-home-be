/**
 * Permite expresar un tipo derivado de un tipo original, excluyendo ciertas propiedades del original.
 */
export type RemoverPropiedades<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;