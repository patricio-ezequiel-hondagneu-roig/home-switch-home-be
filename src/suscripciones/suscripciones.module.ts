import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResidenciasModule } from 'src/residencias/residencias.module';
import { suscripcionSchema } from './schemas/suscripcion.schema';
import { SuscripcionesController } from './suscripciones.controller';
import { SuscripcionesService } from './suscripciones.service';

@Module({
	imports: [
		MongooseModule.forFeature([{
			name: 'Suscripcion',
			schema: suscripcionSchema,
			collection: 'Suscripciones'
		}]),
	],
	exports: [
		SuscripcionesService,
	],
	controllers: [
		SuscripcionesController,
	],
	providers: [
		SuscripcionesService,
	]
})
export class SuscripcionesModule { }
