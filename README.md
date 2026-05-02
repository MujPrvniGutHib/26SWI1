# SWOT ANALÝZA

## Silné stránky

- Aplikace využívá moderní technologie, jako jsou React a Spring Boot, které jsou populární a dobře zdokumentované
- Uživatelé se mohou registrovat a přihlašovat
- Knihy jsou rozděleny do kategorií, takže je snazší najít to, co hledáte
- Aplikace obsahuje stránku se slevami, což je pro zákazníky výhodné
- Uživatelé mohou k knihám přidávat recenze

## Slabé stránky

- Neexistuje skutečný platební systém, uživatel může dokončit objednávku, ale nedochází k žádnému zpracování peněz.
- Aplikace byla testována pouze lokálně, v kódu nejsou napsány žádné testy.
- Heslo k databázi je napsáno přímo v konfiguračním souboru, což není bezpečné.
- 
## Příležitosti

- Mohlo by být přidáno skutečné platební rozhraní, jako je PayPal nebo platba kreditní kartou
- Mohlo by být nasazeno na internet, aby jej mohli používat skuteční uživatelé
- Mohla by být vytvořena mobilní aplikace, protože backendové API již existuje
- Mohly by být přidány e-mailové notifikace při zadání objednávky
- Systém doporučení na základě toho, co uživatel koupil dříve

## Hrozby

- Velcí konkurenti, jako je Amazon, již prodávají knihy online a mají mnohem více funkcí
- Bezpečnostní problémy – mohlo by dojít k úniku JWT klíče
- Pokud bude aplikaci používat mnoho uživatelů současně, může být pomalá, protože není k dispozici ukládání do mezipaměti


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

# Use Case Diagram

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
    subgraph Frontend
        A[React App/Vite + TypeScript runs on port 5173]
    end

    subgraph Backend
        B[Spring Boot/Java runs on port 8080]
        C[Spring Security/JWT authentication]
        D[REST Controllers]
        E[Services]
        F[Repositories]
        B --> C
        C --> D
        D --> E
        E --> F
    end

    subgraph Database
        G[(PostgreSQL port 5432)]
    end

    A -- "sends HTTP requests with JWT token" --> B
    F -- "reads and writes data" --> G
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
    subgraph "Developer Computer"
        subgraph "Terminal 1"
            A[React App/Vite localhost:5173]
        end

        subgraph "Terminal 2"
            B[Spring Boot App/Java localhost:8080]
        end

        subgraph "PostgreSQL"
            C[(Database localhost:5432)]
        end

        A -- "API calls (HTTP)" --> B
        B -- "SQL queries" --> C
    end

    D[Web Browser] -- "opens" --> A
```