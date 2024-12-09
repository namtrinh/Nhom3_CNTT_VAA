import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../service/user-service.service';
import { AuthService } from '../../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../service/categoy-service.service';
import { Category } from '../../model/category.model';
import { ProductService } from '../../service/product-service.service';
import { ProductByCategoryComponent } from "../product-by-category/product-by-category.component";
import { FooterComponent } from "../footer/footer.component";
import { ProductExtendComponent } from "../product-extend/product-extend.component";
import {Product} from "../../model/product.model";

@Component({
  selector: 'app-view-home',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink, ProductByCategoryComponent, FooterComponent, ProductExtendComponent],
  templateUrl: './view-home.component.html',
  styleUrl: './view-home.component.scss'
})
export class ViewHomeComponent implements OnInit {
  selectedCategory!: number;
  category_id: any;
  name!:string;
  products:Product[] = [];

  ngOnInit(): void {
    this.checktoken();
    this.getinf();
    this.getAllMenu();
  }
  category: Category[] = [];
  checktokenkey: boolean = true;
  inf: any;
  showProduct: boolean = false;
  categoryId:string = ''

  showProductSale: boolean = false;
  constructor(private router: Router, private userService: UserService, private productService: ProductService,
    private auth: AuthService, private categoryService: CategoryService) { }

  getinf() {
    this.userService.getmyinf().subscribe((data: any) => {
      this.inf = data.result;
    })
  }

  logout() {
    if (window.confirm("Are you sure want to logout ?")) {
      const token = localStorage.getItem("auth_token");
      this.auth.logout(token).subscribe((data: any) => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('userId');
        this.router.navigate(['/']).then(() => {
          setTimeout(() => {
            window.location.reload();
            setTimeout(() => {
              window.location.reload();
            }, 10);
          }, 10);
        })
      })
    }
  }

  checktoken() {
    const checktoken = localStorage.getItem("auth_token");
    if (checktoken == null) {
      this.checktokenkey = false;
    }
  }

  getAllMenu() {
    this.categoryService.getAll().subscribe((data: any) => {
      this.category = data.result;
    })
  }
  search(){

    if (this.name == null){
      alert("Please input name !");
    }

    this.productService.searchProduct(this.name, this.categoryId).subscribe((data:any) => {
      this.products = data.result;
      console.log(this.products);
        this.router.navigate(['/search',this.name])
      setTimeout(() =>{
        window.location.reload();
      },0)
    })
  }

  OnSubmit(){
    this.search();
  }

  navigateToOrder(){
    const userId = localStorage.getItem('user_Id')
    this.router.navigate(['/my_order',userId])
  }
}
