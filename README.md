# Dokumentace projektu „Knihkupectví“

**Název projektu:** Online knihkupectví  
**Předmět:** SWI1  
**Rok:** 2026


## O čem je tento projekt

Jedná se o online knihkupectví, kde si uživatelé mohou prohlížet knihy, přidávat je do košíku a nakupovat je. Aplikace má frontend vytvořený v Reactu a backend v Javě Spring Boot. Data jsou uložena v databázi PostgreSQL.


## Použité technologie
**Frontend**
- React 18 s TypeScriptem
- Vite (pro spouštění a sestavování aplikace)
- React Router (pro navigaci mezi stránkami)
**Backend**
- Java se Spring Bootem
- Spring Security s JWT pro přihlášení
- Spring Data JPA pro přístup k databázi
**Databáze**
- PostgreSQL

## Jak spustit projekt
1. Spusťte PostgreSQL a ujistěte se, že existuje databáze s názvem `postgres`
2. Spusťte backend Spring Boot (spouští se na portu 8080)
3. Spusťte frontend pomocí `npm run dev` (spouští se na portu 5173)
4. Otevřete v prohlížeči `http://localhost:5173`


## Co aplikace umí

**Host (není přihlášen)**
- Procházet všechny knihy
- Vyhledávat knihy podle názvu nebo autora
- Filtrovat knihy podle kategorie
- Zobrazit stránku s podrobnostmi o knize včetně popisu a recenzí
- Zaregistrovat nový účet
- Přihlásit se

**Registrovaný uživatel**
- Vše, co může dělat host
- Přidat knihy do košíku
- Zadat objednávku (zadat adresu, vybrat způsob doručení)
- Zobrazit historii objednávek
- Napsat recenzi na knihu
- Upravit profil (jméno, telefon, adresa)

**Správce**
- Přidávat nové knihy
- Upravovat existující knihy
- Mazat knihy


## Struktura projektu

Backend je rozdělen do několika balíčků:

- `config` - spouští se při startu aplikace, naplní databázi výchozími daty
- `domain` – hlavní datové třídy jako Book, User, Order, Review
- `repository` – slouží ke čtení a zápisu dat do databáze
- `service` – obchodní logika (vytváření objednávek, získávání knih atd.)
- `security` – zpracovává přihlášení, JWT tokeny a řízení přístupu
- `web` – řadiče REST API, které volá frontend

Frontend je strukturován kolem stránek (HomePage, CatalogPage, CartPage, CheckoutPage, ProfilePage) a dvou globálních kontextů – jednoho pro přihlášeného uživatele a druhého pro košík.

## Databáze

Databáze obsahuje tyto hlavní tabulky:

| Tabulka | Co obsahuje |
|-------|---------------|
| users | registrovaní uživatelé |
| roles | role uživatelů (ROLE_USER, ROLE_ADMIN) |
| book | všechny knihy v obchodě |
| orders | objednávky zadané uživateli |
| order_items | jednotlivé knihy v rámci objednávky |
| review | recenze knih napsané uživateli |


## Zabezpečení

Přihlášení funguje pomocí JWT tokenů. Když se uživatel přihlásí, obdrží od serveru token. Frontend tento token uloží do localStorage a odesílá jej s každým požadavkem v hlavičce `Authorization`. Backend kontroluje token při každém požadavku a pokud není platný, je požadavek odmítnut s chybou 401.

Hesla nejsou nikdy ukládána jako prostý text, jsou hašována pomocí BCrypt.





# SWOT ANALÝZA

## Silné stránky

- Aplikace využívá moderní technologie, jako jsou React a Spring Boot, které jsou populární a dobře zdokumentované.
- Uživatelé se mohou registrovat a přihlašovat.
- Knihy jsou rozděleny do kategorií, takže je snazší najít to, co hledáte.
- Aplikace obsahuje stránku se slevami, což je pro zákazníky výhodné.
- Aplikace obsahuje základní funkce internetového knihkupectví, například katalog knih, detail knihy, košík, objednávky, slevy a recenze.
- Backend má přehlednou strukturu rozdělenou na controllery, services, repositories, DTO a domain modely.
- Projekt obsahuje vícejazyčnou podporu pomocí překladového souboru.

## Slabé stránky

- Neexistuje skutečný platební systém, uživatel může dokončit objednávku, ale nedochází k žádnému zpracování peněz.
- Aplikace byla testována pouze lokálně, v kódu nejsou napsány žádné testy.
- Heslo k databázi je napsáno přímo v konfiguračním souboru, což není bezpečné.
- Projekt zatím nemá dostatečné automatické testy.

## Příležitosti

- Mohlo by být přidáno skutečné platební rozhraní, jako je PayPal nebo platba kreditní kartou.
- Mohlo by být nasazeno na internet, aby jej mohli používat skuteční uživatelé.
- Mohla by být vytvořena mobilní aplikace, protože backendové API již existuje.
- Mohly by být přidány e-mailové notifikace při zadání objednávky.
- Systém doporučení na základě toho, co uživatel koupil dříve.
- Lze doplnit administrátorské rozhraní pro správu knih, objednávek, uživatelů a slev.
- Vyhledávání a filtrování knih lze dále vylepšit například stránkováním, řazením a pokročilými filtry.

## Hrozby

- Velcí konkurenti, jako je Amazon, již prodávají knihy online a mají mnohem více funkcí.
- Bezpečnostní problémy – mohlo by dojít k úniku JWT klíče.
- Pokud bude aplikaci používat mnoho uživatelů současně, může být pomalá, protože není k dispozici ukládání do mezipaměti.
- Bezpečnostní problémy mohou vzniknout kvůli špatně chráněným API endpointům, JWT tokenům nebo přihlašovacím údajům.
- Zastarání nebo nekompatibilita knihoven může v budoucnu způsobit technické problémy.


# Podnikový proces v EPC nebo BPMN

```mermaid
flowchart TD
    A([Customer opens website]) --> B[Browse books]
    B --> C[Find a book they like]
    C --> D[Add to cart]
    D --> E{Want more books?}
    E -- Yes --> B
    E -- No --> F[Go to cart]
    F --> G{Is user logged in?}
    G -- No --> H[Login or Register?]
    H -- No --> J
    H -- Yes --> I{Login successful?}

    I -- Yes --> J[Fill in address]
    G -- Yes --> J
    J --> K[Choose delivery method]
    K --> L[Place order]
    L --> M{Is book in stock?}
    M -- No --> N[Show error]
    N --> F
    M -- Yes --> O[Order saved]
    O --> P([Done])
```

# Use Case diagram

```mermaid
flowchart LR
    Guest(["Guest"])
    User(["Registered User"])
    Admin(["Admin"])

    UC1([Browse / Search books])
    UC2([View book detail])
    UC3([Add to cart])
    UC4([Register / Login])
    UC5([Checkout])
    UC6([View orders])
    UC7([Write a review])
    UC8([Manage books])

    Guest --> UC1
    Guest --> UC2
    Guest --> UC3
    Guest --> UC4

    User --> UC1
    User --> UC2
    User --> UC3
    User --> UC5
    User --> UC6
    User --> UC7

    Admin --> UC1
    Admin --> UC8
```

# Diagram architektury

```mermaid
graph TD
    User[User / Browser]

    subgraph Frontend[Frontend - React + Vite + TypeScript]
        UI[Pages and Components]
        Router[React Router]
        AuthContext[Auth Context]
        CartContext[Cart Context]
        I18n[Translations / i18n]
        API[Axios API Client]
    end

    subgraph Backend[Backend - Spring Boot]
        Controllers[REST Controllers]
        Security[Spring Security + JWT]
        Services[Service Layer]
        Repositories[JPA Repositories]
        DTOs[DTOs]
        Domain[Domain Entities]
    end

    subgraph Database[Database]
        PostgreSQL[(PostgreSQL)]
    end

    User --> UI
    UI --> Router
    UI --> AuthContext
    UI --> CartContext
    UI --> I18n
    UI --> API

    API -->|HTTP / JSON requests| Controllers
    API -->|JWT Bearer token| Security

    Security --> Controllers
    Controllers --> DTOs
    Controllers --> Services
    Services --> Repositories
    Services --> Domain
    Repositories --> PostgreSQL

```

# Sekvenční diagramy (analytický a návrhový)

### Registrace

```mermaid
sequenceDiagram
    actor User
    participant Website

    User->>Website: Open register page
    Website-->>User: Show form
    User->>Website: Fill in name, email, password
    Website->>Website: Check if email is already used
    alt Email already exists
        Website-->>User: Show error
    else Email is free
        Website->>Website: Create account
        Website-->>User: Registration successful
    end
```

### Eshop

```mermaid
sequenceDiagram
    actor User
    participant Frontend as React Frontend
    participant Auth as AuthController
    participant Books as BookController
    participant Orders as OrderController
    participant Service as OrderService
    participant DB as PostgreSQL

    User->>Frontend: Open website
    Frontend->>Books: GET /books
    Books->>DB: Load books
    DB-->>Books: Book list
    Books-->>Frontend: Return books
    Frontend-->>User: Show catalog

    User->>Frontend: Sign in
    Frontend->>Auth: POST /api/auth/signin
    Auth->>DB: Find user by email
    DB-->>Auth: User data
    Auth-->>Frontend: Return JWT token
    Frontend-->>User: User is signed in

    User->>Frontend: Add book to cart
    Frontend->>Frontend: Store item in cart state

    User->>Frontend: Go to checkout
    Frontend-->>User: Show checkout form

    User->>Frontend: Submit order
    Frontend->>Orders: POST /api/orders with JWT
    Orders->>Service: createOrder orderDTO user
    Service->>DB: Check user and books
    Service->>DB: Save order and order items
    DB-->>Service: Saved order
    Service-->>Orders: Return order
    Orders-->>Frontend: Order created
    Frontend-->>User: Show order confirmation

```

# Digram tříd

```mermaid
classDiagram
    class User {
        +Long id
        +String username
        +String email
        +String password
        +String telephone
        +String address
    }

    class Book {
        +Long id
        +String title
        +String author
        +double price
        +String category
        +String description
        +int stock
        +int discountPercent
        +double originalPrice
        +String coverUrl
    }

    class Order {
        +Long id
        +String status
        +Double totalPrice
        +String shippingAddress
        +String deliveryMethod
        +LocalDateTime orderDate
    }

    class OrderItem {
        +Long id
        +Integer quantity
        +Double price
    }

    class Review {
        +Long id
        +String author
        +String comment
        +int rating
    }

    class Role {
        +Long id
        +String name
    }

    User "1" --> "many" Order : has
    User "many" --> "many" Role : has
    Order "1" --> "many" OrderItem : contains
    OrderItem "many" --> "1" Book : is for
    Book "1" --> "many" Review : has
```

# Deployment diagram

```mermaid
graph TD
    subgraph Developer_Computer[Developer Computer]
        Browser[Browser]

        subgraph Frontend[Frontend]
            Vite[Vite Dev Server<br/>React App<br/>localhost:5173]
        end

        subgraph Backend[Backend]
            Spring[Spring Boot App<br/>localhost:8080 or 8081]
        end

        subgraph Database[Database]
            Postgres[(PostgreSQL<br/>localhost:5432)]
        end
    end

    Browser -->|loads app| Vite
    Browser -->|API requests / JSON| Spring
    Browser -->|JWT token after login| Spring
    Spring -->|SQL queries| Postgres

```
