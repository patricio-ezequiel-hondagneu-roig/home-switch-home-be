import { Module } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';

@Module({
	providers: [
		PublicacionesService,
	],
	exports: [
		PublicacionesService,
	],
})
export class PublicacionesModule { }
