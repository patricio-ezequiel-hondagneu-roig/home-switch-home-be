import { Module, forwardRef } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { MongooseModule } from '@nestjs/mongoose';
import { publicacionSchema } from './schemas/publicacion.schema';
import { ResidenciasModule } from 'src/residencias/residencias.module';
import { PublicacionesController } from './publicaciones.controller';
import { AdquisicionesModule } from 'src/adquisiciones/adquisiciones.module';

@Module({
	imports: [
		MongooseModule.forFeature([{
			name: 'Publicacion',
			schema: publicacionSchema,
			collection: 'Publicaciones',
		}]),
		forwardRef( ( ) => ResidenciasModule ),
		forwardRef( ( ) => AdquisicionesModule ),
	],
	exports: [
		PublicacionesService,
	],
	controllers: [
		PublicacionesController,
	],
	providers: [
		PublicacionesService,
	],
})
export class PublicacionesModule { }
