import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { json } from 'express';
// import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // const config = new DocumentBuilder()
  //   .setTitle('Bookstore API')
  //   .setDescription('')
  //   .setVersion('1.0')
  //   .addTag('bookstore')
  //   .build();
  // // app.use(cookieParser());
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);
  await app.listen(8000);
}
bootstrap();
