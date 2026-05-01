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

            Book book2 = new Book();
            book2.setTitle("The Hobbit");
            book2.setAuthor("J.R.R. Tolkien");
            book2.setPrice(15.99);

            Book book3 = new Book();
            book3.setTitle("1984");
            book3.setAuthor("George Orwell");
            book3.setPrice(12.50);

            Book book4 = new Book();
            book4.setTitle("Pride and Prejudice");
            book4.setAuthor("Jane Austen");
            book4.setPrice(9.99);

            bookRepository.saveAll(Arrays.asList(book1, book2, book3, book4));
            System.out.println("Books seeded.");
        }
    }
}
