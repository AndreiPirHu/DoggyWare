import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Dog } from '../../../data/dog.model';

@Component({
  selector: 'app-breeds-analytics',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './breeds-analytics.component.html',
  styleUrl: './breeds-analytics.component.css',
})
export class BreedsAnalyticsComponent implements OnChanges {
  breeds: string[] = [];
  amountPerBreed: number[] = [];

  @Input() dogs: Dog[] = [];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  ngOnChanges(): void {
    if (this.dogs) {
      this.getBreeds();
      this.getNumbers();
    }
  }

  getBreeds = () => {
    let uniqueBreeds: string[] = [];
    for (let dog of this.dogs) {
      if (!uniqueBreeds.includes(dog.breed)) {
        uniqueBreeds.push(dog.breed);
      }
    }
    this.breeds = uniqueBreeds;
  };

  getNumbers = () => {
    this.amountPerBreed = [];
    for (let breed of this.breeds) {
      let uniqueBreedAmount = this.dogs.filter((dog: Dog) => {
        return dog.breed == breed;
      }).length;
      this.amountPerBreed.push(uniqueBreedAmount);
    }
    this.updateData();
  };

  // Pie chart
  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };
  public pieChartData: ChartData<'doughnut', number[], string | string[]> = {
    labels: this.breeds,
    datasets: [
      {
        data: [300, 500, 100, 300, 500, 100, 300, 500, 100, 300, 500, 100],
      },
    ],
  };
  public pieChartType: ChartType = 'doughnut';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  // Function to generate random colors
  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  updateData(): void {
    if (this.pieChartData.datasets[0].data && this.pieChartData.labels) {
      this.pieChartData.datasets[0].data = this.amountPerBreed;
      this.pieChartData.labels = this.breeds;

      //random color for each label
      this.pieChartData.datasets[0].backgroundColor =
        this.pieChartData.labels.map(() => this.getRandomColor());
    }

    this.chart?.update();
  }
}
