import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientesModule } from 'src/clientes/clientes.module';
import { ResidenciasModule } from 'src/residencias/residencias.module';
import { SubastasController } from './subastas.controller';
import { SubastasService } from './subastas.service';
import { publicacionSchema } from 'src/publicaciones/schemas/publicacion.schema';
import { PublicacionesModule } from 'src/publicaciones/publicaciones.module';

@Module({
	imports: [
		MongooseModule.forFeature([{
			name: 'Publicacion',
			schema: publicacionSchema,
			collection: 'Publicaciones'
		}]),
		forwardRef( ( ) => PublicacionesModule ),
		forwardRef( ( ) => ResidenciasModule ),
		forwardRef( ( ) => ClientesModule ),
	],
	exports: [
		SubastasService,
	],
	controllers: [
		SubastasController,
	],
	providers: [
		SubastasService,
	]
})
export class SubastasModule { }
