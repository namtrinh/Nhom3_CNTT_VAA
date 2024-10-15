package org.galaxy.backend.ServiceImpl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.galaxy.backend.Exception.AppException;
import org.galaxy.backend.Exception.ErrorCode;
import org.galaxy.backend.Mapper.UsersMapper;
import org.galaxy.backend.Model.Permission.PredefinedRole;
import org.galaxy.backend.Model.Permission.Roles;
import org.galaxy.backend.Model.User;
import org.galaxy.backend.ModelDTO.request.UsersRequest;
import org.galaxy.backend.ModelDTO.response.UsersResponse;
import org.galaxy.backend.Repository.RoleRepository;
import org.galaxy.backend.Repository.UserRepository;
import org.galaxy.backend.Service.UserService;
import org.galaxy.backend.Service.VerifyUser.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UsersMapper usersMapper;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private EmailService emailService;

    public UsersResponse CreateUser(UsersRequest usersRequest) {
        if (userRepository.existsByEmail(usersRequest.getEmail())) {
            throw new AppException(ErrorCode.USERS_EXISTED);
        }
        User user = usersMapper.toUsersDTO(usersRequest);

        HashSet<Roles> roles = new HashSet<>();
        roleRepository.findById(PredefinedRole.USER_ROLE).ifPresent(roles::add);
        user.setRoles(roles);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(usersRequest.getPassword()));
        return usersMapper.toUsers(userRepository.save(user));
    }

    public UsersResponse getUser(String user_id) {
        return usersMapper.toUsers(
                userRepository.findById(user_id).orElseThrow(() -> new RuntimeException("User not found")));
    }

    public void deleteById(String user_id) {
        userRepository.deleteById(user_id);
    }

    public List<UsersResponse> findAllUser() {
        var users = userRepository.findAllUser();
        return users.stream().map(usersMapper::toUsers).collect(Collectors.toList());
    }

    public UsersResponse editUsers(String user_id, UsersRequest usersRequest) {

        User user = usersMapper.toUsersDTO(usersRequest);
        usersRequest.setUser_id(user_id);

        var role = roleRepository.findAllById(usersRequest.getRoles());

        user.setRoles(new HashSet<>(role));
        User existingUser = userRepository.findById(user_id).orElseThrow(() -> new RuntimeException("User not found"));

        if (!usersRequest.getPassword().equals(existingUser.getPassword())) {
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
            user.setPassword(passwordEncoder.encode(usersRequest.getPassword()));
            System.out.println("New password encoded and set.");
        } else {
            user.setPassword(existingUser.getPassword());
            System.out.println("Existing password retained.");
        }
        return usersMapper.toUsers(userRepository.save(user));
    }

    public UsersResponse getInf() {
        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USERS_EMPTY));
        return usersMapper.toUsers(user);
    }

    @Override
    public List<UsersResponse> findAllByRole(Set<Roles> role) {
        var users = userRepository.findAllByRoles(role);
        return users.stream().map(usersMapper::toUsers).collect(Collectors.toList());
    }

    public UsersResponse getUserByEmail(String email) {
        return usersMapper.toUsers(userRepository.findUsersByEmail(email));
    }

    public UsersResponse updatePassByEmail(String email, String password) {
        if (!userRepository.existsByEmail(email)) {
            throw new RuntimeException("User not found");
        }
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode(password));
        return usersMapper.toUsers(userRepository.save(user));
    }
}
