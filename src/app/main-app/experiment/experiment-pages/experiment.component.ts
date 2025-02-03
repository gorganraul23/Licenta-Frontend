import { Component, inject, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TimerComponent } from 'src/app/main-app/timer/timer.component';
import { ToastService } from '../../toast/toast.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';
import { ExperimentService } from 'src/app/services/experiment.service';

@Component({
  selector: 'app-experiment',
  standalone: true,
  imports: [RouterOutlet, TimerComponent],
  template: `
    <div class="p-5 min-h-[91%]"> 
      <div class="sticky top-0 right-[80%] bg-white p-1 pl-4 shadow-md">
        <app-timer #timer (timerComplete)="onTimerComplete()"></app-timer>
      </div>
      <div class="pt-4">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: []
})
export class ExperimentComponent {

  ///
  /// DI
  ///

  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly dialog = inject(MatDialog);
  private readonly experimentService = inject(ExperimentService);

  ///
  /// View Model
  ///

  protected pages: string[] = ['relax1', 'cogl1', 'relax2', 'cogl2', 'relax3', 'cogl3', 'relax4'];
  protected currentPageIndex: number = 0; 

  @ViewChild('timer') timerComponent!: TimerComponent;

  ///
  /// Lifecycle Events
  ///

  public ngOnInit(): void {
    this.router.navigate(['experiment/' + this.pages[this.currentPageIndex]]);
    this.experimentService.saveExperimentStartTime().subscribe({
      next: (_) => {},
      error: (err) => console.error(err)
    });
  }

  ///
  /// UI Handlers
  ///
  
  public onTimerComplete(): void {
    this.currentPageIndex++;
    if (this.currentPageIndex < this.pages.length) {
      this.router.navigate(['experiment/' + this.pages[this.currentPageIndex]]);
      this.timerComponent.resetTimer();
    } else {
      this.toast.showToast('Experiment completed!', 'info')
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        titleText: 'Congratulations! Experiment ended',
        contentText: 'Continue with playing the puzzle?',
        confirmButtonText: 'Continue'
      };
      const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig)
      dialogRef.afterClosed().subscribe(status => {
        if (!status)
          this.router.navigate(['experiment-home']);
      });
    }
  }

}
