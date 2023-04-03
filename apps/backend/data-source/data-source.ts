import { DataSource, DataSourceOptions, EntityTarget } from "typeorm";
import { Document } from "../src/app/resources/document/entities/document.entity";
import { Page } from "../src/app/resources/page/entities/page.entity";

export const typeormConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'test-doc-task',
  synchronize: true,
  entities: [
    Document,
    Page
  ],
  migrationsTableName: 'migrations',
  migrations: ['./dist/database/migrations/*{.ts,.js}'],
};

export const dataSource = new DataSource(typeormConfig);

// export class Seeds {
//   constructor(
//     entityName: EntityTarget<Document | Page>,
//     value: any,
//     seedName: string,
//   ) {
//     console.log('-------- Seeds ---------');
//     dataSource
//       .getRepository(entityName)
//       .find(value)
//       .then((result) => {
//         result.length
//           ? console.log('\x1b[31m', `${seedName} - found exists value`)
//           : dataSource
//             .getRepository(entityName)
//             .createQueryBuilder()
//             .insert()
//             .into(entityName)
//             .values(value)
//             .execute()
//             .then((e) => {
//               console.log('\x1b[32m', `${seedName} - successful`)
//             });
//       });
//   }
// }
//
// const newDoc = {
//   name: 'TestDoc',
// };
//
// const page = [
//   { name: '1.png', documentId: 1 },
//   { name: '2.png', documentId: 1 },
//   { name: '3.png', documentId: 1  },
//   { name: '4.png', documentId:  1 },
//   { name: '5.png', documentId: 1  }
// ]
//
// class CreatePageSeeds extends Seeds {
//   constructor() {
//     super(Page, page, Page.name);
//   }
// }
//
// class CreateDocSeeds extends Seeds {
//   constructor() {
//     super(Document, newDoc, Document.name);
//   }
// }
//
// dataSource.initialize().then(() => {
//   new CreateDocSeeds();
//   new CreatePageSeeds();
// })
