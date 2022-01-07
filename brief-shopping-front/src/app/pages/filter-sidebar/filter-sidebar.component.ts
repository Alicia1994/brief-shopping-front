import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.scss']
})
export class FilterSidebarComponent implements OnInit {
  
  @Input() listCategoriesFilter: string[];

  constructor() {
    this.listCategoriesFilter = [];
   }

  ngOnInit(): void {
  }

  public onChangeValue(eventValue: any): void {
    console.log('Event Change :',eventValue);
  }

}
