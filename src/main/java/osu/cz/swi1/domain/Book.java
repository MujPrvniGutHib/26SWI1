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
    @Column(columnDefinition = "integer default 0")
    private int age;
    @Column(columnDefinition = "integer default 0")
    private int pages;
    private String format;
    @Column(columnDefinition = "double precision default 0.0")
    private double originalPrice;
    @Column(columnDefinition = "integer default 0")
    private int discountPercent;
    @Column(columnDefinition = "double precision default 0.0")
    private double rating;
    
    @Column(length = 2000)
    private String coverUrl;
    
    @Column(length = 2000)
    private String description;
    
    @Column(columnDefinition = "integer default 0")
    private int stock;

}
