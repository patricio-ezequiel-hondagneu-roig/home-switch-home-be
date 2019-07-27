import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { clienteSchema } from './schemas/cliente.schema';
import { SubastasModule } from 'src/subastas/subastas.module';

@Module({
	imports: [
		MongooseModule.forFeature([{
			name: 'Cliente',
			schema: clienteSchema,
			collection: 'Clientes'
		}]),
		forwardRef( ( ) => SubastasModule ),
	],
	exports: [
		ClientesService,
	],
	controllers: [
		ClientesController,
	],
	providers: [
		ClientesService,
	]
})
export class ClientesModule { }
