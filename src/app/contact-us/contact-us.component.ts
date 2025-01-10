import { Component, OnInit } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  imports: [CommonModule, BannerComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent implements OnInit {
  isEmpty: boolean = true;
  title: string = "Contact US";
  description: string = "Have any questions? We’re here to help! You can get in touch with us through the form below or by using our contact details."

  constructor() { }

  ngOnInit(): void {

  }

  onSubmit() {

  }
}
