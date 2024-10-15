package org.galaxy.backend.Service;

import java.util.HashSet;
import java.util.List;

import org.galaxy.backend.Mapper.RolesMapper;
import org.galaxy.backend.ModelDTO.request.RolesRequest;
import org.galaxy.backend.ModelDTO.response.RolesResponse;
import org.galaxy.backend.Repository.PermissionRepository;
import org.galaxy.backend.Repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class RoleService {
    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RolesMapper rolesMapper;

    public RolesResponse create(RolesRequest rolesrequest) {
        var role = rolesMapper.toRolesRequest(rolesrequest);

        var permissions = permissionRepository.findAllById(rolesrequest.getPermissions());
        role.setPermissions(new HashSet<>(permissions));

        role = roleRepository.save(role);
        return rolesMapper.toRolesResponse(role);
    }

    public List<RolesResponse> getAll() {
        var roles = roleRepository.findAll();
        return roles.stream().map(rolesMapper::toRolesResponse).toList();
    }

    public void delete(String roles) {
        roleRepository.deleteById(roles);
    }

    public RolesResponse findById(String name) {
        return rolesMapper.toRolesResponse(
                roleRepository.findById(name).orElseThrow(() -> new RuntimeException("cannot find")));
    }

    public RolesResponse editById(String name, RolesRequest rolesRequest) {
        var role = rolesMapper.toRolesRequest(rolesRequest);
        role.setName(name);
        return rolesMapper.toRolesResponse(roleRepository.save(role));
    }
}
