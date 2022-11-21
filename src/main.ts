import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
