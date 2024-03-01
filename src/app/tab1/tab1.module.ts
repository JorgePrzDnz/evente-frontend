import { IonicModule} from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { Tab1PageRoutingModule } from './tab1-routing.module';
import { EventComponent } from '../tab1/event/event.component';
import { AllEventsByCategoryComponent } from './all-events-by-category/all-events-by-category.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [Tab1Page, EventComponent, AllEventsByCategoryComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class Tab1PageModule {}
