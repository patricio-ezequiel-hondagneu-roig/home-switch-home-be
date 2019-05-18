import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResidenciasController } from './residencias.controller';
import { ResidenciasService } from './residencias.service';

@Module({
	imports: [ ],
	controllers: [ AppController, ResidenciasController ],
	providers: [ AppService, ResidenciasService ],
})
export class AppModule { }