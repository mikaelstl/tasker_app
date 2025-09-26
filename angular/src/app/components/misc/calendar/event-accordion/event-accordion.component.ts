import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCalendarMini, heroChevronDownMini } from '@ng-icons/heroicons/mini';
import { CalendarTag } from '../calendar-tag/calendar-tag.component';
import { DateTime } from 'luxon';

@Component({
  selector: 'event-accordion',
  standalone: true,
  imports: [
    NgIconComponent,
    CommonModule,
    CalendarTag
  ],
  providers: [
    provideIcons({
      heroChevronDownMini,
      heroCalendarMini
    })
  ],
  templateUrl: './event-accordion.component.html',
  styleUrl: './event-accordion.component.scss'
})
export class EventAccordion implements OnInit, OnChanges {
  private today: DateTime = DateTime.local();

  @Input() date: {
    day: string,
    month: string,
    year: string
  } = {
    day: '',
    month: '',
    year: ''
  }

  contentOn: boolean = false;

  ngOnInit(): void {
    this.contentOn = this.isToday();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.sameMonth() && this.isToday()) {
      this.contentOn = true;
      return;
    }
    this.contentOn = false;
  }

  showContent() {
    console.log('showing content? '+this.contentOn);
    
    this.contentOn = !this.contentOn;
  }

  isToday(): boolean {
    return this.date.day === this.today.day.toString()
            &&
           this.sameMonth()
             ? true
             : false
  }

  sameMonth(): boolean {
    return this.date.month.toLowerCase() === this.today.monthShort?.replace('.', '')
            ? true
            : false
  }
}
