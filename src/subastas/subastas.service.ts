import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ObjectIdPipe } from 'src/helpers/validadores/ObjectIdPipe';
import { ResidenciasService } from '../residencias/residencias.service';
import { CrearSubastaDTO } from './dto/crear-subasta.dto';
import { ModificarSubastaDTO } from './dto/modificar-subasta.dto';
import { Subasta } from './interfaces/subasta.interface';

@Injectable( )
export class SubastasService {

	public constructor(
		@InjectModel( 'Subasta' )
		private readonly subastaModel: Model<Subasta>,
		@Inject( forwardRef( ( ) => ResidenciasService ) )
		private readonly residenciasService: ResidenciasService,
	) { }

	public async obtenerTodas( ): Promise<Subasta[ ]> {
		return this.subastaModel.find( ).exec( );
	}

	public async obtenerPorId( idSubasta: Types.ObjectId ): Promise<Subasta> {
		const subasta = await this.subastaModel.findById( idSubasta ).exec( );

		if ( subasta !== null ) {
			return subasta;
		}
		else {
			throw new NotFoundException( `No existen subastas con idSubasta "${ idSubasta }".` );
		}
	}

	// TODO: Validar que no exista otra subasta en las fechas solicitadas
	public async agregar( crearSubastaDTO: CrearSubastaDTO ): Promise<Subasta> {
		const idResidencia = await new ObjectIdPipe( ).transform( crearSubastaDTO.idResidencia );
		const residencia = await this.residenciasService.obtenerPorId( idResidencia );

		if ( crearSubastaDTO.montoInicial < residencia.montoInicialDeSubasta ) {
			throw new BadRequestException(
				`No se puede crear la subasta porque el monto inicial provisto ` +
				`(${ crearSubastaDTO.montoInicial }) es inferior al monto mínimo ` +
				`permitido (${ residencia.montoInicialDeSubasta }).`
			);
		}

		const subastaAgregada = new this.subastaModel( crearSubastaDTO ).save( );
		return subastaAgregada;
	}

	// TODO: Validar que no exista otra subasta en las fechas solicitadas
	public async modificar(
		idSubasta: Types.ObjectId,
		modificarSubastaDTO: ModificarSubastaDTO
	): Promise<Subasta> {
		const subasta = await this.obtenerPorId( idSubasta );
		const residencia = await this.residenciasService.obtenerPorId( subasta.idResidencia );

		if ( modificarSubastaDTO.montoInicial < residencia.montoInicialDeSubasta ) {
			throw new BadRequestException(
				`No se puede modificar la subasta porque el monto inicial provisto ` +
				`(${ modificarSubastaDTO.montoInicial }) es inferior al monto mínimo ` +
				`permitido (${ residencia.montoInicialDeSubasta }).`
			);
		}

		const subastaModificada = await this.subastaModel
			.findByIdAndUpdate( idSubasta, modificarSubastaDTO, { new: true } )
			.exec( );

		if ( subastaModificada !== null ) {
			return subastaModificada;
		}
		else {
			throw new NotFoundException(
				`No existe ninguna subasta con el ID "${ idSubasta }"`
			);
		}
	}

	public async eliminar( idSubasta: Types.ObjectId ): Promise<Subasta | null> {
		return this.subastaModel.findByIdAndRemove( idSubasta ).exec( );
	}

	public async obtenerPorIdResidencia( idResidencia: Types.ObjectId ): Promise<Subasta[ ]> {
		return this.subastaModel
			.find({
				idResidencia: idResidencia,
			})
			.exec( );
	}

}