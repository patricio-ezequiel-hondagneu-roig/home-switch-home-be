import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubastasModule } from 'src/subastas/subastas.module';
import { HotsalesController } from './hotsales.controller';
import { HotsalesService } from './hotsales.service';
import { hotsaleSchema } from './schemas/hotsale.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{
			name: 'Hotsale',
			schema: hotsaleSchema,
			collection: 'Hotsales'
		}]),
	],
	exports: [
		HotsalesService,
	],
	controllers: [
		HotsalesController,
	],
	providers: [
		HotsalesService,
	]
})
export class HotsalesModule { }
