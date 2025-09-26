import { Component } from '@angular/core';

@Component({
  selector: 'important-dates',
  standalone: true,
  imports: [],
  templateUrl: './important-dates.component.html',
  styleUrl: './important-dates.component.scss'
})
export class ImportantDates {
  events = Array.from({length: 4}, (_,i)=>i);
  months: { events: number[] }[] = [
    {
      events: this.events
    },
    {
      events: this.events
    },
    {
      events: this.events
    },
    {
      events: this.events
    }
  ]
}
