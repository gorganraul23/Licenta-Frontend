import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cogl-page3',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="w-full flex justify-center flex-wrap flex-col items-center mt-4">
      <h1 class="text-2xl text-black">Patern Recognition. Try to remember every time the correct pattern</h1>
      <p class="mt-2 mb-6">Press Start Game and follow the intructions</p>
      <iframe style="border: none;" src="https://www.proprofsgames.com/html5_games.php?script_path=patternmemory_e/js/patternmemory_e.js?v=1" width="750px" height="600px"></iframe>
    </div>
  `,
  styles: []
})
export class CoglPage3Component {}
