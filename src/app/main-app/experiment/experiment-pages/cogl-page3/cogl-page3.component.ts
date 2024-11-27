import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExperimentService } from 'src/app/services/experiment.service';
import { SessionsService } from 'src/app/services/sessions.service';

@Component({
  selector: 'app-cogl-page3',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="text-center mt-20">
      <h1 class="text-2xl text-black">Image Differences Finding Challange</h1>
      <p class="mt-4">In each row, there are 10 differences between the two pictures. Please have attention to every little detail and type the differences you find, every difference on a new line.</p>

      <div *ngFor="let row of rows; let i = index" class="mt-6">
        <p class="mb-4"><strong>{{ i + 1 }}: Which are the 10 differences between the pictures?</strong></p>
        <div class="grid grid-cols-2 gap-4">
          <div *ngFor="let picture of row; let j = index">
            <label [for]="'row' + i + 'image' + j">
              <img [src]="picture.src" alt="Image" class="mx-auto">
            </label>  
          </div>
        </div>
        <div class="flex w-full justify-center mt-4">
          <textarea class="p-3" rows="4" cols="80" placeholder="Your answer here..." (input)="updateResponseTextArea(i+1, $event)"></textarea>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CoglPage3Component {

  ///
  /// View Model
  ///

  protected rows: any[] = [
    [
      { src: 'assets/experiments/images/cogl3/img-diff1-1.png', selected: false },
      { src: 'assets/experiments/images/cogl3/img-diff1-2.png', selected: false },
    ],
    [
      { src: 'assets/experiments/images/cogl3/img-diff2-1.png', selected: false },
      { src: 'assets/experiments/images/cogl3/img-diff2-2.png', selected: false },
    ],
    [
      { src: 'assets/experiments/images/cogl3/img-diff3-1.png', selected: false },
      { src: 'assets/experiments/images/cogl3/img-diff3-2.png', selected: false },
    ],
    [
      { src: 'assets/experiments/images/cogl3/img-diff4-1.png', selected: false },
      { src: 'assets/experiments/images/cogl3/img-diff4-2.png', selected: false },
    ],
    [
      { src: 'assets/experiments/images/cogl3/img-diff5-1.png', selected: false },
      { src: 'assets/experiments/images/cogl3/img-diff5-2.png', selected: false },
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
      this.experimentService.saveExperimentResponse(this.sessionId, 'cogl3', questionId, response).subscribe({
        next: (response) => console.log(`Response for cogl3:${questionId} saved successfully: ${response}`),
        error: (err) => console.error(`Error saving response for cogl3:${questionId}:`, err)
      });
    });
  }

  ///
  /// UI Handlers
  ///

  protected updateResponseTextArea(questionId: number, event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    const response = target.value;
    this.responses['q' + questionId] = response;
  }

}
