package org.galaxy.backend.Controller;

import java.util.List;
import java.util.Random;
import java.util.Set;

import jakarta.validation.Valid;

import org.galaxy.backend.Model.Permission.Roles;
import org.galaxy.backend.Model.User;
import org.galaxy.backend.ModelDTO.request.UsersRequest;
import org.galaxy.backend.ModelDTO.response.ApiResponse;
import org.galaxy.backend.ModelDTO.response.UsersResponse;
import org.galaxy.backend.Repository.UserRepository;
import org.galaxy.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping(value = "users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @GetMapping(value = "/myinf")
    @ResponseStatus(value = HttpStatus.OK)
    public ApiResponse<UsersResponse> getInf() {
        return ApiResponse.<UsersResponse>builder()
                .code(200)
                .result(userService.getInf())
                .build();
    }

    @PostMapping
    public ApiResponse<UsersResponse> handleFileUpload(@RequestBody @Valid UsersRequest usersRequest) {
        return ApiResponse.<UsersResponse>builder()
                .code(HttpStatus.CREATED.value())
                .result(userService.CreateUser(usersRequest))
                .build();
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    ApiResponse<List<UsersResponse>> getUsers() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("email:{}", authentication.getName());
        authentication.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));
        var result = userService.findAllUser();
        result.sort((a, b) -> b.getTime_created().compareTo(a.getTime_created()));
        return ApiResponse.<List<UsersResponse>>builder().result(result).build();
    }

    @GetMapping(value = "random_user")
    public User randomUser() {
        List<User> users = userRepository.findAllUser();
        if (users.isEmpty()) {
            return null; // Hoặc xử lý lỗi nếu danh sách rỗng
        }
        Random random = new Random();
        int randomIndex = random.nextInt(users.size());
        return users.get(randomIndex);
    }

    @GetMapping(value = "/{user_id}")
    //   @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(value = HttpStatus.OK)
    public ApiResponse<UsersResponse> findById(@PathVariable("user_id") String user_id) {
        return ApiResponse.<UsersResponse>builder()
                .code(200)
                .result(userService.getUser(user_id))
                .build();
    }

    @PutMapping(value = "/{user_id}")
    @ResponseStatus(value = HttpStatus.OK)
    public ApiResponse<UsersResponse> editUsers(
            @PathVariable String user_id, @RequestBody UsersRequest userUpdateRequest) {
        return ApiResponse.<UsersResponse>builder()
                .code(HttpStatus.OK.value())
                .result(userService.editUsers(user_id, userUpdateRequest))
                .build();
    }

    @DeleteMapping(value = "/{user_id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public ApiResponse<String> deleteById(@PathVariable String user_id) {
        userService.deleteById(user_id);
        return ApiResponse.<String>builder()
                .result("Users have been deleted")
                .code(200)
                .build();
    }

    @GetMapping(value = "/role/{role}")
    public ApiResponse<List<UsersResponse>> getAllByRole(@PathVariable Set<Roles> role) {
        return ApiResponse.<List<UsersResponse>>builder()
                .code(200)
                .result(userService.findAllByRole(role))
                .build();
    }
}
