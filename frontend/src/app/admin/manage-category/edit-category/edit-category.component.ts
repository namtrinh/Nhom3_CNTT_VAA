import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../service/categoy-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../model/category.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})
export class EditCategoryComponent implements OnInit {
  ngOnInit(): void {
   this.getById();
  }

  id!:string;
  category:Category = new Category();
  constructor(private router: Router, private categoryService: CategoryService,private routeractive:ActivatedRoute){}

  getById(){
      this.id = this.routeractive.snapshot.params['category_id'];
    this.categoryService.getById(this.id).subscribe((data:any) =>{
        this.category = data.result;
    })
  }

  OnSubmit(){
    this.Edit();
  }

  Edit(){
    this.categoryService.editCategory( this.id,this.category).subscribe((data:any) =>{
      this.router.navigate(['/admin/category']);
    })
  }

}
