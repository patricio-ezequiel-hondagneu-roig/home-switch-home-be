import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OfertasController } from './ofertas.controller';
import { OfertasService } from './ofertas.service';
import { ofertaSchema } from './schemas/oferta.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Oferta', schema: ofertaSchema, collection: 'Ofertas' }]),
	],
	exports: [
		OfertasService,
	],
	controllers: [
		OfertasController,
	],
	providers: [
		OfertasService,
	],
})
export class OfertasModule { }