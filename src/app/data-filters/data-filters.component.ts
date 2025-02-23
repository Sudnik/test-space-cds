import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { FiltersState } from './filters-state.model';
import { DataFilesService } from '../files-table/data-files.service';
import { Store } from '@ngrx/store';
import { selectFiltersState } from '../reducers/data-files.selectors';
import {
  DataFilesActions,
  DataFilesApiActions,
} from '../reducers/data-files.actions';

@Component({
  selector: 'app-data-filters',
  imports: [FormsModule, CheckboxModule],
  templateUrl: './data-filters.component.html',
  styleUrl: './data-filters.component.less',
})
export class DataFiltersComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<FiltersState>();
  filtersState: FiltersState = {
    isMinValueHide: false,
    isAlphabeticalSorting: false,
    isCategoriesGrouping: false,
  };
  isCategoriesGrouping!: boolean;
  isAlphabeticalSorting!: boolean;
  isMinValueHide!: boolean;

  constructor(
    private dataFilesService: DataFilesService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.dataFilesService.getFiltersState().subscribe((filtersState) => {
      this.store.dispatch(
        DataFilesApiActions.retrievedFiltersState({ filtersState })
      );
    });

    this.store.select(selectFiltersState).subscribe((filters) => {
      this.isCategoriesGrouping = filters.isCategoriesGrouping;
      this.isAlphabeticalSorting = filters.isAlphabeticalSorting;
      this.isMinValueHide = filters.isMinValueHide;
    });
  }

  onChange() {
    let filtersState: FiltersState = {
      isMinValueHide: this.isMinValueHide,
      isAlphabeticalSorting: this.isAlphabeticalSorting,
      isCategoriesGrouping: this.isCategoriesGrouping,
    };

    this.store.dispatch(DataFilesActions.setFiltersState({ filtersState }));
    this.dataFilesService.setFiltersState(filtersState);
  }
}
