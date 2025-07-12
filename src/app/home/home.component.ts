import { Component } from '@angular/core';
// import { BannerComponent } from '../banner/banner.component';
import { SatsComponent } from '../stats/stats.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-home',
  imports: [SatsComponent, FooterComponent/*, BannerComponent*/],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
}
