import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionsComponent } from './components/sections/sections.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'sections'},
  {path: 'sections', component: SectionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
