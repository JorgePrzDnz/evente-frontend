import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { EventComponent } from '../tab1/event/event.component';
import { AllEventsByCategoryComponent } from '../tab1/all-events-by-category/all-events-by-category.component';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'allEvents/:id',
    component: AllEventsByCategoryComponent
  },
  {
    path: ':id',
    component: EventComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
