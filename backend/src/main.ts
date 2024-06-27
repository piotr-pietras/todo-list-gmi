import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { isNumberObject } from 'util/types';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.HOST_PORT;
  if (!isNumberObject(new Number(port))) {
    throw 'Port number in Env file is not correct!';
  }

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);

  console.log(`Listening at port: ${port}`);
}
bootstrap();
