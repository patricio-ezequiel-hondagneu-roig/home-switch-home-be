import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import chalk from 'chalk';

const anunciar = ( ) => {
	const hora = chalk.bold.whiteBright( new Date( Date.now( ) ).toLocaleTimeString( ) );
	const url = chalk.underline.cyanBright( `http://localhost:${ puerto }` );
	const anuncio = chalk.blueBright( `El servidor está escuchando peticiones HTTP en ${ url }.` );
	const mensaje = chalk.whiteBright( `\n${ hora } - ${ anuncio }\n` );

	// tslint:disable-next-line: no-console
	console.log( mensaje );
};

const puerto = 3000;

async function bootstrap( ) {
	const app = await NestFactory.create( AppModule );
	app.use( logger );
	app.enableCors();
	await app.listen( puerto, anunciar );
}

bootstrap( );