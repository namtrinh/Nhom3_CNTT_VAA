package org.galaxy.backend.Controller;

import java.text.ParseException;
import java.util.UUID;

import org.galaxy.backend.ModelDTO.request.AuthenticateRequest;
import org.galaxy.backend.ModelDTO.request.CheckTokenRequest;
import org.galaxy.backend.ModelDTO.request.LogoutRequest;
import org.galaxy.backend.ModelDTO.request.RefreshTokenRequest;
import org.galaxy.backend.ModelDTO.response.ApiResponse;
import org.galaxy.backend.ModelDTO.response.AuthenticateResponse;
import org.galaxy.backend.ModelDTO.response.CheckTokenResponse;
import org.galaxy.backend.ModelDTO.response.LoginResponse;
import org.galaxy.backend.Service.AuthenticateService;
import org.galaxy.backend.Service.ResetPasswordService;
import org.galaxy.backend.Service.UserService;
import org.galaxy.backend.Service.VerifyUser.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nimbusds.jose.JOSEException;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class AuthenticateController {
    @Autowired
    private AuthenticateService authenticateService;

    @Autowired
    private ResetPasswordService resetPasswordService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserService userService;

    @PostMapping()
    public ApiResponse<LoginResponse> authenticate(@RequestBody AuthenticateRequest authenticateRequest) {
            return ApiResponse.<LoginResponse>builder()
                    .code(200)
                    .result(authenticateService.Authenticate(authenticateRequest))
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
        AuthenticateResponse response = authenticateService.verifyAuthCode(email, authCode);
        return ApiResponse.<AuthenticateResponse>builder()
                .code(200)
                .message("Your account has been successfully confirmed.")
                .result(response)
                .build();
    }

    @PostMapping("/reset/forgot-password")
    public ApiResponse<String> forgotPassword(@RequestParam String email) {
        var user = userService.getUserByEmail(email);
        if (user == null) {
            return ApiResponse.<String>builder()
                    .code(404)
                    .message("Couldn't find this email address")
                    .result("false")
                    .build();
        }
        try {
            String reset_key = UUID.randomUUID().toString();
            resetPasswordService.storeResetKey(email, reset_key);

            String resetLink = "http://localhost:4200/reset-password?email=" + email + "&reset_key=" + reset_key;
            emailService.sendCodeToMail(email, "Reset your password", "Click this url to reset password: " + resetLink);

            return ApiResponse.<String>builder()
                    .code(200)
                    .message("One url has been sent to your email")
                    .result("true")
                    .build();
        } catch (IllegalStateException e) {
            return ApiResponse.<String>builder()
                    .code(429) // Mã lỗi 429 Too Many Requests
                    .message(e.getMessage()) // Thông báo lỗi nếu vượt quá giới hạn
                    .result("false")
                    .build();
        }
    }

    @PostMapping("/reset/reset-password")
    public ApiResponse<String> resetPassword(
            @RequestParam String reset_key, @RequestParam String email, @RequestParam String newPassword) {
        String cachedResetKey = resetPasswordService.getResetKey(email);



        if (cachedResetKey == null || !cachedResetKey.equals(reset_key)) {
            return ApiResponse.<String>builder()
                    .code(200)
                    .message("reset_key is invalid or expired.")
                    .result("false")
                    .build();
        }
        userService.updatePassByEmail(email, newPassword);
        resetPasswordService.removeResetKey(email);
        return ApiResponse.<String>builder()
                .code(200)
                .message("Password has been updated successfully")
                .result("true")
                .build();
    }
}
