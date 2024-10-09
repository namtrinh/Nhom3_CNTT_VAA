package org.galaxy.backend.Controller;

import java.util.List;

import org.galaxy.backend.ModelDTO.response.ApiResponse;
import org.galaxy.backend.ModelDTO.response.RolesResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.galaxy.backend.ModelDTO.request.RolesRequest;
import org.galaxy.backend.Service.RoleService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/admin/roles")
public class RolesController {
    @Autowired
    private RoleService roleService;

    @PostMapping
    ApiResponse<RolesResponse> create(@RequestBody RolesRequest request) {
        return ApiResponse.<RolesResponse>builder()
                .result(roleService.create(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<RolesResponse>> getAll() {
        return ApiResponse.<List<RolesResponse>>builder()
                .result(roleService.getAll())
                .build();
    }

    @GetMapping(value = "/{name}")
    public ApiResponse<RolesResponse> getById(@PathVariable String name) {
        return ApiResponse.<RolesResponse>builder()
                .code(200)
                .result(roleService.findById(name))
                .build();
    }

    @PutMapping(value = "/{name}")
    public ApiResponse<RolesResponse> editById(@PathVariable String name, @RequestBody RolesRequest rolesRequest) {
        return ApiResponse.<RolesResponse>builder()
                .code(200)
                .result(roleService.editById(name, rolesRequest))
                .build();
    }

    @DeleteMapping("/{role}")
    ApiResponse<Void> delete(@PathVariable String role) {
        roleService.delete(role);
        return ApiResponse.<Void>builder().build();
    }
}
