package osu.cz.swi1.web.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderDTO {
    private List<OrderItemDTO> items;
    private Double totalPrice;
    private String deliveryMethod;
    private String shippingAddress;
    private String billingAddress;
}
