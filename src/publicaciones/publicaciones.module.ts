import { Module, forwardRef } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { MongooseModule } from '@nestjs/mongoose';
import { publicacionSchema } from './schemas/publicacion.schema';
import { ResidenciasModule } from 'src/residencias/residencias.module';
import { PublicacionesController } from './publicaciones.controller';
import { AdquisicionesModule } from 'src/adquisiciones/adquisiciones.module';
import { SubastasModule } from 'src/subastas/subastas.module';
import { OfertasModule } from 'src/ofertas/ofertas.module';
import { ClientesModule } from 'src/clientes/clientes.module';

@Module({
	imports: [
		MongooseModule.forFeature([{
			name: 'Publicacion',
			schema: publicacionSchema,
			collection: 'Publicaciones',
		}]),
		forwardRef( ( ) => SubastasModule ),
		forwardRef( ( ) => ResidenciasModule ),
		forwardRef( ( ) => AdquisicionesModule ),
		forwardRef( ( ) => OfertasModule ),
		forwardRef( ( ) => ClientesModule ),
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
