import { Component } from '@angular/core';
import { TopTechnologiesComponent } from '../top-technologies/top-technologies.component';
import { JobsComponent } from '../jobs/jobs.component';

@Component({
  selector: 'app-home',
  imports: [TopTechnologiesComponent, JobsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
