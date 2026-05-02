package osu.cz.swi1.web;

import osu.cz.swi1.domain.Book;
import osu.cz.swi1.domain.Review;
import osu.cz.swi1.repository.BookRepository;
import osu.cz.swi1.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/books/{bookId}/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private BookRepository bookRepository;

    @GetMapping
    public List<Review> getReviewsByBookId(@PathVariable("bookId") Long bookId) {
        List<Review> reviews = reviewRepository.findByBookId(bookId);
        return reviews != null ? reviews : Collections.emptyList();
    }

    @PostMapping
    public ResponseEntity<Review> createReview(@PathVariable("bookId") Long bookId, @RequestBody Review review) {
        Book book = bookRepository.findById(bookId).orElse(null);
        if (book == null) {
            return ResponseEntity.badRequest().build();
        }
        review.setBook(book);
        return ResponseEntity.ok(reviewRepository.save(review));
    }
}
