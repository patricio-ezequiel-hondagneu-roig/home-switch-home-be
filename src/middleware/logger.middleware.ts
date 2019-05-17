import { Request, Response } from 'express';
import chalk from 'chalk';

export function logger( request: Request, response: Response, next: Function ) {
	const hora = chalk.bold.whiteBright( new Date( Date.now( ) ).toLocaleTimeString( ) );
	const metodo = chalk.green( request.method );
	const url = chalk.yellow( request.originalUrl );
	const mensaje = chalk.whiteBright( `${ hora } - ${ metodo } ${ url }` );

	// tslint:disable-next-line: no-console
	console.log( mensaje );
	next( );
}
