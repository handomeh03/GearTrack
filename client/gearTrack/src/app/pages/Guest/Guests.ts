import { Component } from '@angular/core';
import { Header } from './Header';
import { PhotoShot } from './Photoshotreversation';

@Component({
  selector: 'Guest-comp',
  standalone: true,
  template: `
    
    <div class="m-5">
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold  text-center mb-6 leading-tight">
        Take the <span class="text-[#4eda2c]">Photoshot Reservation</span> and go with
        <span class="text-[#4eda2c] text-6xl">Truted</span>
      </h2>
    </div>

    <div >
      <PhotoShot-comp />
    </div>
  `,
  imports: [PhotoShot],
})
export class Guest {}
