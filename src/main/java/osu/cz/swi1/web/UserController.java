package osu.cz.swi1.web;

import osu.cz.swi1.domain.User;
import osu.cz.swi1.repository.UserRepository;
import osu.cz.swi1.security.UserDetailsImpl;
import osu.cz.swi1.web.dto.MessageResponse;
import osu.cz.swi1.web.dto.ProfileUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            @RequestBody ProfileUpdateRequest request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseGet(() -> userRepository.findByUsername(userDetails.getUsername())
                        .orElseThrow(() -> new RuntimeException("User not found")));

        // Optional: Ensure the new email isn't already taken by another user
        if (!user.getEmail().equals(request.getEmail()) && userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setTelephone(request.getTelephone());
        user.setAddress(request.getAddress());

        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Profile updated successfully"));
    }
}
