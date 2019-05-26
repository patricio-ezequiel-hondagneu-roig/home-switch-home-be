import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResidenciasController } from './residencias.controller';
import { ResidenciasService } from './residencias.service';
import { SubastasController } from './subastas.controller';
import { SubastasService } from './subastas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ResidenciaSchema } from './schemas/residencia.schema';
@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost/home-switch-home', { useNewUrlParser: true }),
		MongooseModule.forFeature([{ name: 'Residencia', schema: ResidenciaSchema }])
	],
	controllers: [ AppController, ResidenciasController, SubastasController ],
	providers: [ AppService, ResidenciasService, SubastasService ],
})
export class AppModule { }