import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelAgentPanelComponent } from './travel-agent-panel.component';

const routes: Routes = [
  {
    path:'', component: TravelAgentPanelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelAgentPanelRoutingModule { }
