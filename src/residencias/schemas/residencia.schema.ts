import { Schema } from 'mongoose';

export const residenciaSchema = new Schema({
	titulo: {
		type: String,
		required: [ true, 'El campo titulo es requerido.' ],
	},
	pais: {
		type: String,
		required: [ true, 'El campo pais es requerido.' ],
	},
	provincia: {
		type: String,
		required: [ true, 'El campo provincia es requerido.' ],
	},
	localidad: {
		type: String,
		required: [ true, 'El campo localidad es requerido.' ],
	},
	domicilio: {
		type: String,
		required: [ true, 'El campo domicilio es requerido.' ],
	},
	descripcion: {
		type: String,
		required: [ true, 'El campo descripcion es requerido.' ],
	},
	fotos: [ String ],
	montoInicialDeSubasta: {
		type: Number,
		required: [ true, 'El campo montoInicialDeSubasta es requerido.' ],
	},
});