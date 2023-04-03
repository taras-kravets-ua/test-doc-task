import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { HttpClientModule } from "@angular/common/http";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { ViewerComponent } from "./pages/viewer/viewer.component";

@NgModule({
  declarations: [AppComponent, ViewerComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    PdfViewerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
