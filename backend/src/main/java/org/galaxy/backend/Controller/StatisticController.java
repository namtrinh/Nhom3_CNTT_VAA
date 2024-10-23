package org.galaxy.backend.Controller;

import org.galaxy.backend.Model.Statistic;
import org.galaxy.backend.ModelDTO.response.ApiResponse;
import org.galaxy.backend.Service.StatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/statistic")
public class StatisticController {

    @Autowired
    private StatisticService statisticService;

    @GetMapping
    public ApiResponse<List<Statistic>> getAll() {
        return ApiResponse.<List<Statistic>>builder()
                .code(200)
                .result(statisticService.findAll())
                .build();
    }

    @GetMapping(value = "/{statistic_id}")
    public ApiResponse<Statistic> getById(@PathVariable String statisticId) {
        return ApiResponse.<Statistic>builder()
                .code(200)
                .result(statisticService.findById(statisticId))
                .build();
    }

    @PostMapping
    public ApiResponse<Statistic> Create(@RequestBody Statistic statistic){
        return ApiResponse.<Statistic>builder()
                .code(200)
                .result(statisticService.save(statistic))
                .build();
    }

}
