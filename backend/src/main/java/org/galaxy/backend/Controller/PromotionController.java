package org.galaxy.backend.Controller;

import java.util.List;

import org.galaxy.backend.Model.Promotion;
import org.galaxy.backend.ModelDTO.response.ApiResponse;
import org.galaxy.backend.Service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/promotions")
public class PromotionController {

    @Autowired
    private PromotionService promotionService;

    @GetMapping
    public ApiResponse<List<Promotion>> getAll() {
        return ApiResponse.<List<Promotion>>builder()
                .code(200)
                .result(promotionService.findAll())
                .message("Success")
                .build();
    }

    @GetMapping(value = "/{promotion_id}")
    public ApiResponse<Promotion> getById(@PathVariable String promotion_id) {
        return ApiResponse.<Promotion>builder()
                .code(200)
                .result(promotionService.getById(promotion_id))
                .message("Success")
                .build();
    }

    @PostMapping
    public ApiResponse<Promotion> create(@RequestBody Promotion promotion) {
        return ApiResponse.<Promotion>builder()
                .code(200)
                .result(promotionService.save(promotion))
                .message("created promotion success")
                .build();
    }

    @PutMapping(value = "/{promotion_id}")
    public ApiResponse<Promotion> update(@PathVariable String promotion_id, @RequestBody Promotion promotion) {
        return ApiResponse.<Promotion>builder()
                .code(200)
                .result(promotionService.updateById(promotion_id, promotion))
                .message("updated promotion success")
                .build();
    }

    @DeleteMapping(value = "/{promotion_id}")
    public void delete(@PathVariable String promotion_id) {
        promotionService.deleteById(promotion_id);
    }
}
