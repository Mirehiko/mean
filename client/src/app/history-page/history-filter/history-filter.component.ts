import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MaterialDatepicker, MaterialService } from 'src/app/shared/classes/material.service';
import { Filter } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() onFilter = new EventEmitter<Filter>();
  @ViewChild('start') startRef: ElementRef;
  @ViewChild('end') endRef: ElementRef;

  startPicker: MaterialDatepicker;
  endPicker: MaterialDatepicker;

  isValid = true;
  order: number;

  constructor() { }

  ngOnDestroy(): void {
    this.startPicker.destroy();
    this.endPicker.destroy();
  }

  ngAfterViewInit(): void {
    this.startPicker = MaterialService.initDatepicker(this.startRef, this.validate.bind(this));
    this.endPicker = MaterialService.initDatepicker(this.endRef, this.validate.bind(this));
  }

  ngOnInit(): void {
  }

  submitFilter() {
    const filter: Filter = {};

    if (this.order) {
      filter.order = this.order;
    }

    if (this.startPicker.date) {
      filter.start = this.startPicker.date;
    }

    if (this.endPicker.date) {
      filter.end = this.endPicker.date;
    }

    this.onFilter.emit(filter);
  }

  validate() {
    if (!this.startPicker.date || !this.endPicker.date) {
      this.isValid = true;
      return;
    }

    this.isValid = this.startPicker.date < this.endPicker.date;
  }
}
