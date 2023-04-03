import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Document } from "./entities/document.entity";
import { Page } from "../page/entities/page.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Document, Page])],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [DocumentService]
})
export class DocumentModule {}
