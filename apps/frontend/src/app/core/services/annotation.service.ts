import { Injectable } from "@angular/core";
import { ResultData } from "../../pages/viewer/interface/anotration.interface";

@Injectable({ providedIn: "root" })
export class AnnotationService {
  private elements: Partial<ResultData>[] = [];

  showResult(): void {
    console.log(this.elements);
  }

  addElement(data: Partial<ResultData>): void {
      this.elements.push(data);
  }

  updateElement(data: Partial<ResultData>, id: number): void {
    this.elements[id] = { ...this.elements[id], ...data }
  }

  removeElement(id: number): void {
    this.elements.splice(id, 1);
  }

  get getLastIndex(): number {
   return this.elements.length - 1;
  }
}
