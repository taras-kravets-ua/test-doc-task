import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { AnnotationService } from "./core/services/annotation.service";

enum ZOOM {
  MAX = 200,
  MIN = 25,
  DEFAULT = 100,
  SET = 25,
}

@Component({
  selector: 'test-doc-task-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  zoom = ZOOM.DEFAULT;
  doc!: HTMLElement & { style: { zoom: string } };

  constructor(@Inject(DOCUMENT) private document: Document,
              public annotation: AnnotationService) {
    queueMicrotask(() => {
      this.doc = document.querySelector('.document-container') as HTMLElement & { style: { zoom: string } };
    })
  }

  zoomPlus(): void {
    this.zoom = this.zoom === ZOOM.MAX ? this.zoom : this.zoom + ZOOM.SET;
    this.doc.style.zoom = `${ this.zoom }%`;
  }

  zoomMinus(): void {
    this.zoom = this.zoom === ZOOM.MIN ? this.zoom : this.zoom - ZOOM.SET;
    this.doc.style.zoom = `${ this.zoom }%`;
  }
}
