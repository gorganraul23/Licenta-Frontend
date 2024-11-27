import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-timer',
  standalone: true,
  template: `
    <div class="text-lg font-bold">
      Timer: <span>{{ timerDisplay }}</span>
    </div>
  `,
  styles: []
})
export class TimerComponent implements OnInit {

  ///
  /// DI
  ///
  private readonly router = inject(Router);

  ///
  /// View Model
  ///
  private timeLeft: number = 0;
  protected timerDisplay: string = '00:00';
  private interval: any;
  private currentPage: string = 'relax1';

  @Output() timerComplete = new EventEmitter<void>();

  ///
  /// Lifecycle Events
  ///
  public ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const page = event.url.split('/').pop() || 'relax1';

        this.currentPage = page;
        this.loadTimerConfig();
        this.resetTimer();
      }
    });

    this.loadTimerConfig();
    this.startTimer();
  }

  ///
  /// UI Handlers
  ///
  private loadTimerConfig(): void {
    const timerConfig = JSON.parse(localStorage.getItem('timerConfig') || '{}');
   
    this.timeLeft = timerConfig[this.currentPage] || 180;
    this.updateDisplay();
  }

  private startTimer(): void {
    clearInterval(this.interval);
    
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.updateDisplay();
      } else {
        clearInterval(this.interval);
        this.timerComplete.emit();
      }
    }, 1000);
  }

  public resetTimer(): void {
    clearInterval(this.interval);

    this.loadTimerConfig();
    this.startTimer();
  }

  private updateDisplay(): void {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    this.timerDisplay = `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

}
