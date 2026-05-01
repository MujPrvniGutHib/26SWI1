package osu.cz.swi1.web;

import osu.cz.swi1.domain.Book;
import osu.cz.swi1.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "*") // Allows your frontend to communicate with this backend
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Book> getAllBooks(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "title") String sort,
            @RequestParam(defaultValue = "asc") String order
    ) {
        Sort.Direction direction = "asc".equalsIgnoreCase(order) ? Sort.Direction.ASC : Sort.Direction.DESC;
        Sort sortBy = Sort.by(direction, sort);

        Specification<Book> spec = (root, query, cb) -> {
            if (search == null || search.isEmpty()) {
                return cb.conjunction();
            }
            String searchTerm = "%" + search.toLowerCase() + "%";
            return cb.or(
                cb.like(cb.lower(root.get("title")), searchTerm),
                cb.like(cb.lower(root.get("author")), searchTerm)
            );
        };

        return bookService.getAllBooks(spec, sortBy);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        return bookService.getBookById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Book createBook(@RequestBody Book book) {
        return bookService.saveBook(book);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        return bookService.getBookById(id)
                .map(book -> {
                    book.setTitle(bookDetails.getTitle());
                    book.setAuthor(bookDetails.getAuthor());
                    book.setPrice(bookDetails.getPrice());
                    return ResponseEntity.ok(bookService.saveBook(book));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        return bookService.getBookById(id)
                .map(book -> {
                    bookService.deleteBook(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
