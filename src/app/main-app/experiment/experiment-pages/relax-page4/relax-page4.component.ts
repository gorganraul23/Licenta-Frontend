import { Component } from '@angular/core';

@Component({
  selector: 'app-relax-page4',
  standalone: true,
  template: `
    <div class="w-full flex justify-center flex-wrap flex-col items-center mt-4">
      <p class="text-xl mb-6">Let's make a puzzle! Just chill and have fun! Press Restart if needed.</p>
      <iframe src="https://www.jigsawplanet.com/?rc=play&amp;pid=14906a6c236c&amp;view=iframe" style="width:100%;height:600px" frameborder="0" allowfullscreen></iframe>
      <!-- <iframe src="https://www.jigsawplanet.com/?rc=play&amp;pid=0338a27c1a48&amp;view=iframe" style="width:100%;height:600px" frameborder="0" allowfullscreen></iframe> -->
    </div>
  `,
  styles: []
})
export class RelaxPage4Component {

}
