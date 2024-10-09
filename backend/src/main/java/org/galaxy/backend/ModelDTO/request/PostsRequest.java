package org.galaxy.backend.ModelDTO.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class PostsRequest {
    private Integer postId;
    private Integer postBy;
    private String content;
    private String image;
    private String statusPost;
    private String postTime;
}
