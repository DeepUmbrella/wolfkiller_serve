import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(resolve(__dirname, 'images'), {
    prefix: '/static',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages: true,
      whitelist: true,
    }),
  );
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.CAPTCHA_SECRET || '123456',
      rolling: true,
      name: process.env.CAPTCHA_SESSION_KEY || 'captcha_session',
      resave: false,
      saveUninitialized: false,

      cookie: {
        httpOnly: true,
        maxAge: Number.parseInt('3000'),
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
