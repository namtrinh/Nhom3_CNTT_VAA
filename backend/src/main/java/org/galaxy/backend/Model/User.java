package org.galaxy.backend.Model;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Set;

import jakarta.persistence.*;

import org.galaxy.backend.Model.Permission.Roles;
import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;


@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id")
    private String user_id;

    private String username;

    private String password;

    private String email;

    private String address;

    private Boolean activated;

    private String verificationCode;

    private LocalDateTime verificationCodeExpiry;

    private int requestCount;

    private LocalDateTime lastRequestTime;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp time_created;

    @ManyToMany
    @JsonIgnore
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "users_user_id"),
            inverseJoinColumns = @JoinColumn(name = "roles_name"))
    private Set<Roles> roles;

    private String statusAccount;
}
