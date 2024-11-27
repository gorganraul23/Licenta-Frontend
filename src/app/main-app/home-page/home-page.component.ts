import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import {WebsocketService} from "../../services/websocket.service";

@Component({
  selector: 'app-home-page',
  template: `
    <div class="content-wrapper">
      <div class="temp-container">
        <div class="content-container mat-elevation-z4 !m-0 !min-w-[100vh]">
          <div class="container">
            <p class="top">Real time data</p>
            <hr>
            <canvas baseChart class="chart"
                [data]="lineChartData"
                [options]="lineChartOptions"
                [type]="lineChartType">
            </canvas>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      height: 91%;
    }

    .chart {
      max-height: 75%;
      max-width: 99%;
      display: inline;
      margin-top: 3%;
    }

    .top {
      color: black;
      font-weight: 900;
      font-size: 2rem;
      text-align: center;
      padding-top: 3%;
      padding-bottom: 3%;
    }

    hr {
      border: 1px solid gray;
      border-radius: 3px;
      width: 100%;
    }
  `]
})
export class HomePageComponent implements OnInit {

  ///
  /// DI
  ///

  private readonly websocket = inject(WebsocketService);

  ///
  /// View Model
  ///

  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  ///
  /// Lifecycle Events
  ///

  public ngOnInit(): void {
    this.websocket.connect().subscribe(
      (event) => {
        console.log('WebSocket event:', event);
        if (event.type == 'message') {
          const data = event.data;
          this.updateChart(data.hr, data.hrv);
        }
      },
      (error) => {
        console.error('WebSocket error:', error);
      }
    );

  }

  protected updateChart(hr: number, hrv: number) {

    if (this.lineChartData.datasets[0].data.length == 120) {
      this.lineChartData.datasets[0].data.shift();
      this.lineChartData.datasets[0].data.push(hr);
      this.lineChartData.datasets[1].data.shift();
      this.lineChartData.datasets[1].data.push(hrv);
    } else {
      this.lineChartData.datasets[0].data.push(hr);
      this.lineChartData.datasets[1].data.push(hrv);
    }

    this.chart?.update();
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'HR',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'HRV',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
    ],
    labels: this.generateLabels(120)
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {line: {tension: 1}},
    scales: {
      y: {title: {display: true, text: 'value'}},
      x: {title: {display: true, text: 'time (s)'}}
    },

    plugins: {legend: {display: true},}
  };

  protected generateLabels(length: number): number[] {
    let labels: number[] = [];
    for (let i = 1; i <= length; i++)
      labels.push(i);
    return labels;
  }

  public ngOnDestroy(): void {
    this.websocket.close();
  }

}
