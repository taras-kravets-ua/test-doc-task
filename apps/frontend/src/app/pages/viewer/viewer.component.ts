import { AfterViewInit, Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { DocumentService } from "../../core/api/document.service";
import { Annotation, Document, ResultData } from "./interface/anotration.interface";
import { AnnotationService } from "../../core/services/annotation.service";

@Component({
  selector: 'test-doc-task-root',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements OnInit, AfterViewInit {
  baseUrl = `${environment.baseUrl}/document/page/`;
  documentId: number | null = null;
  document$!: Observable<Document>;
  contextmenuLeft = '';
  contextmenuTop = '';
  dragElem!: HTMLElement;
  isActiveCreate = false;

  @ViewChild('docum') documentContainer!: ElementRef<HTMLElement>;

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent): void {
    event.preventDefault();
    if (!this.isActiveCreate) {
      this.isActiveCreate = true;

      const onClick = (type: Annotation) => {
        this.createElement(type);
        actionButtons.remove();
      }

      const contextmenu = document.createElement('div');
      const page = this.findElementByAttribute('page', event);

      contextmenu.setAttribute(`draggable-div-element`, '');

      contextmenu.onmouseleave = () => {
        contextmenu.style.cursor = 'grab'
      }

      const btnClose = document.createElement('button');
      btnClose.classList.add('close');
      btnClose.onclick = () => {
        contextmenu.remove();
        this.isActiveCreate = false;
        this.annotationService.removeElement(+contextmenu.id.split('_')[1]);
      };

      contextmenu.classList.add('contextmenu');
      const actionButtons = document.createElement('div');
      const textButton = document.createElement('button');
      textButton.onclick = () => onClick('text');
      textButton.textContent = 'Text';
      const imgButton = document.createElement('button');
      imgButton.onclick = () => onClick('img');
      imgButton.textContent = 'Img';

      actionButtons.appendChild(textButton);
      actionButtons.appendChild(imgButton);
      contextmenu.appendChild(actionButtons);
      contextmenu.appendChild(btnClose);

      this.contextmenuTop = event.offsetY + 'px';
      this.contextmenuLeft = event.offsetX + 'px';

      contextmenu.style.left = this.contextmenuLeft;
      contextmenu.style.top = this.contextmenuTop;
      this.annotationService.addElement({ page: page.id, coords: {x: event.offsetX, y: event.offsetY  } });


      contextmenu.id = `annotation-${this.annotationService.getLastIndex}`;
      document.getElementById(page.id)?.appendChild(contextmenu);
    }
  }

  constructor(
    private router: ActivatedRoute,
    private documentService: DocumentService,
    private annotationService: AnnotationService,
  ) {
  }

  ngAfterViewInit(): void {
    const moseMove = ({ movementX, movementY }: MouseEvent) => {
      if (this.dragElem) {
        const el = document.querySelector(`#${this.dragElem.id}`) as HTMLElement;
        el.style.top = el.offsetTop + movementY + 'px';
        el.style.left = el.offsetLeft + movementX + 'px';
      }
    }
    this.documentContainer.nativeElement.addEventListener('mousedown', (ev) => {
      this.dragElem = this.findElementByAttribute('draggable-div-element', ev);
      this.documentContainer.nativeElement.addEventListener('mousemove', moseMove)
    })

    this.documentContainer.nativeElement.addEventListener('mouseup', () => {
      this.documentContainer.nativeElement.removeEventListener('mousemove', moseMove);
    });

  }

  ngOnInit(): void {
    this.documentId = this.router.snapshot.params['id'];
    if (this.documentId) {
      this.document$ = this.documentService.getOne(this.documentId);
    }
  }

  createElement(type: Annotation): HTMLElement {
    this.isActiveCreate = false;

    const newAnnotation = document.createElement('div');
    newAnnotation.classList.add('annotation');

    if (type === 'text') {
      const input = document.createElement('input')
      input.classList.add('input-text');
      input.type = 'text'
      newAnnotation.appendChild(input);
      input.addEventListener('input', () => {
        this.annotationService.updateElement({ type: type, content: input.value }, this.annotationService.getLastIndex)
      })
    }

    if (type === 'img') {
      const selectFile = document.createElement('input')
      selectFile.type = 'file';

      selectFile.onchange = (e) => {
        const img = document.createElement('img');
        img.classList.add('annotation-img');
        const file = (e.target as unknown as { files: File[] }).files[0];
        img.src = window.URL.createObjectURL(file);
        newAnnotation.removeChild(selectFile);
        newAnnotation.appendChild(img);
       this.annotationService.updateElement({ type: type, content: img.src }, this.annotationService.getLastIndex)
      }


      selectFile.classList.add('img-btn');
      newAnnotation.appendChild(selectFile);
    }
    document.querySelector(`#annotation-${this.annotationService.getLastIndex}`)?.appendChild(newAnnotation);
    return newAnnotation;
  }

  private findElementByAttribute(name: string, ev: MouseEvent): HTMLElement {
   return document.elementsFromPoint(ev.clientX, ev.clientY)
      .find(el => el.attributes.getNamedItem(name)) as HTMLElement;
  }
}
