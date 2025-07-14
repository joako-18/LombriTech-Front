import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-real-time-card',
  templateUrl: './real-time-card.component.html',
  styleUrls: ['./real-time-card.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class RealTimeCardComponent {
  @Input() title: string = '';
  @Input() value: number | string = '';
  @Input() unit: string = '';
  @Input() color: string = '#ccc';
  @Input() icon: string = '';
}
