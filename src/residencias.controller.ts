// import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Controller, Delete, Get,  Param, Post, Put, Req, Res, HttpStatus , NotFoundException, Body, Query } from '@nestjs/common';
import { Request } from 'express';
import { Residencia } from './interfaces/residencia.interface';
import { ResidenciasService } from './residencias.service';
import { ValidateObjectId } from './validadores/validate-object-id';
import { CrearResidenciaDTO } from './dto/crearResidencia.dto';
/**
 * Controlador que procesa las peticiones HTTP al endpoint /residencias
 */
@Controller( '/residencias' )
export class ResidenciasController {
	public constructor(
		private readonly residenciasService: ResidenciasService,
	) { }

	/**
	 * Método que procesa las peticiones HTTP con método **GET** al endpoint /residencias.
	 *
	 * Retorna una lista con todas las residencias.
	 */
	@Get( '/' )
	public async getResidencias(@Res() res) {
		const residencias = await this.residenciasService.obtenerTodas();
		return res.status(HttpStatus.OK).json(residencias);
	}

	/**
	 * Método que procesa las peticiones HTTP con método **GET** al endpoint /residencias/_:idResidencia_, donde
	 * _:idResidencia_ se mapea al parámetro `idResidencia`.
	 *
	 * Retorna la residencia con el identificador provisto, si existe, o _null_ en caso contrario.
	 *
	 * @param idResidencia identificador de la residencia buscada
	 */
	@Get( '/:idResidencia' )
	public async getResidencia(@Res() res, @Param('idResidencia', new ValidateObjectId())idResidencia) {
		const residencia = await this.residenciasService.obtenerPorId(idResidencia);
		if (!residencia) { throw new NotFoundException('Post does not exist!');
		}
		return res.status(HttpStatus.OK).json(residencia);
	}

	/**
	 * Método que procesa las peticiones HTTP con método **POST** al endpoint /residencias.
	 *
	 * Crea una residencia nueva según el cuerpo de la petición y la retorna.
	 *
	 * @param peticion petición HTTP recibida
	 */
	@Post( '/' )
	public async agregarResidencia(@Res() res, @Body() residenciaCreadaDTO: CrearResidenciaDTO) {
		const nuevaResidencia = await this.residenciasService.crear(residenciaCreadaDTO);
		return res.status(HttpStatus.OK).json({
			message: 'La residencia se cargo satisfactoriamente!',
			post: nuevaResidencia
		});
	}

	/**
	 * Método que procesa las peticiones HTTP con método **PUT** al endpoint /residencias/_:idResidencia_, donde
	 * _:idResidencia_ se mapea al parámetro `idResidencia`.
	 *
	 * Modifica la residencia con el identificador provisto y la retorna, si existe, o falla en caso contrario.
	 *
	 * @param idResidencia identificador de la residencia a modificar
	 * @param peticion petición HTTP recibida
	 */
	@Put( '/:idResidencia' )
	public async editarResidencia(
		@Res() res,
		@Query('idResidencia', new ValidateObjectId()) idResidencia,
		@Body() residenciaCreadaDTO: CrearResidenciaDTO
	) {
		const residenciaEditada = await this.residenciasService.modificar(idResidencia, residenciaCreadaDTO);
		if (!residenciaEditada) { throw new NotFoundException('La residencia no existe!'); }
		return res.status(HttpStatus.OK).json({
			message: 'La residencia se ha actualizado correctamente.',
			post: residenciaEditada
		});
	}

	/**
	 * Método que procesa las peticiones HTTP con método **DELETE** al endpoint /residencias/_:idResidencia_, donde
	 * _:idResidencia_ se mapea al parámetro `idResidencia`.
	 *
	 * Elimina la residencia con el identificador provisto, si existe, o falla en caso contrario.
	 *
	 * @param idResidencia identificador de la residencia a modificar
	 */
	@Delete( '/:idResidencia' )
	public async borrarResidencia(@Res() res, @Query('idResidencia', new ValidateObjectId()) idResidencia) {
		const residenciaEliminada = await this.residenciasService.eliminar(idResidencia);
		if (!residenciaEliminada){ throw new NotFoundException('Post does not exist!'); }
		return res.status(HttpStatus.OK).json({
			message: 'Post has been deleted!',
			post: residenciaEliminada
		})
	}

}