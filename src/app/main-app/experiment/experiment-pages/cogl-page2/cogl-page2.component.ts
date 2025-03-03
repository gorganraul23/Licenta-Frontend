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
    <div class="text-center mt-4">
      <h1 class="text-2xl text-black">Image Selection Challenge</h1>
      <p class="mt-4">In each row, select the correct option based on the given question. The responses will be automatically submitted when the time is gone.</p>

      <div *ngFor="let row of actualRows; let i = index" class="mt-6">
        <p><strong>{{ i + 1 }}: Which is the AI generated object?</strong></p>
        <div class="grid grid-cols-2 gap-4">
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
  /// DI
  ///

  private readonly sessionService = inject(SessionsService);
  private readonly experimentService = inject(ExperimentService);

  ///
  /// View Model
  ///

  private responses: Record<string, string> = {};
  private sessionId = '';
  protected actualRows: any[] = [];

  ///
  /// Lifecycle Events
  ///

  public ngOnInit(): void {
    this.sessionService.getSessionRunning().subscribe((response) => {
      this.sessionId = response.id;
    })
    const randomNumber = Math.random() < 0.5 ? 1 : 2;
    if(randomNumber == 1){
      this.actualRows = this.rows;
    } else {
      this.actualRows = this.rows2;
    }
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
        answerLetter = 'b';
        break;
      default:
        answerLetter = 'a';
        break;
    }
    this.responses['q' + questionId] = answerLetter;
  }

  /// data

  protected rows: any[] = [
    [
      { src: 'assets/experiments/images/cogl2/q1i1-r.jpg', selected: false }, //1
      { src: 'assets/experiments/images/cogl2/q1i2.jpg', selected: false },
    ],
    [
      { src: 'assets/experiments/images/cogl2/q2i1.jpg', selected: false }, //2
      { src: 'assets/experiments/images/cogl2/q2i2-r.png', selected: false },
    ],
    [
      { src: 'assets/experiments/images/cogl2/q3i1-r.jpg', selected: false }, //3
      { src: 'assets/experiments/images/cogl2/q3i2.jpg', selected: false },
    ],
    [
      { src: 'assets/experiments/images/cogl2/q4i1.jpg', selected: false }, //4
      { src: 'assets/experiments/images/cogl2/q4i2-r.jpg', selected: false },
    ],
    [
      { src: 'assets/experiments/images/cogl2/q5i1-r.jpg', selected: false }, //5
      { src: 'assets/experiments/images/cogl2/q5i2.jpg', selected: false },
    ],
    [
      { src: 'assets/experiments/images/cogl2/q6i1-r.jpg', selected: false }, //6
      { src: 'assets/experiments/images/cogl2/q6i2.jpg', selected: false },
    ],
    [
      { src: 'assets/experiments/images/cogl2/q7i1.jpg', selected: false }, //7
      { src: 'assets/experiments/images/cogl2/q7i2-r.jpg', selected: false },
    ],
    [
      { src: 'assets/experiments/images/cogl2/q8i1.jpg', selected: false }, //8
      { src: 'assets/experiments/images/cogl2/q8i2-r.jpg', selected: false },
    ],
    [
      { src: 'assets/experiments/images/cogl2/q9i1-r.jpg', selected: false }, //9
      { src: 'assets/experiments/images/cogl2/q9i2.jpg', selected: false },
    ],
    [
      { src: 'assets/experiments/images/cogl2/q10i1-r.jpg', selected: false },  //10
      { src: 'assets/experiments/images/cogl2/q10i2.jpg', selected: false },
    ],
  ]; ///https://britannicaeducation.com/blog/quiz-real-or-ai/

  protected rows2: any[] = [
    [
      { src: 'assets/experiments/images/cogl2-2/q1a.jpg', selected: false }, //1
      { src: 'assets/experiments/images/cogl2-2/q1b.jpg', selected: false },
    ],
    [
      { src: 'assets/experiments/images/cogl2-2/q2a.jpg', selected: false }, //2
      { src: 'assets/experiments/images/cogl2-2/q2b.jpg', selected: false },
    ],
    [
      { src: 'assets/experiments/images/cogl2-2/q3a.jpg', selected: false }, //3
      { src: 'assets/experiments/images/cogl2-2/q3b.jpg', selected: false },
    ],
    [
      { src: 'assets/experiments/images/cogl2-2/q4a.jpg', selected: false }, //4
      { src: 'assets/experiments/images/cogl2-2/q4b.jpg', selected: false },
    ],
    [
      { src: 'assets/experiments/images/cogl2-2/q5a.jpg', selected: false }, //5
      { src: 'assets/experiments/images/cogl2-2/q5b.jpg', selected: false },
    ],
    [
      { src: 'assets/experiments/images/cogl2-2/q6a.jpg', selected: false }, //6
      { src: 'assets/experiments/images/cogl2-2/q6b.jpg', selected: false },
    ],
    [
      { src: 'assets/experiments/images/cogl2-2/q7a.jpg', selected: false }, //7
      { src: 'assets/experiments/images/cogl2-2/q7b.jpg', selected: false },
    ],
    [
      { src: 'assets/experiments/images/cogl2-2/q8a.jpg', selected: false }, //8
      { src: 'assets/experiments/images/cogl2-2/q8b.jpg', selected: false },
    ],
    [
      { src: 'assets/experiments/images/cogl2-2/q9a.jpg', selected: false }, //9
      { src: 'assets/experiments/images/cogl2-2/q9b.jpg', selected: false },
    ],
    [
      { src: 'assets/experiments/images/cogl2-2/q10a.jpg', selected: false },  //10
      { src: 'assets/experiments/images/cogl2-2/q10b.jpg', selected: false },
    ],
  ]; //https://www.buzzfeed.com/kowalj/ai-image-test-quiz

}
