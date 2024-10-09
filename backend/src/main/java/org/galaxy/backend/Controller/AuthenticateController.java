package org.galaxy.backend.Controller;

import java.text.ParseException;

import org.galaxy.backend.ModelDTO.request.AuthenticateRequest;
import org.galaxy.backend.ModelDTO.request.CheckTokenRequest;
import org.galaxy.backend.ModelDTO.request.RefreshTokenRequest;
import org.galaxy.backend.ModelDTO.response.ApiResponse;
import org.galaxy.backend.ModelDTO.response.AuthenticateResponse;
import org.galaxy.backend.ModelDTO.response.CheckTokenResponse;
import org.galaxy.backend.ModelDTO.response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.galaxy.backend.ModelDTO.request.LogoutRequest;
import org.galaxy.backend.Service.AuthenticateService;
import com.nimbusds.jose.JOSEException;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class AuthenticateController {
    @Autowired
    private AuthenticateService authenticateService;

    @PostMapping()
    public ApiResponse<LoginResponse> authenticate(@RequestBody AuthenticateRequest authenticateRequest) {
        var result = authenticateService.Authenticate(authenticateRequest);
        return ApiResponse.<LoginResponse>builder()
                .code(200)
                .message("A verification code has been sent to you !")
                .result(result)
                .build();
    }

    @PostMapping("/refresh")
    public ApiResponse<AuthenticateResponse> authenticate(@RequestBody RefreshTokenRequest refreshTokenRequest)
            throws ParseException, JOSEException {
        var result = authenticateService.refreshToken(refreshTokenRequest);
        return ApiResponse.<AuthenticateResponse>builder()
                .code(200)
                .result(result)
                .build();
    }

    @PostMapping("/check_token")
    public ApiResponse<CheckTokenResponse> authenticate(@RequestBody CheckTokenRequest checkTokenRequest)
            throws ParseException, JOSEException {
        var result = authenticateService.checkToken(checkTokenRequest);
        return ApiResponse.<CheckTokenResponse>builder()
                .code(201)
                .result(result)
                .build();
    }

    @PostMapping("/logout")
    ApiResponse<Void> logout(@RequestBody LogoutRequest logoutRequest) throws ParseException, JOSEException {
        authenticateService.logout(logoutRequest);
        return ApiResponse.<Void>builder().build();
    }

    @PostMapping(value = "/verify_code")
    public ApiResponse<AuthenticateResponse> verifyAuthCode(
            @RequestParam("email") String email, @RequestParam("auth_code") String authCode) {
        // Gọi phương thức verifyAuthCode từ service
        AuthenticateResponse response = authenticateService.verifyAuthCode(email, authCode);
        // Trả về phản hồi chứa token nếu xác thực thành công
        return ApiResponse.<AuthenticateResponse>builder()
                .code(200)
                .message("Your account has been successfully confirmed.")
                .result(response)
                .build();
    }
}
