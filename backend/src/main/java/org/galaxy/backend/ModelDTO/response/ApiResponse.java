package org.galaxy.backend.ModelDTO.response;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ApiResponse<T> {
    private int code = 1000;
    private String message = "success";
    private T result;
}
