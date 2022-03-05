import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelAgentPanelRoutingModule } from './travel-agent-panel-routing.module';
import { TravelAgentPanelComponent } from './travel-agent-panel.component';
import { CoreModule } from '../core/core.module';
import { ShareModule } from '../share/share.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    TravelAgentPanelComponent
  ],
  imports: [
    CommonModule,
    TravelAgentPanelRoutingModule,
    CoreModule,
    ShareModule,
    DataTablesModule
  ]
})
export class TravelAgentPanelModule { }
