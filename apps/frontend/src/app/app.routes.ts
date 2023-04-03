import { Route, RouterModule } from '@angular/router';
import { ViewerComponent } from "./pages/viewer/viewer.component";
import { NgModule } from "@angular/core";

export const appRoutes: Route[] = [
    { path: 'viewer/view/:id', component: ViewerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
