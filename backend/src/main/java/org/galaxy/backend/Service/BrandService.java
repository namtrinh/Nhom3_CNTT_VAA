package org.galaxy.backend.Service;

import java.util.List;

import org.galaxy.backend.Repository.Brandrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.galaxy.backend.Model.Brand;

@Service
public class BrandService {

    @Autowired
    private Brandrepository brandrepository;

    public List<Brand> findAll() {
        return brandrepository.findAll();
    }

    public Brand save(Brand entity) {
        if (brandrepository.existsByName((entity.getName()))) {
            throw new RuntimeException("You already have this brand");
        }
        return brandrepository.save(entity);
    }

    public Brand findById(Integer integer) {
        return brandrepository.findById(integer).orElseThrow(() -> new RuntimeException("Not found"));
    }

    public void deleteById(Integer integer) {
        brandrepository.deleteById(integer);
    }

    public Brand editById(Integer brand_id, Brand brand) {
        brand.setBrand_id(brand_id);
        return brandrepository.save(brand);
    }
}
