package osu.cz.swi1.config;

import osu.cz.swi1.domain.Book;
import osu.cz.swi1.domain.Role;
import osu.cz.swi1.repository.BookRepository;
import osu.cz.swi1.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BookRepository bookRepository;

    @Override
    public void run(String... args) throws Exception {
        seedRoles();
        seedBooks();
    }

    private void seedRoles() {
        if (roleRepository.count() == 0) {
            Role userRole = new Role();
            userRole.setName("ROLE_USER");

            Role adminRole = new Role();
            adminRole.setName("ROLE_ADMIN");

            roleRepository.saveAll(Arrays.asList(userRole, adminRole));
            System.out.println("Roles seeded.");
        }
    }

    private void seedBooks() {
        if (bookRepository.count() == 0) {
            Book book1 = new Book();
            book1.setTitle("The Lord of the Rings");
            book1.setAuthor("J.R.R. Tolkien");
            book1.setPrice(29.99);
            book1.setCategory("Fantasy");
            book1.setAge(12);
            book1.setPages(1178);
            book1.setFormat("Hardcover book");
            book1.setOriginalPrice(35.00);
            book1.setDiscountPercent(14);
            book1.setRating(4.9);
            book1.setCoverUrl("https://images.unsplash.com/photo-1629196914275-c96faeb21192?q=80&w=1287&auto=format&fit=crop");
            book1.setDescription("An epic high-fantasy novel following the quest to destroy the One Ring.");
            book1.setStock(50);

            Book book2 = new Book();
            book2.setTitle("The Hobbit");
            book2.setAuthor("J.R.R. Tolkien");
            book2.setPrice(15.99);
            book2.setCategory("Fantasy");
            book2.setAge(10);
            book2.setPages(310);
            book2.setFormat("Paperback");
            book2.setOriginalPrice(15.99);
            book2.setDiscountPercent(0);
            book2.setRating(4.8);
            book2.setCoverUrl("https://images.unsplash.com/photo-1629196914275-c96faeb21192?q=80&w=1287&auto=format&fit=crop");
            book2.setDescription("A children's fantasy novel following the quest of home-loving hobbit Bilbo Baggins.");
            book2.setStock(30);

            Book book3 = new Book();
            book3.setTitle("1984");
            book3.setAuthor("George Orwell");
            book3.setPrice(12.50);
            book3.setCategory("Science fiction");
            book3.setAge(14);
            book3.setPages(328);
            book3.setFormat("E-book");
            book3.setOriginalPrice(15.00);
            book3.setDiscountPercent(16);
            book3.setRating(4.7);
            book3.setCoverUrl("https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1287&auto=format&fit=crop");
            book3.setDescription("A dystopian social science fiction novel and cautionary tale.");
            book3.setStock(100);

            Book book4 = new Book();
            book4.setTitle("Pride and Prejudice");
            book4.setAuthor("Jane Austen");
            book4.setPrice(9.99);
            book4.setCategory("Classics");
            book4.setAge(12);
            book4.setPages(432);
            book4.setFormat("Hardcover book");
            book4.setOriginalPrice(9.99);
            book4.setDiscountPercent(0);
            book4.setRating(4.6);
            book4.setCoverUrl("https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1287&auto=format&fit=crop");
            book4.setDescription("A romantic novel of manners following the character development of Elizabeth Bennet.");
            book4.setStock(20);

            bookRepository.saveAll(Arrays.asList(book1, book2, book3, book4));
            System.out.println("Books seeded.");
        }
    }
}
