import { Component } from '@angular/core';
import { TopTechnologiesComponent } from '../top-technologies/top-technologies.component';
import { JobsComponent } from '../jobs/jobs.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-home',
  imports: [TopTechnologiesComponent, JobsComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
