package org.galaxy.backend.Service;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;

@Service
public class ResetPasswordService {

    private final ConcurrentHashMap<String, String> cache = new ConcurrentHashMap<>();
    private final long TOKEN_EXPIRATION_TIME = TimeUnit.MINUTES.toSeconds(120);

    public void storeResetKey(String email, String reset_key) {
        cache.put(email, reset_key);
    }

    public String getResetKey(String email) {
        return cache.get(email);
    }

    public void removeResetKey(String email) {
        cache.remove(email);
    }
}
