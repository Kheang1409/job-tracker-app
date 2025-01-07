import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-technologies',
  imports: [],
  templateUrl: './top-technologies.component.html',
  styleUrl: './top-technologies.component.css'
})
export class TopTechnologiesComponent implements OnInit {

  ngOnInit(): void {
    this.animation()
  }

  animation() {
    document.addEventListener('DOMContentLoaded', () => {
      const images = document.querySelectorAll('#technologies img') as NodeListOf<HTMLImageElement>;

      images.forEach((image) => {
        image.addEventListener('mouseenter', () => {
          images.forEach((otherImage) => {
            if (otherImage !== image) {
              otherImage.style.opacity = '0.2';
              otherImage.style.transform = 'scale(0.6)'
            }
          });
          image.style.opacity = '1';
          image.style.transform = 'scale(1.8)'; // Make hovered image bigger
        });

        image.addEventListener('mouseleave', () => {
          images.forEach((otherImage) => {
            otherImage.style.transform = 'scale(1)'; // Reset all images to normal size
            otherImage.style.opacity = '1';
            otherImage.style.transitionDelay = '0s';
          });
        });
      });
    });
  }
}
