import { Inject, Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from "./entities/document.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Page } from "../page/entities/page.entity";

@Injectable()
export class DocumentService {
  constructor(@InjectRepository(Document) private repo: Repository<Document>,
              @InjectRepository(Page) private repoPage: Repository<Page>,) {
  }

  async createDocumentForTest() {
    const findExist = await this.findAll();
    if (!findExist.length) {
      const newDoc = await this.repo.save({
        name: 'TestDoc',
      });
      console.log(newDoc)
      const pages: Omit<Page, 'id'>[] = [
        { name: '1.png', document: newDoc},
        { name: '2.png', document: newDoc },
        { name: '3.png', document: newDoc },
        { name: '4.png', document: newDoc },
        { name: '5.png', document: newDoc }
      ];
      pages.forEach(page => this.repoPage.save(page));
      return this.repo.save({ ...newDoc, ...pages });
    }
    return 'Test data already exists'
  }

  findAll(): Promise<Document[]> {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['pages'], order: { pages: { name: 'asc' } } });
  }
}
