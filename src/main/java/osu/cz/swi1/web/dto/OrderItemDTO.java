package osu.cz.swi1.web.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemDTO {
    private Long bookId;
    private Integer quantity;
}
