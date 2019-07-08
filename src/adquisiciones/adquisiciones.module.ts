import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdquisicionesController } from './adquisiciones.controller';
import { AdquisicionesService } from './adquisiciones.service';
import { adquisicionSchema } from './schemas/adquisicion.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{
			name: 'Adquisicion',
			schema: adquisicionSchema,
			collection: 'Adquisiciones'
		}]),
	],
	exports: [
		AdquisicionesService,
	],
	controllers: [
		AdquisicionesController,
	],
	providers: [
		AdquisicionesService,
	]
})
export class AdquisicionesModule { }
