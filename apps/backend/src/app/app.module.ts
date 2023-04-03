import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeormConfig } from "../../data-source/data-source";
import { DocumentModule } from "./resources/document/document.module";

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), DocumentModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
