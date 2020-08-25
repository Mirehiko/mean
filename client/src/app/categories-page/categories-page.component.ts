import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../shared/interfaces';
import { CategoriesService } from '../shared/services/categories.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit, OnDestroy {

  cSub: Subscription;
  categories$: Observable<Category[]>;
  // categories: Category[] = [];
  // loading = false;

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnDestroy(): void {
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetch();
    // this.loading = true;
    // this.cSub = this.categoriesService.fetch().subscribe(categories => {
    //   this.categories = categories;
    //   this.loading = false;
    // });
  }

}
