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
        if (bookRepository.count() == 0) {
            List<Book> books = Arrays.asList(
                // The Lord of the Rings
                createBook("The Lord of the Rings", "J.R.R. Tolkien", 29.99, "Fantasy", 12, 1178, "Hardcover book", 35.00, 14, "https://covers.openlibrary.org/b/isbn/9780618640157-L.jpg", "An epic high-fantasy novel.", 50),
                
                // The Hobbit
                createBook("The Hobbit", "J.R.R. Tolkien", 15.99, "Fantasy", 10, 310, "Paperback", 15.99, 0, "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg", "A children's fantasy novel.", 30),
                
                // 1984
                createBook("1984", "George Orwell", 12.50, "Science fiction", 14, 328, "E-book", 15.00, 16, "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg", "A dystopian social science fiction novel.", 100),
                
                // Pride and Prejudice
                createBook("Pride and Prejudice", "Jane Austen", 9.99, "Classics", 12, 432, "Hardcover book", 9.99, 0, "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg", "A romantic novel of manners.", 20),
                
                // To Kill a Mockingbird
                createBook("To Kill a Mockingbird", "Harper Lee", 14.99, "Classics", 14, 281, "Paperback", 14.99, 0, "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg", "A novel about the seriousness of racism.", 40),

                // The Witcher Series
                createBook("The Last Wish", "Andrzej Sapkowski", 18.99, "Fantasy", 16, 400, "Paperback", 18.99, 0, "https://covers.openlibrary.org/b/isbn/9780316029193-L.jpg", "The first book in The Witcher series.", 25),
                createBook("Sword of Destiny", "Andrzej Sapkowski", 18.99, "Fantasy", 16, 400, "Paperback", 18.99, 0, "https://covers.openlibrary.org/b/isbn/9780316389709-L.jpg", "The second book in The Witcher series.", 22),
                createBook("Blood of Elves", "Andrzej Sapkowski", 18.99, "Fantasy", 16, 400, "Paperback", 18.99, 0, "https://covers.openlibrary.org/b/isbn/9780316029186-L.jpg", "The third book in The Witcher series.", 20),
                createBook("Time of Contempt", "Andrzej Sapkowski", 18.99, "Fantasy", 16, 352, "Paperback", 18.99, 0, "https://covers.openlibrary.org/b/isbn/9780316219077-L.jpg", "The fourth book in The Witcher series.", 18),
                createBook("Baptism of Fire", "Andrzej Sapkowski", 18.99, "Fantasy", 16, 352, "Paperback", 18.99, 0, "https://covers.openlibrary.org/b/isbn/9780316273713-L.jpg", "The fifth book in The Witcher series.", 15),
                createBook("The Tower of the Swallow", "Andrzej Sapkowski", 18.99, "Fantasy", 16, 448, "Paperback", 18.99, 0, "https://covers.openlibrary.org/b/isbn/9780316273751-L.jpg", "The sixth book in The Witcher series.", 14),
                createBook("The Lady of the Lake", "Andrzej Sapkowski", 18.99, "Fantasy", 16, 544, "Paperback", 18.99, 0, "https://covers.openlibrary.org/b/isbn/9780316273836-L.jpg", "The seventh book in The Witcher series.", 12),
                createBook("Season of Storms", "Andrzej Sapkowski", 18.99, "Fantasy", 16, 400, "Paperback", 18.99, 0, "https://covers.openlibrary.org/b/isbn/9780316441639-L.jpg", "A standalone novel in The Witcher series.", 20),

                // The Hitchhiker's Guide to the Galaxy Series
                createBook("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 10.99, "Science fiction", 12, 224, "Paperback", 10.99, 0, "https://covers.openlibrary.org/b/isbn/9780345391803-L.jpg", "The first book in the trilogy.", 60),
                createBook("The Restaurant at the End of the Universe", "Douglas Adams", 10.99, "Science fiction", 12, 256, "Paperback", 10.99, 0, "https://covers.openlibrary.org/b/isbn/9780345391810-L.jpg", "The second book in the trilogy.", 55),
                createBook("Life, the Universe and Everything", "Douglas Adams", 10.99, "Science fiction", 12, 224, "Paperback", 10.99, 0, "https://covers.openlibrary.org/b/isbn/9780345391827-L.jpg", "The third book in the trilogy.", 50),
                createBook("So Long, and Thanks for All the Fish", "Douglas Adams", 10.99, "Science fiction", 12, 224, "Paperback", 10.99, 0, "https://covers.openlibrary.org/b/isbn/9780345391834-L.jpg", "The fourth book in the trilogy.", 45),
                createBook("Mostly Harmless", "Douglas Adams", 10.99, "Science fiction", 12, 224, "Paperback", 10.99, 0, "https://covers.openlibrary.org/b/isbn/9780345391858-L.jpg", "The fifth book in the trilogy.", 40),

                // A Song of Ice and Fire Series
                createBook("A Game of Thrones", "George R.R. Martin", 25.99, "Fantasy", 18, 694, "Hardcover book", 30.00, 13, "https://covers.openlibrary.org/b/isbn/9780553593716-L.jpg", "The first book in A Song of Ice and Fire.", 15),
                createBook("A Clash of Kings", "George R.R. Martin", 25.99, "Fantasy", 18, 768, "Hardcover book", 30.00, 13, "https://covers.openlibrary.org/b/isbn/9780553579901-L.jpg", "The second book in A Song of Ice and Fire.", 14),
                createBook("A Storm of Swords", "George R.R. Martin", 25.99, "Fantasy", 18, 973, "Hardcover book", 30.00, 13, "https://covers.openlibrary.org/b/isbn/9780553573428-L.jpg", "The third book in A Song of Ice and Fire.", 12),
                createBook("A Feast for Crows", "George R.R. Martin", 25.99, "Fantasy", 18, 753, "Hardcover book", 30.00, 13, "https://covers.openlibrary.org/b/isbn/9780553582024-L.jpg", "The fourth book in A Song of Ice and Fire.", 11),
                createBook("A Dance with Dragons", "George R.R. Martin", 25.99, "Fantasy", 18, 1056, "Hardcover book", 30.00, 13, "https://covers.openlibrary.org/b/isbn/9780553582017-L.jpg", "The fifth book in A Song of Ice and Fire.", 10),

                // Witch Hat Atelier Manga Series
                createBook("Witch Hat Atelier, Vol. 1", "Kamome Shirahama", 12.99, "Manga", 10, 208, "Paperback", 12.99, 0, "https://covers.openlibrary.org/b/isbn/9781632367592-L.jpg", "A charming manga about a girl who longs to be a witch.", 45),
                createBook("Witch Hat Atelier, Vol. 2", "Kamome Shirahama", 12.99, "Manga", 10, 208, "Paperback", 12.99, 0, "https://covers.openlibrary.org/b/isbn/9781632368148-L.jpg", "The adventure continues.", 40),
                createBook("Witch Hat Atelier, Vol. 3", "Kamome Shirahama", 12.99, "Manga", 10, 208, "Paperback", 12.99, 0, "https://covers.openlibrary.org/b/isbn/9781632369299-L.jpg", "The magic grows.", 38),
                createBook("Witch Hat Atelier, Vol. 4", "Kamome Shirahama", 12.99, "Manga", 10, 208, "Paperback", 12.99, 0, "https://covers.openlibrary.org/b/isbn/9781632369763-L.jpg", "New challenges arise.", 35),
                createBook("Witch Hat Atelier, Vol. 5", "Kamome Shirahama", 12.99, "Manga", 10, 208, "Paperback", 12.99, 0, "https://covers.openlibrary.org/b/isbn/9781646510039-L.jpg", "Coco's journey continues.", 33),
                createBook("Witch Hat Atelier, Vol. 6", "Kamome Shirahama", 12.99, "Manga", 10, 208, "Paperback", 12.99, 0, "https://covers.openlibrary.org/b/isbn/9781646511111-L.jpg", "Secrets are revealed.", 30),
                createBook("Witch Hat Atelier, Vol. 7", "Kamome Shirahama", 12.99, "Manga", 10, 208, "Paperback", 12.99, 0, "https://covers.openlibrary.org/b/isbn/9781646512620-L.jpg", "A new test awaits.", 28),
                createBook("Witch Hat Atelier, Vol. 8", "Kamome Shirahama", 12.99, "Manga", 10, 208, "Paperback", 12.99, 0, "https://covers.openlibrary.org/b/isbn/9781646513009-L.jpg", "The witches' world expands.", 25),
                createBook("Witch Hat Atelier, Vol. 9", "Kamome Shirahama", 12.99, "Manga", 10, 208, "Paperback", 12.99, 0, "https://covers.openlibrary.org/b/isbn/9781646514990-L.jpg", "A difficult choice.", 22),
                createBook("Witch Hat Atelier, Vol. 10", "Kamome Shirahama", 12.99, "Manga", 10, 208, "Paperback", 12.99, 0, "https://covers.openlibrary.org/b/isbn/9781646516017-L.jpg", "The story deepens.", 20),
                createBook("Witch Hat Atelier, Vol. 11", "Kamome Shirahama", 12.99, "Manga", 10, 208, "Paperback", 12.99, 0, "https://covers.openlibrary.org/b/isbn/9781646517861-L.jpg", "New friends and foes.", 18),
                createBook("Witch Hat Atelier, Vol. 12", "Kamome Shirahama", 12.99, "Manga", 10, 208, "Paperback", 12.99, 0, "https://covers.openlibrary.org/b/isbn/9781646519926-L.jpg", "The final test begins.", 15),

                // Dandadan Manga Series
                createBook("Dandadan, Vol. 1", "Yukinobu Tatsu", 9.99, "Manga", 16, 200, "Paperback", 9.99, 0, "https://covers.openlibrary.org/b/isbn/197473450X-L.jpg", "A wild manga that blends sci-fi and the occult.", 35),
                createBook("Dandadan, Vol. 2", "Yukinobu Tatsu", 9.99, "Manga", 16, 200, "Paperback", 9.99, 0, "https://covers.openlibrary.org/b/isbn/1974736363-L.jpg", "The bizarre adventures continue.", 33),
                createBook("Dandadan, Vol. 3", "Yukinobu Tatsu", 9.99, "Manga", 16, 200, "Paperback", 9.99, 0, "https://covers.openlibrary.org/b/isbn/197473848X-L.jpg", "More supernatural chaos.", 30),
                createBook("Dandadan, Vol. 4", "Yukinobu Tatsu", 9.99, "Manga", 16, 200, "Paperback", 9.99, 0, "https://covers.openlibrary.org/b/isbn/1974740689-L.jpg", "The stakes get higher.", 28),
                
                // Other popular books
                createBook("Dune", "Frank Herbert", 22.99, "Science fiction", 14, 412, "Paperback", 25.00, 8, "https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg", "A landmark of science fiction.", 40),
                createBook("The Name of the Wind", "Patrick Rothfuss", 21.99, "Fantasy", 16, 662, "Paperback", 21.99, 0, "https://covers.openlibrary.org/b/isbn/9780756404741-L.jpg", "The first book in The Kingkiller Chronicle.", 30),
                createBook("Project Hail Mary", "Andy Weir", 24.99, "Science fiction", 14, 496, "Hardcover book", 28.00, 11, "https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg", "A lone astronaut must save the earth.", 50),
                createBook("The Martian", "Andy Weir", 15.99, "Science fiction", 14, 384, "Paperback", 15.99, 0, "https://covers.openlibrary.org/b/isbn/9780804139021-L.jpg", "An astronaut's struggle for survival on Mars.", 60),
                createBook("The Silent Patient", "Alex Michaelides", 14.99, "Thriller", 16, 336, "Paperback", 14.99, 0, "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg", "A psychological thriller.", 70),
                createBook("The Song of Achilles", "Madeline Miller", 16.99, "Historical fiction", 16, 416, "Paperback", 16.99, 0, "https://covers.openlibrary.org/b/isbn/9780062060624-L.jpg", "A retelling of the Trojan War.", 40),
                createBook("Circe", "Madeline Miller", 16.99, "Historical fiction", 16, 393, "Paperback", 16.99, 0, "https://covers.openlibrary.org/b/isbn/9780316556347-L.jpg", "A feminist retelling of the Greek myth.", 45),
                createBook("The Seven Husbands of Evelyn Hugo", "Taylor Jenkins Reid", 17.00, "Romance", 16, 389, "Paperback", 17.00, 0, "https://covers.openlibrary.org/b/isbn/9781501161933-L.jpg", "A fictional biography of a Hollywood star.", 50),
                createBook("Where the Crawdads Sing", "Delia Owens", 18.00, "Mystery", 16, 384, "Paperback", 18.00, 0, "https://covers.openlibrary.org/b/isbn/9780735219090-L.jpg", "A coming-of-age story and a murder mystery.", 60),
                createBook("The Da Vinci Code", "Dan Brown", 15.99, "Crime", 16, 489, "Paperback", 15.99, 0, "https://covers.openlibrary.org/b/isbn/9780307474278-L.jpg", "A thriller that follows a symbologist.", 80),
                createBook("Treasure Island", "Robert Louis Stevenson", 12.99, "Adventure stories", 10, 311, "Paperback", 12.99, 0, "https://covers.openlibrary.org/b/isbn/9780141321004-L.jpg", "A classic adventure novel.", 50),
                createBook("The Adventures of Tom Sawyer", "Mark Twain", 10.99, "Adventure stories", 8, 224, "Paperback", 10.99, 0, "https://covers.openlibrary.org/b/isbn/9780143039563-L.jpg", "A classic adventure novel.", 60),
                createBook("The Brothers Karamazov", "Fyodor Dostoevsky", 19.99, "Literary fiction", 18, 824, "Paperback", 19.99, 0, "https://covers.openlibrary.org/b/isbn/9780374528379-L.jpg", "A passionate philosophical novel.", 30),
                createBook("The Little Prince", "Antoine de Saint-Exupéry", 9.99, "Fairy tales", 6, 96, "Hardcover book", 9.99, 0, "https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg", "A poetic tale for all ages.", 100),
                createBook("The Raven", "Edgar Allan Poe", 7.99, "Poetry", 12, 64, "Paperback", 7.99, 0, "https://covers.openlibrary.org/b/isbn/9781981073124-L.jpg", "A narrative poem by American writer Edgar Allan Poe.", 50),
                createBook("Hamlet", "William Shakespeare", 8.99, "Plays", 14, 342, "Paperback", 8.99, 0, "https://covers.openlibrary.org/b/isbn/9780743477123-L.jpg", "A tragedy by William Shakespeare.", 40),
                createBook("The Diary of a Young Girl", "Anne Frank", 11.99, "Autobiography and memoir", 12, 283, "Paperback", 11.99, 0, "https://covers.openlibrary.org/b/isbn/9780553296983-L.jpg", "The writings from the diary of Anne Frank.", 70),
                createBook("The Shining", "Stephen King", 17.99, "Horror", 18, 447, "Paperback", 17.99, 0, "https://covers.openlibrary.org/b/isbn/9780385121675-L.jpg", "A horror novel by American writer Stephen King.", 30),
                createBook("Catch-22", "Joseph Heller", 16.99, "Humour and satire", 16, 453, "Paperback", 16.99, 0, "https://covers.openlibrary.org/b/isbn/9781451626650-L.jpg", "A satirical novel by American author Joseph Heller.", 25),
                createBook("Dubliners", "James Joyce", 14.99, "Short stories", 16, 224, "Paperback", 14.99, 0, "https://covers.openlibrary.org/b/isbn/9780141182452-L.jpg", "A collection of 15 short stories by James Joyce.", 20),
                createBook("All Quiet on the Western Front", "Erich Maria Remarque", 15.99, "War", 16, 296, "Paperback", 15.99, 0, "https://covers.openlibrary.org/b/isbn/9780449213940-L.jpg", "A novel on the horrors of war.", 35),
                createBook("Little Women", "Louisa May Alcott", 12.99, "Women’s fiction", 10, 759, "Paperback", 12.99, 0, "https://covers.openlibrary.org/b/isbn/9780147514011-L.jpg", "A novel following the lives of the four March sisters.", 40),
                createBook("The Hunger Games", "Suzanne Collins", 14.99, "Young adult", 12, 374, "Paperback", 14.99, 0, "https://covers.openlibrary.org/b/isbn/9780439023528-L.jpg", "A dystopian novel for young adults.", 50),
                createBook("Steve Jobs", "Walter Isaacson", 24.99, "Biography", 14, 656, "Hardcover book", 24.99, 0, "https://covers.openlibrary.org/b/isbn/9781451648539-L.jpg", "The authorized biography of Steve Jobs.", 20)
            );

            bookRepository.saveAll(books);
            System.out.println("Books seeded.");
        }
    }

    private Book createBook(String title, String author, double price, String category, int age, int pages, String format, double originalPrice, int discountPercent, String coverUrl, String description, int stock) {
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
        book.setCoverUrl(coverUrl);
        book.setDescription(description);
        book.setStock(stock);
        return book;
    }
}
