package osu.cz.swi1.web.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileUpdateRequest {
    private String username;
    private String email;
    private String telephone;
    private String address;
}
