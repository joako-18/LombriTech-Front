import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { CarouselContainerComponent } from '../../components/carousel-container/carousel-container.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
@Component({
  selector: 'app-projectpage',
  imports: [CommonModule, RouterModule, HeaderComponent, CarouselContainerComponent, FooterComponent],
  templateUrl: './projectpage.component.html',
  styleUrl: './projectpage.component.css'
})
export class ProjectpageComponent {

}
