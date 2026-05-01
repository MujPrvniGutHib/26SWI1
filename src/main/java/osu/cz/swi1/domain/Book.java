package osu.cz.swi1.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    
    // New fields added to match frontend requirements
    private String category;
    private int age;
    private int pages;
    private String format;
    private double originalPrice;
    private int discountPercent;
    private double rating;
    
    @Column(length = 2000)
    private String coverUrl;
    
    @Column(length = 2000)
    private String description;
    
    private int stock;

}
