import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common'; 
 
async function bootstrap() { 
  const app = await NestFactory.create(AppModule); 
  console.log("SERVER NYALA, JWT_SECRET ADALAH:", process.env.JWT_SECRET);

  app.enableCors();
  //app.useGlobalPipes(new ValidationPipe()); 
 
  const config = new DocumentBuilder() 
    .setTitle('Library API') 
    .setDescription('Backend API Sistem Perpustakaan') 
    .setVersion('1.0') 
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
      },
      'bearer', 
    ) 
    .build();
    const document = SwaggerModule.createDocument(app, config); 
  SwaggerModule.setup('api', app, document); 

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
console.log(`Application is running on port: ${port}`);}
bootstrap();