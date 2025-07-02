import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  technologies = [
    {
      title: "Frontend",
      techList: ["Angular CLI", "Tailwind CSS"]
    },
    {
      title: "Backend",
      techList: ["C#", ".NET", "API", "DDD", "Microservices"]
    },
    {
      title: "Database",
      techList: ["MongoDB"]
    },
    {
      title: "Messaging Queue",
      techList: ["Kafka"]
    },
    {
      title: "Containerization",
      techList: ["Docker"]
    },
    {
      title: "Authentication",
      techList: ["JWT"]
    },
    {
      title: "Notification",
      techList: ["SMTP"]
    }
  ];
  
}