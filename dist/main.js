'use strict';

const core_1 = require('@nestjs/core');
const app_module_1 = require('./app.module');
const swagger_1 = require('@nestjs/swagger');
async function bootstrap() {
  const app = await core_1.NestFactory.create(app_module_1.AppModule, {
    cors: true,
  });
  const config = new swagger_1.DocumentBuilder()
    .setTitle('Bookstore API')
    .setDescription('')
    .setVersion('1.0')
    .addTag('bookstore')
    .build();
  const document = swagger_1.SwaggerModule.createDocument(app, config);
  swagger_1.SwaggerModule.setup('api', app, document);
  await app.listen(8000);
}
bootstrap();
//# sourceMappingURL=main.js.map
