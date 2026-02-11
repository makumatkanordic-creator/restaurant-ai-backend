import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ CORS
  app.enableCors();

  // ✅ Global Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,      // يحذف الحقول غير المصرح بها
      transform: true,      // يحول string إلى number تلقائياً
      forbidNonWhitelisted: true,
    }),
  );

  // ✅ Swagger
  const config = new DocumentBuilder()
    .setTitle('Restaurant AI API')
    .setDescription('AI-powered ordering system')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 8000;
  await app.listen(port);

  console.log(`Server running on port ${port}`);
}
bootstrap();
