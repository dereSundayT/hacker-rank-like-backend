import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const PORT = process.env.PORT ?? 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Cors
  const allowedOrigins = ['*'];
  const corsOptions: CorsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['*'],
  };
  app.enableCors(corsOptions);
  //End of Cors
  //::: Set Global Prefix
  app.setGlobalPrefix('api/v1', { exclude: ['/'] });

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
  //::: Validation  Configuration
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException({
          status: false,
          message: result,
          data: null,
        });
      },
      stopAtFirstError: true,
    }),
  );

  await app.listen(PORT);
}
bootstrap().then(() => console.log(`server started at ${PORT}`));
