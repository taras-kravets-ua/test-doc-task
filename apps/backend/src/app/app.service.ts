import { Injectable } from '@nestjs/common';
import { DocumentService } from "./resources/document/document.service";

@Injectable()
export class AppService {
  constructor(documentService: DocumentService) {
    documentService.createDocumentForTest().then((v) => console.log(v));
  }
}
