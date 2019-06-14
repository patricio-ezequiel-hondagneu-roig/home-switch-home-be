import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubastasModule } from 'src/subastas/subastas.module';
import { SolicitudesController } from './solicitudes.controller';
import { SolicitudesService } from './solicitudes.service';
import { solicitudSchema } from './schemas/solicitud.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{
			name: 'Solicitud',
			schema: solicitudSchema,
			collection: 'Solicitudes'
		}]),
	],
	exports: [
		SolicitudesService,
	],
	controllers: [
		SolicitudesController,
	],
	providers: [
		SolicitudesService,
	]
})
export class SolicitudesModule { }
