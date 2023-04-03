export type Annotation = 'text' | 'img';

export type ResultData = { page: string | number, coords: { x: number, y: number }, type: Annotation, content: string };

export interface Document {
  id: number;
  name: string;
  pages: Page[];
}

export interface Page {
  name: string;
}
