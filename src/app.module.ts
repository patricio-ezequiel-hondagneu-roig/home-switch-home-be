import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OfertasModule } from './ofertas/ofertas.module';
import { ResidenciasModule } from './residencias/residencias.module';
import { SubastasModule } from './subastas/subastas.module';
import { SuscripcionesModule } from './suscripciones/suscripciones.module';

@Module({
	imports: [
		MongooseModule.forRoot( 'mongodb://localhost/home-switch-home', { useNewUrlParser: true } ),
		ResidenciasModule,
		SubastasModule,
		OfertasModule,
		SuscripcionesModule
	],
})
export class AppModule { }