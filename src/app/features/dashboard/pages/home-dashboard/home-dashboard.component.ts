import { Component } from '@angular/core';
import { NavigateComponent } from "../../components/navigate/navigate.component";
import { RealTimeCardComponent } from '../../../../shared/components/real-time-card/real-time-card.component';
import { GraphCardComponent } from '../../../../shared/components/graph-card/graph-card.component';

@Component({
  selector: 'app-home-dashboard',
  imports: [NavigateComponent, RealTimeCardComponent, GraphCardComponent],
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.css'
})
export class HomeDashboardComponent {

}
