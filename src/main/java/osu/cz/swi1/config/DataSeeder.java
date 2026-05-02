package osu.cz.swi1.config;

import osu.cz.swi1.domain.Book;
import osu.cz.swi1.domain.Role;
import osu.cz.swi1.repository.BookRepository;
import osu.cz.swi1.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

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
        bookRepository.deleteAll();

        List<Book> books = Arrays.asList(
            // Existing Books
            createBook("The Lord of the Rings", "J.R.R. Tolkien", 29.99, "Fantasy", 12, 1178, "Hardcover book", 35.00, 14, 4.9, "https://covers.openlibrary.org/b/isbn/9780618640157-L.jpg", "An epic high-fantasy novel.", 50),
            createBook("The Hobbit", "J.R.R. Tolkien", 15.99, "Fantasy", 10, 310, "Paperback", 15.99, 0, 4.8, "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg", "A children's fantasy novel.", 30),
            createBook("1984", "George Orwell", 12.50, "Science fiction", 14, 328, "E-book", 15.00, 16, 4.7, "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg", "A dystopian social science fiction novel.", 100),
            createBook("Pride and Prejudice", "Jane Austen", 9.99, "Classics", 12, 432, "Hardcover book", 9.99, 0, 4.6, "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg", "A romantic novel of manners.", 20),
            createBook("To Kill a Mockingbird", "Harper Lee", 14.99, "Classics", 14, 281, "Paperback", 14.99, 0, 4.8, "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg", "A novel about the seriousness of racism.", 40),
            createBook("The Last Wish", "Andrzej Sapkowski", 18.99, "Fantasy", 16, 400, "Paperback", 18.99, 0, 4.7, "https://covers.openlibrary.org/b/isbn/9780316029193-L.jpg", "The first book in The Witcher series.", 25),
            createBook("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 10.99, "Science fiction", 12, 224, "Paperback", 10.99, 0, 4.6, "https://covers.openlibrary.org/b/isbn/9780345391803-L.jpg", "The first book in the trilogy.", 60),
            createBook("A Game of Thrones", "George R.R. Martin", 25.99, "Fantasy", 18, 694, "Hardcover book", 30.00, 13, 4.8, "https://covers.openlibrary.org/b/isbn/9780553593716-L.jpg", "The first book in A Song of Ice and Fire.", 15),
            createBook("Witch Hat Atelier, Vol. 1", "Kamome Shirahama", 12.99, "Manga", 10, 208, "Paperback", 12.99, 0, 4.9, "https://dw9to29mmj727.cloudfront.net/products/9781632367592.jpg", "A charming manga about a girl who longs to be a witch.", 45),
            createBook("Dandadan, Vol. 1", "Yukinobu Tatsu", 9.99, "Manga", 16, 200, "Paperback", 9.99, 0, 4.7, "https://dw9to29mmj727.cloudfront.net/products/197473450X.jpg", "A wild manga that blends sci-fi and the occult.", 35),
            createBook("The Da Vinci Code", "Dan Brown", 15.99, "Crime", 16, 489, "Paperback", 15.99, 0, 4.6, "https://covers.openlibrary.org/b/isbn/9780307474278-L.jpg", "A thriller that follows a symbologist.", 80),
            createBook("Treasure Island", "Robert Louis Stevenson", 12.99, "Adventure stories", 10, 311, "Paperback", 12.99, 0, 4.7, "https://covers.openlibrary.org/b/isbn/9780141321004-L.jpg", "A classic adventure novel.", 50),
            createBook("The Little Prince", "Antoine de Saint-Exupéry", 9.99, "Fairy tales", 6, 96, "Hardcover book", 9.99, 0, 4.8, "https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg", "A poetic tale for all ages.", 100),
            createBook("The Raven", "Edgar Allan Poe", 7.99, "Poetry", 12, 64, "Paperback", 7.99, 0, 4.7, "https://covers.openlibrary.org/b/isbn/9781981073124-L.jpg", "A narrative poem by American writer Edgar Allan Poe.", 50),
            createBook("Hamlet", "William Shakespeare", 8.99, "Plays", 14, 342, "Paperback", 8.99, 0, 4.8, "https://covers.openlibrary.org/b/isbn/9780743477123-L.jpg", "A tragedy by William Shakespeare.", 40),
            createBook("The Diary of a Young Girl", "Anne Frank", 11.99, "Autobiography and memoir", 12, 283, "Paperback", 11.99, 0, 4.9, "https://covers.openlibrary.org/b/isbn/9780553296983-L.jpg", "The writings from the diary of Anne Frank.", 70),
            
            // New books for missing genres
            createBook("The Shining", "Stephen King", 17.99, "Horror", 18, 447, "Paperback", 17.99, 0, 4.7, "https://covers.openlibrary.org/b/isbn/9780385121675-L.jpg", "A horror novel by American writer Stephen King.", 30),
            createBook("Catch-22", "Joseph Heller", 16.99, "Humour and satire", 16, 453, "Paperback", 16.99, 0, 4.6, "https://covers.openlibrary.org/b/isbn/9781451626650-L.jpg", "A satirical novel by American author Joseph Heller.", 25),
            createBook("Dubliners", "James Joyce", 14.99, "Short stories", 16, 224, "Paperback", 14.99, 0, 4.5, "https://covers.openlibrary.org/b/isbn/9780141182452-L.jpg", "A collection of 15 short stories by James Joyce.", 20),
            createBook("All Quiet on the Western Front", "Erich Maria Remarque", 15.99, "War", 16, 296, "Paperback", 15.99, 0, 4.8, "https://covers.openlibrary.org/b/isbn/9780449213940-L.jpg", "A novel on the horrors of war.", 35),
            createBook("Little Women", "Louisa May Alcott", 12.99, "Women’s fiction", 10, 759, "Paperback", 12.99, 0, 4.8, "https://covers.openlibrary.org/b/isbn/9780147514011-L.jpg", "A novel following the lives of the four March sisters.", 40),
            createBook("The Hunger Games", "Suzanne Collins", 14.99, "Young adult", 12, 374, "Paperback", 14.99, 0, 4.7, "https://covers.openlibrary.org/b/isbn/9780439023528-L.jpg", "A dystopian novel for young adults.", 50),
            createBook("Steve Jobs", "Walter Isaacson", 24.99, "Biography", 14, 656, "Hardcover book", 24.99, 0, 4.8, "https://covers.openlibrary.org/b/isbn/9781451648539-L.jpg", "The authorized biography of Steve Jobs.", 20)
        );

        bookRepository.saveAll(books);
        System.out.println("Books seeded.");
    }

    private Book createBook(String title, String author, double price, String category, int age, int pages, String format, double originalPrice, int discountPercent, double rating, String coverUrl, String description, int stock) {
        Book book = new Book();
        book.setTitle(title);
        book.setAuthor(author);
        book.setPrice(price);
        book.setCategory(category);
        book.setAge(age);
        book.setPages(pages);
        book.setFormat(format);
        book.setOriginalPrice(originalPrice);
        book.setDiscountPercent(discountPercent);
        book.setRating(rating);
        book.setCoverUrl(coverUrl);
        book.setDescription(description);
        book.setStock(stock);
        return book;
    }
}
