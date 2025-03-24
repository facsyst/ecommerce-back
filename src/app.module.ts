import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalesModule } from './sales/sales.module';
import { ProductsModule } from './products/products.module';
import { UsuarioModule } from './usuario/usuario.module';
import { LoginHistoryModule } from './login_history/login_history.module';

@Module({
  imports: [
    ConfigModule.forRoot(), //Cargar las variables de entorno desde .env
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: false }, // IMPORTANTE PARA RENDER
      autoLoadEntities: true, //CARGAR ENTIDADES AUTOMATICAMENTE
      synchronize: true, //solo en desarrollo , no en producccion
    }),

    SalesModule,
    ProductsModule,
    UsuarioModule,
    LoginHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
