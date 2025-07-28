import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sensor-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sensor-alert.component.html',
  styleUrls: ['./sensor-alert.component.css']
})
export class SensorAlertComponent implements OnInit, OnChanges {
  @Input() sensorName: string = '';
  @Input() alertDescription: string = '';
  @Input() wormImage: string = 'https://placehold.co/100x100/cccccc/ffffff?text=Worm';
  @Input() showAlert: boolean = false;

  private sensorColors: { [key: string]: string } = {
    'humedad': '#4682A9',
    'conductividad': '#d79e39',
    'temperatura': '#e1533c',
    'ph': '#217c61',
    'turbidez': '#B949B9'
  };

  bgColor: string = '#4682A9';

  ngOnInit(): void {
    this.updateBackgroundColor();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sensorName']) { 
      this.updateBackgroundColor();
      console.log('[SensorAlertComponent] Mostrando alerta para:', this.sensorName, '| Mensaje:', this.alertDescription);
  }
}

  private updateBackgroundColor(): void {
    const lowerCaseSensorName = this.sensorName.toLowerCase();
    this.bgColor = this.sensorColors[lowerCaseSensorName] || '#4682A9';
  }
}