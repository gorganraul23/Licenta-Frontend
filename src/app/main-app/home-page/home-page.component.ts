import {Component, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import {ToastService} from "../toast/toast.service";
import {WebsocketService} from "../../services/websocket.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private toast: ToastService, private websocket: WebsocketService) {
  }

  ngOnInit(): void {
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

  updateChart(hr: number, hrv: number) {

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

  generateLabels(length: number): number[] {
    let labels: number[] = [];
    for (let i = 1; i <= length; i++)
      labels.push(i);
    return labels;
  }

  ngOnDestroy(): void {
    this.websocket.close();
  }

}
