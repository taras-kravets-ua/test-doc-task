import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { DocumentService } from './document.service';


@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('page/:name(*)')
  getDocument(@Param('name') name: string, @Res({ passthrough: true }) res: any) {
    res.set({
      'Content-Type': `application/${name.split('.').slice(1).join()}`,
      'Content-Disposition': `attachment; filename="${name}"`,
    });
    const file = createReadStream(`./apps/backend/src/assets/pages/${name}`);
    return new StreamableFile(file);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id)
    return this.documentService.findOne(+id);
  }
}
