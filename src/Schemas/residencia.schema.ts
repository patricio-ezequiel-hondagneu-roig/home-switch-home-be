import * as mongoose from 'mongoose';
export const ResidenciaSchema = new mongoose.Schema({
	titulo: String,
	pais: String,
	provincia: String,
	localidad: String,
	domicilio: String,
	descripcion: String,
	fotos: [] ,
	montoInicialDeSubasta: Number
})