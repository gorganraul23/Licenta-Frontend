import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExperimentService } from 'src/app/services/experiment.service';
import { SessionsService } from 'src/app/services/sessions.service';

@Component({
  selector: 'app-cogl-page2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="text-center mt-20">
      <h1 class="text-2xl text-black">Image Selection Challenge</h1>
      <p class="mt-4">In each row, select the correct option based on the given question. The responses will be automatically submitted when the time is gone.</p>

      <div *ngFor="let row of rows; let i = index" class="mt-6">
        <p><strong>{{ i + 1 }}: Which is the AI generated object?</strong></p>
        <div class="grid grid-cols-4 gap-4">
          <div *ngFor="let picture of row; let j = index">
            <input type="checkbox" [(ngModel)]="picture.selected" [id]="'row' + i + 'image' + j" (change)="updateResponse(i+1, j+1)">
            <label [for]="'row' + i + 'image' + j"> 
              <img [src]="picture.src" alt="Image" class="mx-auto">
            </label>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CoglPage2Component implements OnInit, OnDestroy {

  ///
  /// View Model
  ///

  protected rows: any[] = [
    [
      { src: 'assets/experiments/images/cogl2/img1.png', selected: false },
      { src: 'assets/experiments/images/cogl2/img2.png', selected: false },
      { src: 'assets/experiments/images/cogl2/img3.png', selected: false },
      { src: 'assets/experiments/images/cogl2/img4.png', selected: false },
    ],
    [
      { src: 'assets/experiments/images/cogl2/img5.png', selected: false },
      { src: 'assets/experiments/images/cogl2/img6.png', selected: false },
      { src: 'assets/experiments/images/cogl2/img7.png', selected: false },
      { src: 'assets/experiments/images/cogl2/img8.png', selected: false },
    ],
    [
      { src: 'assets/experiments/images/cogl2/img9.png', selected: false },
      { src: 'assets/experiments/images/cogl2/img10.png', selected: false },
      { src: 'assets/experiments/images/cogl2/img11.png', selected: false },
      { src: 'assets/experiments/images/cogl2/img12.png', selected: false },
    ],
    [
      { src: 'assets/experiments/images/cogl2/img13.png', selected: false },
      { src: 'assets/experiments/images/cogl2/img14.png', selected: false },
      { src: 'assets/experiments/images/cogl2/img15.png', selected: false },
      { src: 'assets/experiments/images/cogl2/img16.png', selected: false },
    ],
    [
      
      { src: 'assets/experiments/images/cogl2/img17.png', selected: false },
      { src: 'assets/experiments/images/cogl2/img18.png', selected: false },
      { src: 'assets/experiments/images/cogl2/img19.png', selected: false },
      { src: 'assets/experiments/images/cogl2/img20.png', selected: false },
    ]
  ];

  private responses: Record<string, string> = {};
  private sessionId = '';

  private readonly sessionService = inject(SessionsService);
  private readonly experimentService = inject(ExperimentService);

  ///
  /// Lifecycle Events
  ///

  public ngOnInit(): void {
    this.sessionService.getSessionRunning().subscribe((response) => {
      this.sessionId = response.id;
    })
  }

  public ngOnDestroy(): void {
    Object.entries(this.responses).forEach(([questionId, response]) => {
      this.experimentService.saveExperimentResponse(this.sessionId, 'cogl2', questionId, response).subscribe({
        next: (response) => console.log(`Response for cogl2:${questionId} saved successfully: ${response}`),
        error: (err) => console.error(`Error saving response for cogl2:${questionId}:`, err)
      });
    });
  }

  ///
  /// UI Handlers
  ///

  protected updateResponse(questionId: number, answer: number) {
    let answerLetter = '';
    switch(answer){
      case 1:
        answerLetter = 'a';
        break;
      case 2:
        answerLetter = 'b'
        break;
      case 3:
        answerLetter = 'c'
        break;
      default:
        answerLetter = 'd'
        break;
    }
    this.responses['q' + questionId] = answerLetter;
  }

}
