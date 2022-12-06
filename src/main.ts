import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(resolve(__dirname, 'images'), {
    prefix: '/static',
  });

  app.use(cookieParser());
  app.use(
    session({
      secret: 'linyan',
      rolling: true,
      name: '_auth',
      cookie: {
        httpOnly: false,
        maxAge: 99999,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
