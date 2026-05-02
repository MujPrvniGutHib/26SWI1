package osu.cz.swi1.web;

import osu.cz.swi1.domain.Order;
import osu.cz.swi1.domain.User;
import osu.cz.swi1.repository.UserRepository;
import osu.cz.swi1.service.OrderService;
import osu.cz.swi1.web.dto.OrderDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderDTO orderDTO, @AuthenticationPrincipal UserDetails userDetails) {
        Order order = orderService.createOrder(orderDTO, userDetails.getUsername());
        return ResponseEntity.ok(order);
    }

    @GetMapping
    public ResponseEntity<List<Order>> getOrders(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseGet(() -> userRepository.findByUsername(userDetails.getUsername())
                        .orElseThrow(() -> new RuntimeException("User not found")));
        return ResponseEntity.ok(user.getOrders());
    }
}
