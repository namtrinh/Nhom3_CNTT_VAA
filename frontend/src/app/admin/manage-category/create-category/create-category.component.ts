import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../service/categoy-service.service';
import { Category } from '../../../model/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent {

  category: Category = new Category();
  checkcategory: any;
  constructor(private categoryService: CategoryService, private router: Router) { }

  create() {
    this.categoryService.createCategory(this.category).subscribe((data: any) => {
      this.router.navigate(['/admin/category']);
    })
  }
  OnSubmit() {
    this.create();
  }
}
