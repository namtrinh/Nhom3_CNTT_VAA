import { Component, OnInit } from '@angular/core';
import { __importDefault } from 'tslib';
import { CategoryService } from '../../../service/categoy-service.service';
import { Category } from '../../../model/category.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-category',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss'
})
export class ListCategoryComponent implements OnInit {

  ngOnInit(): void {
    this.getAll();
  }

  categorys: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  getAll() {
    this.categoryService.getAll().subscribe((data: any) => {
      this.categorys = data.result;
    })
  }

  delete(category_id: string) {
    if(window.confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(category_id).subscribe((data: any) => {
        this.getAll();
      })
    }
  }
}
