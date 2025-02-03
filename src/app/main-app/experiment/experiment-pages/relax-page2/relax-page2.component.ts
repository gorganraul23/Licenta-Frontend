import { Component } from '@angular/core';

@Component({
  selector: 'app-relax-page2',
  standalone: true,
  template: `
    <div class="w-full flex justify-center flex-wrap flex-col items-center">
      <p class="text-xl">I invite you to enjoy a very peaceful activity: mandala rock painting!</p>
      <video class="mb-6 mt-4 max-w-7xl mx-auto rounded shadow-lg" controls autoplay>
        <source src="assets/experiments/videos/relax2.mp4" type="video/mp4">
          Your browser does not support the video tag.
      </video>
      <p class="text-xl">Tip: Try not to move your hand too much.</p>
    </div>
  `,
  styles: []
})
export class RelaxPage2Component {

}
