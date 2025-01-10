import { Component, OnInit } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-contact-us',
  imports: [CommonModule, BannerComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent implements OnInit {

  contact = environment.contact;

  isEmpty: boolean = true;
  title: string = "Contact US";
  description: string = "Have any questions? We’re here to help! You can get in touch with us through the form below or by using our contact details."

  constructor() { }

  ngOnInit(): void {

  }

  onSubmit() {

  }
}
