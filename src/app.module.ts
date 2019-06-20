import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OfertasModule } from './ofertas/ofertas.module';
import { ResidenciasModule } from './residencias/residencias.module';
import { SubastasModule } from './subastas/subastas.module';
import { SuscripcionesModule } from './suscripciones/suscripciones.module';
import { PublicacionesModule as PublicacionesModule } from './publicaciones/publicaciones.module';
import { ClientesModule } from './clientes/clientes.module';
import { SolicitudesModule } from './solicitudes/solicitudes.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		MongooseModule.forRoot( 'mongodb://localhost/home-switch-home', { useNewUrlParser: true } ),
		ResidenciasModule,
		SubastasModule,
		OfertasModule,
		SuscripcionesModule,
		PublicacionesModule,
		ClientesModule,
		SolicitudesModule,
		AuthModule
	],
})
export class AppModule { }