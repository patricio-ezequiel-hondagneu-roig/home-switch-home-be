import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { creditoBDSchema } from './schemas/creditoBD.schema';
import { CreditosController } from './creditos.controller';
import { CreditosService } from './creditos.service';

@Module({
	imports: [
		MongooseModule.forFeature([{
			name: 'Credito',
			schema: creditoBDSchema,
			collection: 'Creditos'
		}]),
	],
	exports: [
		CreditosService,
	],
	controllers: [
		CreditosController,
	],
	providers: [
		CreditosService,
	]
})
export class CreditosModule { }
