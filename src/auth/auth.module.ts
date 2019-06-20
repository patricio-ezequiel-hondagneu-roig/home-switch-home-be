import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ClientesModule } from 'src/clientes/clientes.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secretOrPrivateKey: 'secretKey',
			signOptions: {
				expiresIn: 3600,
			},
		}),
		ClientesModule
	],
	exports: [
		PassportModule,
		AuthService
	],
	controllers: [
		AuthController
	],
	providers: [
		AuthService,
		JwtStrategy,
	],
})
export class AuthModule { }
