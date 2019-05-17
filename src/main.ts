import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const puerto = 3000;

async function bootstrap( ) {
	const app = await NestFactory.create( AppModule );
	await app.listen( puerto, ( ) => {
		// tslint:disable-next-line: no-console
		console.log( `\nEl servidor está escuchando peticiones HTTP en http://localhost:${ puerto }\n` );
	});
}

bootstrap( );