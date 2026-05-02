package osu.cz.swi1.web.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private String telephone;
    private String address;
    private List<String> roles;

    public JwtResponse(String accessToken, Long id, String username, String email, String telephone, String address, List<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.telephone = telephone;
        this.address = address;
        this.roles = roles;
    }
}
