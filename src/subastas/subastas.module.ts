import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResidenciasModule } from 'src/residencias/residencias.module';
import { subastaSchema } from './schemas/subasta.schema';
import { SubastasController } from './subastas.controller';
import { SubastasService } from './subastas.service';

@Module({
	imports: [
		MongooseModule.forFeature([{
			name: 'Subasta',
			schema: subastaSchema,
			collection: 'Subastas'
		}]),
		forwardRef( ( ) => ResidenciasModule ),
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
