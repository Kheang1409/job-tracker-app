import { Component } from '@angular/core';
import { TopTechnologiesComponent } from '../top-technologies/top-technologies.component';
import { FooterComponent } from '../footer/footer.component';
import { RecentJobComponent } from '../recent-job/recent-job.component';
import { SiteStateComponent } from '../site-state/site-state.component';
import { BannerComponent } from '../banner/banner.component';


@Component({
  selector: 'app-home',
  imports: [BannerComponent, TopTechnologiesComponent, RecentJobComponent, SiteStateComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isEmpty: boolean = false;
}
