import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SensorData, Session, SessionsService} from "../../../services/sessions.service";
import {ChartConfiguration, ChartType} from "chart.js/dist/types";
import {BaseChartDirective} from "ng2-charts";
import {DatePipe, DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-session-statistics',
  templateUrl: './session-statistics.component.html',
  styleUrls: ['./session-statistics.component.css']
})
export class SessionStatisticsComponent {

  session: Session = {start_time: null, end_time: null, id: '', reference: 0}
  sensorData: SensorData[] = []

  constructor(private route: ActivatedRoute, private service: SessionsService, private datePipe: DatePipe,
              private decimalPipe: DecimalPipe, private router: Router) {
  }

  ngOnInit(): void {
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

  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

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

  generateLabels(length: number): number[] {
    let labels: number[] = [];
    for (let i = 1; i <= length; i++)
      labels.push(i);
    return labels;
  }

  formatDate(date: Date): string {
    const formattedDate = this.datePipe.transform(date, 'dd-MM-yyyy hh:mm:ss');
    return formattedDate!!;
  }

  formatReference(reference: number): string {
    const floatNumber = this.decimalPipe.transform(reference!!, '1.2-2');
    return floatNumber!!
  }

  onClickBack() {
    this.router.navigate(['sessions']);
  }
}
