package org.galaxy.backend.Service;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;

import org.galaxy.backend.Exception.AppException;
import org.galaxy.backend.Exception.ErrorCode;
import org.galaxy.backend.Model.InvalidateToken;
import org.galaxy.backend.Model.User;
import org.galaxy.backend.ModelDTO.request.AuthenticateRequest;
import org.galaxy.backend.ModelDTO.request.CheckTokenRequest;
import org.galaxy.backend.ModelDTO.request.LogoutRequest;
import org.galaxy.backend.ModelDTO.request.RefreshTokenRequest;
import org.galaxy.backend.ModelDTO.response.AuthenticateResponse;
import org.galaxy.backend.ModelDTO.response.CheckTokenResponse;
import org.galaxy.backend.ModelDTO.response.LoginResponse;
import org.galaxy.backend.Repository.InvalidateTokenRepository;
import org.galaxy.backend.Repository.UserRepository;
import org.galaxy.backend.Service.VerifyUser.EmailService;
import org.galaxy.backend.Service.VerifyUser.VerifyCodeGeneration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import lombok.RequiredArgsConstructor;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AuthenticateService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InvalidateTokenRepository invalidateTokenRepository;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    @NonFinal
    @Value("${jwt.valid-Duration}")
    protected long VALID_DURATION;

    @NonFinal
    @Value("${jwt.refreshable-Duration}")
    protected long REFRESHABLE_DURATION;

    @Autowired
    private EmailService emailService;

    @Autowired
    private VerifyCodeGeneration verifyCodeGeneration;

    public CheckTokenResponse checkToken(CheckTokenRequest request) throws JOSEException, ParseException {
        var token = request.getToken();
        boolean isValid = true;
        try {
            verifyToken(token, false);
        } catch (AppException e) {
            isValid = false;
        }
        return CheckTokenResponse.builder().valid(isValid).build();
    }

    public LoginResponse Authenticate(AuthenticateRequest authenticateRequest) {
        var users = userRepository
                .findByEmail(authenticateRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Email is not correct"));
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        boolean authenticated = passwordEncoder.matches(authenticateRequest.getPassword(), users.getPassword());
        if (!authenticated) throw new AppException(ErrorCode.UNAUTHENTICATED);

        LocalDateTime now = LocalDateTime.now();

        if (users.getLastRequestTime() != null) {
            if (now.isBefore(users.getLastRequestTime().plusMinutes(10))) {
                if (users.getRequestCount() >= 5) {
                    throw new AppException(ErrorCode.REQUEST_LIMIT_EXCEEDED);
                }
            } else {
                users.setRequestCount(0);
            }
        }
        users.setRequestCount(users.getRequestCount() + 1);
        users.setLastRequestTime(now);

        String auth_code = VerifyCodeGeneration.generateVerificationCode();
        users.setVerificationCode(auth_code);
        users.setVerificationCodeExpiry(now.plusMinutes(1));

        userRepository.save(users);

        emailService.sendCodeToMail(users.getEmail(), "Mã xác nhận của bạn là: ", "Mã của bạn là: " + auth_code);
        return LoginResponse.builder().authenticate(true).build();
    }

    public AuthenticateResponse verifyAuthCode(String email, String authCode) {
        var user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Email is incorrect"));
        // Kiểm tra mã xác thực
        if (!user.getVerificationCode().equals(authCode)) {
            throw new AppException(ErrorCode.VERIFY_ERROR);
        }
        if (user.getVerificationCodeExpiry() == null || LocalDateTime.now().isAfter(user.getVerificationCodeExpiry())) {
            throw new AppException(ErrorCode.VERIFY_CODE_EXPIRED);
        }
        // Mã xác thực hợp lệ, tạo token
        var token = generateToken(user);
        // Xoá mã xác thực sau khi xác minh thành công
        user.setVerificationCode(null);
        user.setActivated(true);
        userRepository.save(user);
        return AuthenticateResponse.builder().token(token).authenticate(true).build();
    }

    public SignedJWT verifyToken(String token, boolean isRefresh) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());
        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime = isRefresh
                ? Date.from(signedJWT
                        .getJWTClaimsSet()
                        .getIssueTime()
                        .toInstant()
                        .plus(REFRESHABLE_DURATION, ChronoUnit.SECONDS))
                : signedJWT.getJWTClaimsSet().getExpirationTime();

        boolean verified = signedJWT.verify(verifier);
        if (!(verified && expiryTime.after(new Date()))) {
            throw new AppException(ErrorCode.EXPIRE_TOKEN);
        }

        if (invalidateTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID())) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        return signedJWT;
    }

    public void logout(LogoutRequest logoutRequest) throws ParseException, JOSEException {
        try {
            var signToken = verifyToken(logoutRequest.getToken(), true);

            String jit = signToken.getJWTClaimsSet().getJWTID();
            Date expiryTime = signToken.getJWTClaimsSet().getExpirationTime();

            InvalidateToken invalidatedToken =
                    InvalidateToken.builder().id(jit).expiryTime(expiryTime).build();
            invalidateTokenRepository.save(invalidatedToken);
        } catch (AppException e) {
            log.info("Token already expired");
        }
    }

    public AuthenticateResponse refreshToken(RefreshTokenRequest refreshTokenRequest)
            throws ParseException, JOSEException {
        var signJWT = verifyToken(refreshTokenRequest.getToken(), true);
        var jit = signJWT.getJWTClaimsSet().getJWTID();
        var expiryTime = signJWT.getJWTClaimsSet().getExpirationTime();
        InvalidateToken invalidatedToken =
                InvalidateToken.builder().id(jit).expiryTime(expiryTime).build();
        invalidateTokenRepository.save(invalidatedToken);

        var email = signJWT.getJWTClaimsSet().getSubject();
        var user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));
        var token = generateToken(user);
        return AuthenticateResponse.builder().token(token).authenticate(true).build();
    }

    private String generateToken(User user) {

        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getEmail())
                .issuer("Nam Cao")
                .issueTime(new Date())
                .expirationTime(new Date(System.currentTimeMillis() + VALID_DURATION))
                .jwtID(UUID.randomUUID().toString())
                .claim("scope", buildscope(user))
                .claim("userId", user.getUser_id())
                .build();
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);
        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }
    }

    private String buildscope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");
        if (!CollectionUtils.isEmpty(user.getRoles()))
            user.getRoles().forEach(role -> {
                stringJoiner.add("ROLE_" + role.getName());
                if (!CollectionUtils.isEmpty(role.getPermissions()))
                    role.getPermissions().forEach(permission -> stringJoiner.add(permission.getName()));
            });
        return stringJoiner.toString();
    }
}
