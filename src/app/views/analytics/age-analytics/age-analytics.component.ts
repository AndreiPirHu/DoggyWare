import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { Dog } from '../../../data/dog.model';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-age-analytics',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './age-analytics.component.html',
  styleUrl: './age-analytics.component.css',
})
export class AgeAnalyticsComponent implements OnChanges {
  ages: number[] = [];
  amountPerAge: number[] = [];

  @Input() dogs: Dog[] = [];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  ngOnChanges(): void {
    if (this.dogs) {
      this.getAges();
      this.getAmountPerAge();
    }
  }

  getAges = () => {
    this.ages = [];
    for (let dog of this.dogs) {
      if (!this.ages.includes(dog.age)) {
        this.ages.push(dog.age);
      }
    }
    this.ages.sort((a, b) => a - b);
  };

  getAmountPerAge = () => {
    this.amountPerAge = [];
    for (let age of this.ages) {
      let uniqueAgeAmount = this.dogs.filter((dog: Dog) => {
        return dog.age == age;
      }).length;
      this.amountPerAge.push(uniqueAgeAmount);
    }
    this.updateData();
  };

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.amountPerAge,
        label: 'dogs',
        backgroundColor: 'rgba(58, 162, 235,1)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: this.ages,
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    aspectRatio: 1,
    scales: {
      x: {
        grid: {
          display: false, // Remove gridlines on x-axis
        },
      },
      y: {
        ticks: {
          display: false, // Hide y-axis labels
        },
        grid: {
          display: false, // Remove gridlines on y-axis
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  public lineChartType: ChartType = 'bar';

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
    if (this.lineChartData.datasets[0].data && this.lineChartData.labels) {
      this.lineChartData.datasets[0].data = this.amountPerAge;
      this.lineChartData.labels = this.ages;
    }

    this.chart?.update();
  }
}
