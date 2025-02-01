import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SensorData, Session, SessionsService} from "../../../services/sessions.service";
import {ChartConfiguration, ChartType} from "chart.js/dist/types";
import {BaseChartDirective} from "ng2-charts";
import {DatePipe, DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-session-statistics',
  template: `
    <div class="row">
      <div class="column left">
        <div class="data">
          <h1 class="title">SESSION #{{session.id}}</h1>
          <div>
            <p class="label">Start time:</p>
            <p class="label-value">{{formatDate(session.start_time!!)}}</p>
            <p class="label">End time:</p>
            <p class="label-value">{{formatDate(session.end_time!!)}}</p>
          </div>
          <p class="label">Baseline HRV:</p>
          <p class="label-value">{{formatReference(session.reference)}}</p>
          <button mat-button class="back-btn" (click)="onClickBack()">
            Back
          </button>
        </div>
      </div>
      <div class="column right">
        <canvas baseChart class="chart"
            [data]="lineChartData"
            [options]="lineChartOptions"
            [type]="lineChartType">
        </canvas>
      </div>
    </div>
  `,
  styles: [`
    body{
      box-sizing: border-box;
    }
    .column {
      float: left;
      padding: 10px;
    }

    .left {
      width: calc(25vw - 5px);
      min-height: 91vh;
      background-color: #cccccc;
    }

    .right {
      width: calc(75vw - 5px);
      min-height: 91vh;
      background-color: rgba(228,228,228,0.35)
    }

    .row:after {
      content: "";
      display: table;
      clear: both;
    }

    canvas{
      margin-top: 5%;
    }

    .label, .label-value, .title{
      font-size: 1.5rem;
      font-weight: normal;
      padding-top: 10%;
      font-family: "Calibri", sans-serif;
    }

    .label{
      font-weight: 800;
    }

    .label-value{
      padding-top: 0;
    }

    .title{
      font-size: 1.8rem;
      font-weight: bold;
    }

    .data{
      padding: 7%;
    }

    .back-btn {
      width: 35%;
      background-color: #0051CB;
      border-radius: 10px;
      font-size: 15px;
      font-family: "Helvetica", sans-serif;
      color: white;
      padding: 10px 20px;
      border: none;
      margin-top: 5%;
      margin-bottom: 5%;
      align-self: center;
    }

    .back-btn:hover {
      background-color: #130888;
    }
  `]
})
export class SessionStatisticsComponent implements OnInit {

  ///
  /// DI
  ///
  
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(SessionsService);
  private readonly datePipe = inject(DatePipe);
  private readonly decimalPipe = inject(DecimalPipe);
  private readonly router = inject(Router);

  ///
  /// View Model
  ///

  protected session: Session = {start_time: null, end_time: null, id: '', reference: 0}
  protected sensorData: SensorData[] = []
  
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  ///
  /// Lifecycle Events
  ///

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      const sessionId = params['id'];
      this.service.getSessionById(sessionId).subscribe(res => {
        this.session = res;
        this.service.getDataBySession(sessionId).subscribe(res => {
          this.sensorData = res;
          if (res.length <= 120) {
            this.lineChartData.datasets[0].data = res.map((data) => data.hrv);
            this.lineChartData.datasets[1].data = Array(res.length).fill(this.session.reference);
          } else {
            this.lineChartData.datasets[0].data = res.map((data) => data.hrv).slice(res.length - 120, res.length);
            this.lineChartData.datasets[1].data = Array(120).fill(this.session.reference);
          }
          this.chart?.update();
        })
      })
    });
  }

  ///
  /// UI Handlers
  ///

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
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
      {
        data: [],
        label: 'HRV reference',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: '#0051CB',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: this.generateLabels(120)
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {line: {tension: 1}},
    scales: {
      y: {title: {display: true, text: 'HRV value'}},
      x: {title: {display: true, text: 'values'}}
    },

    plugins: {legend: {display: true},}
  };

  protected generateLabels(length: number): number[] {
    let labels: number[] = [];
    for (let i = 1; i <= length; i++)
      labels.push(i);
    return labels;
  }

  protected formatDate(date: Date): string {
    const formattedDate = this.datePipe.transform(date, 'dd-MM-yyyy hh:mm:ss');
    return formattedDate!!;
  }

  protected formatReference(reference: number): string {
    const floatNumber = this.decimalPipe.transform(reference!!, '1.2-2');
    return floatNumber!!
  }

  protected onClickBack() {
    this.router.navigate(['sessions']);
  }

}
