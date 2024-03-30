import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { Dog } from '../../../data/dog.model';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
@Component({
  selector: 'app-gender-analytics',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './gender-analytics.component.html',
  styleUrl: './gender-analytics.component.css',
})
export class GenderAnalyticsComponent implements OnChanges {
  males: number = 0;
  females: number = 0;

  @Input() dogs: Dog[] = [];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  ngOnChanges(): void {
    if (this.dogs) {
      this.getNumbers();
    }
  }

  getNumbers = () => {
    this.males = 0;
    this.females = 0;

    this.females = this.dogs.filter((dog: Dog) => {
      return dog.sex == 'female';
    }).length;

    this.males = this.dogs.filter((dog: Dog) => {
      return dog.sex == 'male';
    }).length;

    this.updateData();
  };

  public barChartOptions: ChartConfiguration<'pie'>['options'] = {
    // We use these empty structures as placeholders for dynamic theming.

    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public barChartType = 'pie' as const;

  public barChartData: ChartData<'pie'> = {
    labels: ['males', 'females'],
    datasets: [
      {
        data: [this.males, this.females],
        backgroundColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
      },
    ],
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {}

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {}

  updateData(): void {
    if (this.barChartData.datasets[0].data) {
      this.barChartData.datasets[0].data = [this.males, this.females];

      //random color for each label
      /* this.pieChartData.datasets[0].backgroundColor =
        this.pieChartData.labels.map(() => this.getRandomColor());*/
    }

    this.chart?.update();
  }
}
