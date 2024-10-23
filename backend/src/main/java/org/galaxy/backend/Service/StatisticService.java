package org.galaxy.backend.Service;

import org.galaxy.backend.Model.Statistic;
import org.galaxy.backend.Repository.StatisticRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StatisticService {

    @Autowired
    private StatisticRepository statisticRepository;

    public List<Statistic> findAll() {
        return statisticRepository.findAll();
    }

    public Statistic save(Statistic entity) {
        return statisticRepository.save(entity);
    }

    public Statistic findById(String string) {
        return statisticRepository.findById(string).orElseThrow(()->new RuntimeException("Could not find"));
    }
}
