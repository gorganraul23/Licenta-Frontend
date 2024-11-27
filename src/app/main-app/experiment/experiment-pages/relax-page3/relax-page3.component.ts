import { Component } from '@angular/core';

@Component({
  selector: 'app-relax-page3',
  standalone: true,
  template: `
    <div class="w-full flex justify-center flex-wrap flex-col items-center">
      <p class="text-xl">Now, enjoy a relaxing cascade video</p>
      <video class="mt-6 max-w-7xl mx-auto rounded shadow-lg" controls autoplay>
        <source src="assets/experiments/videos/relax3.mp4" type="video/mp4">
          Your browser does not support the video tag.
      </video>
    </div>
  `,
  styles: []
})
export class RelaxPage3Component {

}
