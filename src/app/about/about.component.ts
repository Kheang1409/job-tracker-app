import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-about',
  imports: [CommonModule, BannerComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  isEmpty: boolean = true;
  title: string = "About Us";
  description: string = "Our platform is dedicated to empowering job seekers by providing them with a comprehensive suite of tools and resources designed to simplify and elevate their job search journey. From discovering the best opportunities to seamlessly applying for roles and efficiently tracking progress, we enable users to stay organized, motivated, and in control every step of the way. With features tailored to help users manage their career aspirations and make well-informed decisions, we strive to create an intuitive, user-friendly experience that instills confidence and helps transform job seekers into successful professionals.";
  currentYear: number = new Date().getFullYear();

  technologies = [
    {
      title: "Frontend",
      techName: "Angular"
    },
    {
      title: "Backend",
      techName: ".NET (C#)"
    },
    {
      title: "Database",
      techName: "MongoDB"
    },
    {
      title: "Messaging Queue",
      techName: "Kafka"
    },
    {
      title: "Containerization",
      techName: "Docker"
    },
    {
      title: "Authentication",
      techName: "JWT"
    },
    {
      title: "Notifications",
      techName: "Email Service"
    },
  ]
}
