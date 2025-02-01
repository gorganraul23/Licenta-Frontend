import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { SessionsService } from 'src/app/services/sessions.service';
import { ToastService } from '../toast/toast.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';;
import { ConfirmDialogComponent } from '../shared/confirm-dialog.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-experiment-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="text-center mt-16">
      <div class="h-full">
        <p class="text-3xl text-black">
          Hello, welcome to the Cognitive Load experiment!
        </p>
        <img src="assets/experiments/images/cogl.png" alt="Cognitive App Image" class="mt-6 max-w-2xl mx-auto rounded shadow-lg">
        <button
          (click)="startExperiment()"
          class="mt-8 py-2 px-6 bg-blue-700 text-white rounded-lg shadow-lg hover:bg-blue-800 transition-colors"
        >
          Start the experiment
        </button>
      </div>
      
      <div class="mt-10 mb-5">
        <p class="text-2xl">Configurations</p>
        <div *ngFor="let page of pages; let i = index" class="mt-4">
          <label class="text-xl" for="timer-{{ i }}">Timer for {{ page }} (seconds):</label>
          <input
            type="number"
            id="timer-{{ i }}"
            [(ngModel)]="timerConfig[page]"
            class="ml-2 px-2 py-1 border rounded text-xl cursor-default"
            min="10"
            max="180"
            [readonly]="!this.authService.isAdmin"
          />
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ExperimentHomeComponent {

  ///
  /// DI
  ///

  private readonly router = inject(Router);
  private readonly sessionService = inject(SessionsService);
  private readonly toast = inject(ToastService);
  private readonly dialog = inject(MatDialog);
  protected readonly authService = inject(LoginService);
  
  constructor() {
    this.pages.forEach((page) => {
      this.timerConfig[page] = 180;
    });
  }

  ///
  /// View Model
  ///

  protected pages: string[] = ['relax1', 'cogl1', 'relax2', 'cogl2', 'relax3', 'cogl3', 'relax4'];
  protected timerConfig: Record<string, number> = {};

  /// 
  /// UI Handlers
  ///

  protected startExperiment(): void {
    try{
      if(this.timerConfig['relax1'] < 1 || this.timerConfig['cogl1'] < 1 || this.timerConfig['relax2'] < 1 || this.timerConfig['cogl2'] < 1 || this.timerConfig['relax3'] < 1 || this.timerConfig['cogl3'] < 1 || this.timerConfig['relax4'] < 1) {
        this.toast.showToast('Wrong configurations', 'info');
        return;
      }
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        titleText: 'Start Experiment',
        contentText: 'Are you sure you want to start the experiment?',
        confirmButtonText: 'Start'
      };
      const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig)
      dialogRef.afterClosed().subscribe(status => {
        if (status)
          this.goToExperimentPage();
      });
    }
    catch {
      this.toast.showToast('Something went wrong', 'info');
    }
  }

  private goToExperimentPage(): void {
    this.sessionService.getSessionRunning().subscribe({
      next: (response) => {
        localStorage.setItem('timerConfig', JSON.stringify(this.timerConfig));
        this.toast.showToast('Experiment started!', 'info')
        this.router.navigate(['experiment']);
      },
      error: (error) => {
        this.toast.showToast('No active session!', 'error');
      }
    })
  }
  
}
