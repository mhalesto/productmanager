import { Router } from '@angular/router';
import { ProductService } from './product.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  pageTitle: String = 'Product List';
  imageWidth: Number = 50;
  imageMargin: Number = 2;
  showImage: Boolean = false;
  errorMessage: string;

  _listFilter: string;

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: IProduct[];
  products: IProduct[] = [];

  constructor(private productService: ProductService,
              private router: Router) {
  }

  performFilter(filterBy: string): IProduct[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1 );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    console.log('In OnInit');
    this.productService.getProducts().subscribe(
        products => {
          this.products = products;
          this.filteredProducts = this.products;
      },
      error => this.errorMessage = <any>error
    );
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List ' + message;
  }

}

