import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubastasModule } from 'src/subastas/subastas.module';
import { ResidenciasController } from './residencias.controller';
import { ResidenciasService } from './residencias.service';
import { residenciaSchema } from './schemas/residencia.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{
			name: 'Residencia',
			schema: residenciaSchema,
			collection: 'Residencias'
		}]),
		forwardRef( ( ) => SubastasModule ),
	],
	exports: [
		ResidenciasService,
	],
	controllers: [
		ResidenciasController,
	],
	providers: [
		ResidenciasService,
	]
})
export class ResidenciasModule { }
