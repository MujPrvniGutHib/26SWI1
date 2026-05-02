package osu.cz.swi1.service;

import osu.cz.swi1.domain.Book;
import osu.cz.swi1.domain.Order;
import osu.cz.swi1.domain.OrderItem;
import osu.cz.swi1.domain.User;
import osu.cz.swi1.repository.BookRepository;
import osu.cz.swi1.repository.OrderRepository;
import osu.cz.swi1.repository.UserRepository;
import osu.cz.swi1.web.dto.OrderDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Transactional
    public Order createOrder(OrderDTO orderDTO, String userIdentifier) {
        User user = userRepository.findByEmail(userIdentifier)
                .orElseGet(() -> userRepository.findByUsername(userIdentifier)
                        .orElseThrow(() -> new RuntimeException("User not found")));

        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("Preparing");
        order.setTotalPrice(orderDTO.getTotalPrice());
        order.setDeliveryMethod(orderDTO.getDeliveryMethod());
        order.setShippingAddress(orderDTO.getShippingAddress());
        order.setBillingAddress(orderDTO.getBillingAddress());

        List<OrderItem> items = orderDTO.getItems().stream().map(itemDTO -> {
            Book book = bookRepository.findById(itemDTO.getBookId())
                    .orElseThrow(() -> new RuntimeException("Book not found"));
            OrderItem orderItem = new OrderItem();
            orderItem.setBook(book);
            orderItem.setQuantity(itemDTO.getQuantity());
            orderItem.setPrice(book.getPrice());
            orderItem.setOrder(order);
            return orderItem;
        }).collect(Collectors.toList());

        order.setItems(items);
        return orderRepository.save(order);
    }
}
