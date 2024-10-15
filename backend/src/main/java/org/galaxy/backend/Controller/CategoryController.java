package org.galaxy.backend.Controller;

import java.util.List;

import org.galaxy.backend.Model.Category;
import org.galaxy.backend.ModelDTO.response.ApiResponse;
import org.galaxy.backend.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ApiResponse<List<Category>> getAllCategories() {
        var result = categoryService.findAll();
        return ApiResponse.<List<Category>>builder().code(200).result(result).build();
    }

    @GetMapping(value = "/{category_id}")
    public ApiResponse<Category> getById(@PathVariable Integer category_id) {
        return ApiResponse.<Category>builder()
                .code(200)
                .result(categoryService.findById(category_id))
                .build();
    }

    @GetMapping(value = "/name/{seotitle}")
    public ApiResponse<Category> getBySeotile(@PathVariable String seotitle) {
        return ApiResponse.<Category>builder()
                .code(200)
                .result(categoryService.findBySeotitle(seotitle))
                .build();
    }

    @PostMapping
    public ApiResponse<Category> create(@RequestBody Category category) {
        return ApiResponse.<Category>builder()
                .code(200)
                .result(categoryService.save(category))
                .build();
    }

    @PutMapping(value = "/{category_id}")
    public ApiResponse<Category> edit(@PathVariable Integer category_id, @RequestBody Category category) {
        return ApiResponse.<Category>builder()
                .code(200)
                .result(categoryService.editCategory(category_id, category))
                .build();
    }

    @DeleteMapping(value = "/{category_id}")
    public void delete(@PathVariable Integer category_id) {
        categoryService.deleteById(category_id);
    }
}
