import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResidenciasController } from './residencias.controller';
import { ResidenciasService } from './residencias.service';
import { SubastasController } from './subastas.controller';
import { SubastasService } from './subastas.service';

@Module({
	imports: [ ],
	controllers: [ AppController, ResidenciasController, SubastasController ],
	providers: [ AppService, ResidenciasService, SubastasService ],
})
export class AppModule { }