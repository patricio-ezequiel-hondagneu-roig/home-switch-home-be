import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OfertasController } from './ofertas.controller';
import { OfertasService } from './ofertas.service';
import { ofertaSchema } from './schemas/oferta.schema';
import { PublicacionesModule } from 'src/publicaciones/publicaciones.module';

@Module({
	imports: [
		MongooseModule.forFeature([{
			name: 'Oferta',
			schema: ofertaSchema,
			collection: 'Ofertas'
		}]),
		forwardRef( ( ) => PublicacionesModule ),
	],
	exports: [
		OfertasService,
	],
	controllers: [
		OfertasController,
	],
	providers: [
		OfertasService,
	]
})
export class OfertasModule { }
