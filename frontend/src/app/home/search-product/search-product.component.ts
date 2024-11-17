import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/product-service.service";
import {Product} from "../../model/product.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {DecimalPipe} from "@angular/common";
import {ImageService} from "../../service/img-service.service";

@Component({
  selector: 'app-search-product',
  standalone: true,
  imports: [
    DecimalPipe,
    RouterLink
  ],
  templateUrl: './search-product.component.html',
  styleUrl: './search-product.component.css'
})
export class SearchProductComponent implements OnInit {

  products: Product[] = [];
  name!: string;
  imgAvatars: { [key: string]: string } = {};
  imageUrl!:string;

  constructor(private productService: ProductService,
              private activatedRouter: ActivatedRoute,
              private imgService: ImageService) {
  }

  ngOnInit(): void {
    this.name = this.activatedRouter.snapshot.params['name'];
    this.search(this.name);
  }

  search(name: string) {
    this.productService.searchProduct(this.name.toLowerCase().trim()).subscribe((data: any) => {
      this.products = data.result;
    })
  }

}
