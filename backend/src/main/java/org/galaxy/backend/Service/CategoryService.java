package org.galaxy.backend.Service;

import java.util.List;

import org.galaxy.backend.Model.Category;
import org.galaxy.backend.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category save(Category entity) {
        return categoryRepository.save(entity);
    }

    public Category findById(String integer) {
        return categoryRepository.findById(integer).orElseThrow(() -> new RuntimeException("Not found"));
    }

    public Category findBySeotitle(String ct_seotitle) {
        return categoryRepository.getByCt_seotitle(ct_seotitle);
    }

    public void deleteById(String category_id) {
        categoryRepository.deleteById(category_id);
    }

    public Category editCategory(String integer, Category category) {
        Category existingCategory =
                categoryRepository.findById(integer).orElseThrow(() -> new RuntimeException("Category not found"));
        existingCategory.setCt_name(category.getCt_name());
        existingCategory.setCt_seotitle(category.getCt_seotitle());
        existingCategory.setSort(category.getSort());
        existingCategory.setIcon(category.getIcon());
        existingCategory.setPoster(category.getPoster());

        return categoryRepository.save(existingCategory);
    }
}
