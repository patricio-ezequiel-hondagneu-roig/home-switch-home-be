import { Module } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { MongooseModule } from '@nestjs/mongoose';
import { publicacionSchema } from './schemas/publicacion.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{
			name: 'Publicacion',
			schema: publicacionSchema,
			collection: 'Publicaciones',
		}])
	],
	exports: [
		PublicacionesService,
	],
	providers: [
		PublicacionesService,
	],
})
export class PublicacionesModule { }
