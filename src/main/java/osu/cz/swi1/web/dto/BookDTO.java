package osu.cz.swi1.web.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookDTO {
    private Long id;
    private String title;
    private String author;
    private double price;
    private String category;
    private int age;
    private int pages;
    private String format;
    private double originalPrice;
    private int discountPercent;
    private double rating;
    private String coverUrl;
    private String description;
    private int stock;
}
