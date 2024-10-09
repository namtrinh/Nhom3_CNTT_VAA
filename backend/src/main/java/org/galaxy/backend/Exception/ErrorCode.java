package org.galaxy.backend.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public enum ErrorCode {
    Success(200, "success", HttpStatus.OK),
    UNKNOWN_ERROR(9999, "error not identified", HttpStatus.BAD_REQUEST),
    USERS_EXISTED(1001, "Users is exists", HttpStatus.IM_USED),
    USERS_EMPTY(1002, "Users is not empty", HttpStatus.INTERNAL_SERVER_ERROR),
    UNAUTHORIZATION(1003, "You don't have permission", HttpStatus.UNAUTHORIZED),
    UNAUTHENTICATED(1004, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    VERIFY_ERROR(9999, "Incorrect verification code", HttpStatus.UNAUTHORIZED),
    EXPIRE_TOKEN(9999, "This token has expired", HttpStatus.BAD_REQUEST);

    private int code;
    private String message;
    private HttpStatusCode statusCode;
}
