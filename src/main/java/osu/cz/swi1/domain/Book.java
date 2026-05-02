package osu.cz.swi1.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    private double price;
    
    private String category;
    @Column(columnDefinition = "integer default 0")
    private int age;
    @Column(columnDefinition = "integer default 0")
    private int pages;
    private String format;
    @Column(columnDefinition = "double precision default 0.0")
    private double originalPrice;
    @Column(columnDefinition = "integer default 0")
    private int discountPercent;
    
    @Column(length = 2000)
    private String coverUrl;
    
    @Column(length = 2000)
    private String description;
    
    @Column(columnDefinition = "integer default 0")
    private int stock;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "book-review")
    private List<Review> reviews;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "book-orderItem")
    private List<OrderItem> orderItems;
}
