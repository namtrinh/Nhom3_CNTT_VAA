package org.galaxy.backend.Controller;

import java.util.Collections;
import java.util.List;

import org.galaxy.backend.Model.Brand;
import org.galaxy.backend.ModelDTO.response.ApiResponse;
import org.galaxy.backend.Service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/brand")
public class BrandController {

    @Autowired
    private BrandService brandService;

    @GetMapping
    public ApiResponse<List<Brand>> getAll() {
        var result = brandService.findAll();
        Collections.reverse(result);
        return ApiResponse.<List<Brand>>builder().code(200).result(result).build();
    }

    @GetMapping(value = "/{brand_id}")
    public ApiResponse<Brand> getById(@PathVariable Integer brand_id) {
        return ApiResponse.<Brand>builder()
                .code(200)
                .result(brandService.findById(brand_id))
                .build();
    }

    @PostMapping
    public ApiResponse<Brand> create(@RequestBody Brand brand) {
        return ApiResponse.<Brand>builder()
                .code(200)
                .result(brandService.save(brand))
                .build();
    }

    @PutMapping(value = "/{brand_id}")
    public ApiResponse<Brand> update(@PathVariable Integer brand_id, @RequestBody Brand brand) {
        return ApiResponse.<Brand>builder()
                .code(200)
                .result(brandService.editById(brand_id, brand))
                .build();
    }

    @DeleteMapping(value = "/{brand_id}")
    public void delete(@PathVariable Integer brand_id) {
        brandService.deleteById(brand_id);
    }
}
