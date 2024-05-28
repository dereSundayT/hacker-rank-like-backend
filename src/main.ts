import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT ?? 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //::: SwaggerDoc Configuration
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('api documentation for tvz corp.')
    .setVersion('1.0')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  //Swagger Doc End Here

  await app.listen(PORT);
}
bootstrap().then(() => console.log(`server started at ${PORT}`));
