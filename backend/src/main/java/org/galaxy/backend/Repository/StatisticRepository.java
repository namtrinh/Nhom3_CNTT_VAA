package org.galaxy.backend.Repository;

import org.galaxy.backend.Model.Statistic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatisticRepository extends JpaRepository<Statistic,String> {
}
