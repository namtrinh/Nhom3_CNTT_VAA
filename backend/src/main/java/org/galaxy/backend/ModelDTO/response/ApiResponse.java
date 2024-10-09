package org.galaxy.backend.ModelDTO.response;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

// @JsonInclude(JsonInclude.Include.NON_NULL)
// field = null is not get

// structure response main
public class ApiResponse<T> {
    private int code = 1000;
    private String message = "success";
    private T result;
}
