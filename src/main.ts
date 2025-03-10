import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './config/envs';

async function bootstrap() {
 const logger = new Logger("Orders Mricroservice")
 
   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
     AppModule,
     {
       transport: Transport.NATS,
       options: {
         servers: envs.natsServers,
         name: "orders-ms"
       }
     }
   )
 
   app.useGlobalPipes(
     new ValidationPipe({
       whitelist: true,
       forbidNonWhitelisted: true,
       transform: true,
     })
   )
   logger.log("Orders Microservices running")
   await app.listen();
}
bootstrap();
