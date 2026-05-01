const en = {
  common: {
    addToCart: 'Add to cart',
    addedToCartMessage: 'Added "{title}" to cart.',
    address: 'Address',
    age: 'Age',
    back: 'Back',
    backToCatalog: 'Back to catalog',
    backToProfile: 'Back to profile',
    billing: 'Billing',
    bookDetails: 'Book Details',
    bookNotFound: 'Book not found',
    books: 'Books',
    browseCatalog: 'Browse catalog',
    buy: 'Buy',
    cancel: 'Cancel',
    cart: 'Cart',
    checkout: 'Checkout',
    closePurchaseMessage: 'Close purchase message',
    customer: 'Customer',
    delete: 'Delete',
    delivery: 'Delivery',
    description: 'Description',
    details: 'Details',
    discount: 'Discount',
    discounts: 'Discounts',
    email: 'E-mail',
    format: 'Format',
    home: 'Home',
    inStock: 'In stock',
    items: 'Items',
    method: 'Method',
    name: 'Name',
    notAvailable: 'Not available',
    originalPrice: 'Original Price',
    pages: 'pages',
    password: 'Password',
    payment: 'Payment',
    price: 'Price',
    profile: 'Profile',
    remove: 'Remove',
    searchBooks: 'Search books',
    signIn: 'Sign In',
    subtotal: 'Subtotal',
    telephone: 'Telephone',
    total: 'Total',
  },
  appShell: {
    brandLabel: 'Find your book',
    openingHours: 'Open: 10:00-22:00',
    searchPlaceholder: 'Search books, authors or genres',
    englishVersion: 'English version',
    czechVersion: 'Czech version',
    navigation: {
      home: 'Home',
      catalog: 'Catalog',
      cart: 'Cart',
      aboutUs: 'About us',
      profile: 'Profile',
      signIn: 'Sign In',
      table: 'Table',
    },
  },
  tablePage: {
    documentTitle: 'Book Table | SWI Frontend',
    hero: {
      eyebrow: 'Book Table',
      title: 'Sort and Search Books',
      description: 'A sortable and searchable table of all the books in the store.',
    },
    searchPlaceholder: 'Search by title or author',
    table: {
      id: 'ID',
      title: 'Title',
      author: 'Author',
      category: 'Category',
      pages: 'Pages',
      price: 'Price',
    },
  },
  homePage: {
    documentTitle: 'Home | SWI Frontend',
    eyebrow: 'Home',
    title: 'Find your next great read.',
    description:
      'Browse curated books across fiction, fantasy, mystery and more. Simple recommendations, clear genres, and books worth your time.',
    browseCatalog: 'Browse catalog',
    cards: {
      catalog: {
        eyebrow: 'Catalog',
        title: 'Explore books',
        description: 'Search by title, author, or genre and discover your next favorite book.',
        action: 'Open catalog',
        searchLabel: 'Search catalog',
        searchPlaceholder: 'Search books, authors or genres',
      },
      account: {
        eyebrow: 'Account',
        title: 'Sign in or register',
        description:
          'Save your information for easy access, track orders, and get personalized picks.',
        action: 'Open sign in',
      },
      about: {
        eyebrow: 'About us',
        title: 'Our story',
        description: 'Learn what makes our bookstore different and why we love books.',
        action: 'Open about us',
      },
    },
  },
  aboutPage: {
    documentTitle: 'About Us | SWI Frontend',
    hero: {
      eyebrow: 'About Us',
      title: 'A bookstore built for discovery',
      description:
        "We believe discovering your next favorite book should feel effortless and exciting. Our bookstore is built for curious readers who love exploring new stories, ideas, and perspectives. Whether you're into fiction, drama, fantasy or any hidden gems, we make it easy to find books that truly resonate with you.",
    },
    story: {
      eyebrow: 'Brand Story',
      title: 'Our Mission',
      values: [
        'What started as a simple idea - making book discovery better - grew into a platform focused on readers first. We wanted to build more than just a store, we wanted a place where books feel alive and easy to explore.',
        "Our mission is simple: to connect people with books they'll love. We aim to create a smooth, enjoyable experience - from browsing to checkout - while offering a thoughtfully curated selection across genres.",
        "Our shelves are filled with a variety of genres, giving you countless ways to discover stories and ideas that truly resonate with you. Our platform features a clean and intuitive design, allowing you to focus on exploring and enjoying your next read without distractions. We put a strong emphasis on personalized recommendations, helping you find books you’ll genuinely love. ",
      ],
    },
    contact: {
      eyebrow: 'Contact Us',
      title: 'Where can you find us?',
      addressLabel: 'Address:',
      address: 'Hlavní 128, 110 00 Prague, Czech Republic',
      openingTimes: 'Opening times:',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      supportLabel: 'Contact our support:',
    },
  },
  catalogPage: {
    documentTitle: 'Catalog | SWI Frontend',
    hero: {
      eyebrow: 'Catalog',
      title: 'Explore our book collection',
      description:
        'Choose a genre, set filters by age, price or book length, and find authors that interest you.',
    },
    filters: {
      eyebrow: 'Filters',
      title: 'Narrow selection',
      active: 'Active',
      age: 'Age',
      years: 'years',
      price: 'Price',
      length: 'Length',
      pages: 'pages',
      fromAuthor: 'From author',
      bookForm: 'Book form',
    },
    search: {
      eyebrow: 'Search',
      resultsFor: 'Results for',
      backToGenres: 'Back to genres',
      noBooksFound: 'No books found for',
      differentSearchTerm: 'Try a different search term.',
    },
    filteredResults: {
      eyebrow: 'Books',
      title: 'Filtered results',
      noBooksMatch: 'No books match your filters.',
      adjustFilters: 'Try adjusting your filter settings.',
    },
    categoriesSection: {
      eyebrow: 'Genres',
      title: 'Choose your adventure',
      description:
        'Browse our collection of books organized into genres. Whether you love thrilling adventures, timeless classics, or thought-provoking mysteries, we have something for every reader. Click on a genre to explore the books that await you.',
    },
    discounts: {
      eyebrow: 'Discounts',
      title: 'Great deals',
      showMore: 'Show more',
    },
    bookCard: {
      age: 'Age',
      pages: 'pages',
      coverSuffix: 'cover',
    },
  },
  categoryBooksPage: {
    documentTitleFallback: 'Genre | SWI Frontend',
    heroEyebrow: 'Genre',
    unknownCategory: 'Unknown genre',
    categoryDescriptionPrefix: 'Explore books that are marked under',
    categoryNotFound: 'The requested genre was not found.',
    sectionEyebrow: 'Books',
    noCategorySelected: 'No genre selected',
    noBooksForCategory: 'No books are currently marked for this genre.',
    chooseAnotherType: 'Try returning to the catalog to choose another book type.',
  },
  discountsPage: {
    documentTitle: 'Discounts | Find my book',
    hero: {
      eyebrow: 'Discounts',
      title: 'Special offers on books',
      description:
        'Discover amazing deals on our discounted books. Save money while expanding your library.',
    },
    section: {
      eyebrow: 'Discounted Books',
      title: 'Limited time offers',
    },
  },
  bookDetailsPage: {
    documentTitleFallback: 'Book Details',
    notFound: {
      eyebrow: 'Book Not Found',
      title: 'Book not found',
      description: 'The requested book could not be found.',
    },
    hero: {
      eyebrow: 'Book Details',
      by: 'By',
    },
    overview: {
      eyebrow: 'Overview',
      title: 'Book Information',
      by: 'by',
      inStock: 'In stock:',
    },
    specs: {
      eyebrow: 'Specs',
      title: 'Details',
      price: 'Price:',
      originalPrice: 'Original Price:',
      discount: 'Discount:',
      pages: 'Pages:',
      format: 'Format:',
      age: 'Age:',
      description: 'Description:',
    },
  },
  cartPage: {
    documentTitle: 'Cart | SWI Frontend',
    hero: {
      eyebrow: 'Cart',
      fullTitle: 'Woah thats a lot of books!',
      emptyTitle: 'Your cart is empty',
      fullDescription:
        "It's our pleasure to send you your books. Just click the button below to continue to checkout and finalize your order.",
      emptyDescription:
        'Add books from the catalog and they will appear here once you put them into the cart.',
      continueToCheckout: 'Continue to checkout',
    },
    section: {
      eyebrow: 'Cart State',
      title: 'Your books',
      emptyMessage: 'Your cart is empty.',
    },
  },
  checkoutPage: {
    documentTitle: 'Checkout | SWI Frontend',
    billingOptions: ['Cash', 'Online card payment', 'Pay on delivery'],
    deliveryOptions: {
      homeDelivery: 'Home delivery',
      checkoutAddress: 'Your checkout address',
      alzaBox: 'AlzaBox',
      ppl: 'PPL',
    },
    order: {
      preparing: 'Preparing',
      delivered: 'Delivered',
      book: 'book',
      books: 'books',
      thanksTimeline:
        'Thanks for your purchase. Your order should be delivered in {days} {dayWord}.',
      thankYouPurchase:
        'Thank you for your purchase and we are happy you chose us. Your order will be delivered in {days} {dayWord}.',
      deliveredTimeline: 'Your order has already been delivered.',
      day: 'day',
      days: 'days',
    },
    hero: {
      eyebrow: 'Checkout',
      reviewTitle: 'Review your order',
      emptyTitle: 'Your cart is empty',
      reviewDescription:
        'Check the books in your cart before completing shipping and payment.',
      emptyDescription: 'Add books from the catalog before continuing to checkout.',
    },
    review: {
      eyebrow: 'Order Review',
      title: 'Books in your cart',
      subtotal: 'Subtotal',
      booksSubtotal: 'Books subtotal:',
      delivery: 'Delivery',
      orderTotal: 'Order total:',
      emptyMessage: 'There are no books in your cart yet.',
    },
    steps: {
      customerDetails: 'Customer Details',
      deliveryOptions: 'Delivery Options',
      billingOptions: 'Billing Options',
      checkoutOverview: 'Checkout Overview',
      startCheckout: 'Start checkout',
      chooseDeliveryMethod: 'Choose delivery method',
      choosePaymentMethod: 'Choose payment method',
      checkYourInformation: 'Check your information',
    },
    form: {
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'E-mail',
      telephone: 'Telephone number',
      address: 'Address',
      addressPlaceholder: 'Street, city, ZIP code',
      continueToBilling: 'Continue to billing',
      continueToOverview: 'Continue to overview',
      cardNumber: 'Card number',
      dayOfValidity: 'Day of validity',
      customer: 'Customer',
      delivery: 'Delivery',
      billing: 'Billing',
      method: 'Method:',
      deliveryAddress: 'Delivery address:',
      deliveryPrice: 'Delivery price:',
      payment: 'Payment:',
      card: 'Card:',
      validUntil: 'Valid until:',
    },
    modal: {
      eyebrow: 'Purchase complete',
      title: 'Thank you',
    },
  },
  signInPage: {
    documentTitle: 'Sign In | SWI Frontend',
    tabs: {
      logIn: 'Log In',
      register: 'Register',
    },
    login: {
      eyebrow: 'Welcome Back',
      title: 'Log in to continue shopping',
      description:
        'Access your cart, profile, and past orders from one place. This starter form is ready to connect to your backend later.',
      buttonLabel: 'Log in',
      footerText: "Don't have an account yet?",
      footerAction: 'Create one',
    },
    register: {
      eyebrow: 'New Here',
      title: 'Create your bookstore account',
      description:
        'Save your details, track orders, and make checkout faster. This starter form is ready for your registration endpoint.',
      buttonLabel: 'Create account',
      footerText: 'Already registered?',
      footerAction: 'Log in',
    },
    whySignIn: {
      eyebrow: 'Why Sign In',
      title: 'Make your life easier',
      items: [
        'Look at your orders old or active.',
        "You don't have to write anything in checkout.",
        'Each month you can win a ticket for 100Kč off your order.',
      ],
      viewProfile: 'View profile',
      readAboutUs: 'Read about us',
      notLoggedIn: 'Not logged in.',
    },
    loginForm: {
      email: 'Email',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      forgotPassword: 'Forgot password?',
      missingCredentials: 'Enter both your e-mail and password.',
      invalidEmail: 'Enter a valid e-mail address.',
      noAccountFound: 'No account found yet. Create one in the registration tab first.',
      wrongCredentials: 'The e-mail or password is not correct.',
    },
    registerForm: {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      password: 'Password',
      passwordPlaceholder: 'Create a password',
      confirmPassword: 'Confirm password',
      confirmPasswordPlaceholder: 'Repeat your password',
      terms: 'I agree to the terms and want to create a bookstore account.',
      missingFields: 'Fill in all required fields before creating the account.',
      invalidEmail: 'Enter a valid e-mail address.',
      shortPassword: 'Password must have at least 8 characters.',
      passwordMismatch: 'Passwords do not match.',
      termsRequired: 'You need to agree to the terms before creating the account.',
    },
  },
  resetPasswordPage: {
    documentTitle: 'Reset Password | SWI Frontend',
    hero: {
      eyebrow: 'Password Recovery',
      title: 'Restore your password',
      description:
        'Confirm your account e-mail first, then choose a new password for your sign-in.',
      backToSignIn: 'Back to sign in',
    },
    stepOne: {
      eyebrow: 'Step 1',
      title: 'Verify your e-mail',
      email: 'E-mail',
      verifyEmail: 'Verify e-mail',
    },
    stepTwo: {
      eyebrow: 'Step 2',
      title: 'Set a new password',
      verifiedAccount: 'Verified account:',
      newPassword: 'New password',
      newPasswordPlaceholder: 'Enter your new password',
      confirmNewPassword: 'Confirm new password',
      confirmNewPasswordPlaceholder: 'Repeat your new password',
      saveNewPassword: 'Save new password',
      goToSignIn: 'Go to sign in',
      waitingForEmail:
        'Enter a valid registered e-mail on the left before you can create a new password.',
    },
    errors: {
      missingEmail: 'Enter your e-mail address first.',
      invalidEmail: 'Enter a valid e-mail address.',
      noAccount: 'No account was found for this e-mail address.',
      unavailableAccount:
        'This account is no longer available. Try the recovery process again.',
      missingPasswords: 'Fill in both password fields.',
      shortPassword: 'New password must have at least 8 characters.',
      passwordMismatch: 'Passwords do not match.',
    },
    success: 'Password updated successfully. You can now sign in with your new password.',
  },
  profilePage: {
    documentTitle: 'Profile | SWI Frontend',
    hero: {
      eyebrow: 'Profile',
      title: 'Your account overview',
      description:
        'Check your contact details, billing information, password settings, and order progress in one place.',
    },
    accountDetails: {
      eyebrow: 'Account Details',
      title: 'Personal and billing information',
      saveChanges: 'Save changes',
      editInformation: 'Edit information',
      fields: {
        fullName: 'Full name',
        email: 'E-mail',
        telephone: 'Telephone',
        company: 'Company',
        streetAndNumber: 'Street and number',
        city: 'City',
        zipCode: 'ZIP code',
        country: 'Country',
      },
    },
    security: {
      eyebrow: 'Security',
      title: 'Change password',
      currentPassword: 'Current password',
      currentPasswordPlaceholder: 'Enter your current password',
      newPassword: 'New password',
      newPasswordPlaceholder: 'Enter a new password',
      confirmNewPassword: 'Confirm new password',
      confirmNewPasswordPlaceholder: 'Repeat the new password',
      updatePassword: 'Update password',
      signOff: 'Sign off',
      deleteProfile: 'Delete profile',
      errors: {
        noSavedAccount: 'No saved account was found. Please register again.',
        missingFields: 'Fill in all password fields first.',
        wrongCurrentPassword: 'Current password is not correct.',
        shortPassword: 'New password must have at least 8 characters.',
        passwordMismatch: 'New passwords do not match.',
        deleteWrongPassword: 'Enter your correct password to delete your profile.',
      },
      success:
        'Password updated. You can now sign in with the new password after signing off.',
    },
    orders: {
      activeEyebrow: 'Orders',
      activeTitle: 'Active order',
      historyEyebrow: 'Order History',
      historyTitle: 'Old orders',
      emptyActive: 'You do not have any active orders yet.',
      emptyHistory: 'After delivering your active order it will be shown here.',
      placedOn: 'Placed on',
      delivery: 'Delivery:',
      totalPrice: 'Total price:',
      openDetails: 'Open details',
    },
    deleteModal: {
      eyebrow: 'Delete profile',
      title: 'Are you sure?',
      description:
        'This will delete your profile, saved account information, and saved orders. Enter your password to confirm.',
      passwordPlaceholder: 'Enter your password',
    },
  },
  orderDetailsPage: {
    documentTitleFallback: 'Order Details',
    notFound: {
      eyebrow: 'Order Not Found',
      title: 'Order not found',
      description: 'We could not find the order you selected.',
    },
    hero: {
      activeOrder: 'Active Order',
      pastOrder: 'Past Order',
      placedOn: 'Placed on',
    },
    contents: {
      eyebrow: 'Items',
      title: 'Order contents',
      quantity: 'Quantity:',
    },
    summary: {
      eyebrow: 'Summary',
      title: 'Order details',
      status: 'Status',
      placedOn: 'Placed on',
      items: 'Items',
      deliveryCost: 'Delivery cost',
      total: 'Total',
      delivery: 'Delivery',
      payment: 'Payment',
    },
    shipping: {
      eyebrow: 'Shipping',
      title: 'Delivery address',
    },
    billing: {
      eyebrow: 'Billing',
      title: 'Billing address',
    },
    timeline: {
      eyebrow: 'Timeline',
      title: 'Order progress',
    },
  },
  notFoundPage: {
    documentTitle: 'Not Found | SWI Frontend',
    eyebrow: '404',
    title: 'This page does not exist',
    description:
      'The route you tried is not defined yet. Head back to the catalog and continue from there.',
    goToCatalog: 'Go to catalog',
  },
  categories: [
    {
      slug: 'adventure-stories',
      title: 'Adventure stories',
      description:
        'These narratives feature thrilling journeys, explorations, and heroic quests involving danger and discovery in challenging settings.',
    },
    {
      slug: 'classics',
      title: 'Classics',
      description:
        'Timeless literary works exploring universal themes, human nature, and societal issues through masterful storytelling.',
    },
    {
      slug: 'crime',
      title: 'Crime',
      description:
        'Stories centered on criminal activities, investigations, and justice, often featuring detectives and moral dilemmas.',
    },
    {
      slug: 'fairy-tales',
      title: 'Fairy tales',
      description:
        'Enchanting, magical tales rooted in folklore, with mythical creatures, moral lessons, and happy endings.',
    },
    {
      slug: 'fantasy',
      title: 'Fantasy',
      description:
        'Imaginative worlds with magic, mythical beings, and epic quests exploring heroism and destiny.',
    },
    {
      slug: 'historical-fiction',
      title: 'Historical fiction',
      description:
        'Novels blending factual past events with fictional characters to provide insights into bygone eras and cultures.',
    },
    {
      slug: 'horror',
      title: 'Horror',
      description:
        'Tales evoking fear through supernatural elements, psychological terror, or monstrous threats.',
    },
    {
      slug: 'humour-and-satire',
      title: 'Humour and satire',
      description: 'Witty narratives using comedy and irony to critique society and human folly.',
    },
    {
      slug: 'literary-fiction',
      title: 'Literary fiction',
      description:
        'Character-driven stories emphasizing psychological depth and complex themes in stylistic prose.',
    },
    {
      slug: 'mystery',
      title: 'Mystery',
      description:
        'Intriguing plots involving puzzles, secrets, and deductions leading to suspenseful revelations.',
    },
    {
      slug: 'poetry',
      title: 'Poetry',
      description:
        'Expressive art using rhythm, imagery, and metaphor to convey emotions and ideas.',
    },
    {
      slug: 'plays',
      title: 'Plays',
      description:
        'Dramatic scripts for performance exploring conflicts and relationships through dialogue and stage directions.',
    },
    {
      slug: 'romance',
      title: 'Romance',
      description:
        'Stories focusing on emotional connections, love affairs, and personal growth amidst challenges.',
    },
    {
      slug: 'science-fiction',
      title: 'Science fiction',
      description:
        'Speculative narratives exploring futuristic technologies and alternate realities to address ethical dilemmas.',
    },
    {
      slug: 'short-stories',
      title: 'Short stories',
      description:
        'Concise narratives delivering complete tales with a single event, insight, or twist.',
    },
    {
      slug: 'thrillers',
      title: 'Thrillers',
      description:
        'Fast-paced stories built on tension, danger, and high-stakes conflicts with unexpected twists.',
    },
    {
      slug: 'war',
      title: 'War',
      description:
        'Narratives depicting conflict, heroism, and suffering in wartime, exploring bravery and loss.',
    },
    {
      slug: 'womens-fiction',
      title: "Women's fiction",
      description:
        "Stories highlighting women's experiences, relationships, and journeys from a female perspective.",
    },
    {
      slug: 'young-adult',
      title: 'Young adult',
      description:
        'Coming-of-age tales for teenagers dealing with identity, love, and self-discovery.',
    },
    {
      slug: 'autobiography-and-memoir',
      title: 'Autobiography and memoir',
      description:
        "Personal accounts of an individual's life experiences written by the subject themselves.",
    },
    {
      slug: 'biography',
      title: 'Biography',
      description:
        "Detailed accounts of a person's life written by another author based on research.",
    },
  ],
  formats: {
    hardcover: 'Hardcover',
    hardcoverBook: 'Hardcover book',
    ebook: 'E-book',
    audiobook: 'Audiobook',
  },
  books: [],
}

const cz = {
  common: {
    addToCart: 'Přidat do košíku',
    addedToCartMessage: 'Přidáno do košíku: „{title}“.',
    address: 'adresa',
    age: 'věk',
    back: 'Zpátky',
    backToCatalog: 'Zpátky do katalogu',
    backToProfile: 'Zpátky na profil',
    billing: 'účtování',
    bookDetails: 'detaily knihy',
    bookNotFound: 'kniha není nalezena',
    books: 'knihy',
    browseCatalog: 'Procházet katalog',
    buy: 'Koupit',
    cancel: 'Zrušit',
    cart: 'košík',
    checkout: 'pokladna',
    closePurchaseMessage: 'zavřít zprávu o nákupu',
    customer: 'zákazník',
    delete: 'Vymazat',
    delivery: 'dovoz',
    description: 'popis',
    details: 'detaily',
    discount: 'sleva',
    discounts: 'slevy',
    email: 'e-mail',
    format: 'formát',
    home: 'Domov',
    inStock: 'na skladě',
    items: 'položky',
    method: 'metoda',
    name: 'jméno',
    notAvailable: 'není k dizpozici',
    originalPrice: 'původní cena',
    pages: 'stránek',
    password: 'Heslo',
    payment: 'platba',
    price: 'cena',
    profile: 'Profil',
    remove: 'odstranit',
    searchBooks: 'hledat knihy',
    signIn: 'přihlášení',
    subtotal: 'mezisoučet',
    telephone: 'telefon',
    total: 'celkem',
  },
  appShell: {
    brandLabel: 'Najdi svojí knihu',
    openingHours: 'Otevřeno: 10:00-22:00',
    searchPlaceholder: 'Hledej knihy, autory či žánry',
    englishVersion: 'Anglická verze',
    czechVersion: 'Česká verze',
    navigation: {
      home: 'Domov',
      catalog: 'Katalog',
      cart: 'Košík',
      aboutUs: 'O nás',
      profile: 'Profil',
      signIn: 'Přihlášení',
      table: 'Tabulka',
    },
  },
  tablePage: {
    documentTitle: 'Tabulka Knih | SWI Frontend',
    hero: {
      eyebrow: 'Tabulka Knih',
      title: 'Řadit a Hledat Knihy',
      description: 'Řaditelná a prohledávatelná tabulka všech knih v obchodě.',
    },
    searchPlaceholder: 'Hledat podle názvu nebo autora',
    table: {
      id: 'ID',
      title: 'Název',
      author: 'Autor',
      category: 'Kategorie',
      pages: 'Stránky',
      price: 'Cena',
    },
  },
  homePage: {
    documentTitle: 'Domov | SWI Frontend',
    eyebrow: 'Domov',
    title: 'Najdi si nové dobré počtení.',
    description:
      'Procházej knihy od fikce, fantasii, přes detektivky a ještě více. Jednoduché doporučení, jasné kategorie, a knihy které stojí za váš čas.',
    browseCatalog: 'Procházet katalog',
    cards: {
      catalog: {
        eyebrow: 'Katalog',
        title: 'Projdi si knihy',
        description: 'Hledej knihy, autory či žánry a najdi si svojí novou oblíbenou knihu.',
        action: 'Otevři katalog',
        searchLabel: 'Prohlédni si katalog',
        searchPlaceholder: 'Hledej knihy, autory či žánry',
      },
      account: {
        eyebrow: 'Účet',
        title: 'Přihlas se nebo se zaregistruj.',
        description:
          'Ulož si svoje informace pro rychlý přístup, sleduj objednávky a dostaň personalizované výběry knih.',
        action: 'Otevři Přihlášení',
      },
      about: {
        eyebrow: 'O nás',
        title: 'Náš příběh',
        description: 'Zjisti čím je naše knihkupectví jiné a proč milujeme knihy.',
        action: 'Otevři o nás',
      },
    },
  },
  aboutPage: {
    documentTitle: 'O nás | SWI Frontend',
    hero: {
      eyebrow: 'O nás',
      title: 'Knihkupectví postavené pro objevování.',
      description:
        "Věříme že objevování nové oblíbené knihy by mělo být jednoduché a vzrušující. Naše knihkupectví je postaveno pro zvídavé čtenáře, kteří milují objevování nových příběhů, nápadů a perspektiv. Ať tě zajímá fikce, drama, fantasy nebo nějaký skrytý klenot, chceme aby bylo jednoduché najít knihy které v tobě zanechají dobrý pocit.",
    },
    story: {
      eyebrow: 'Příběh naší značky',
      title: 'Naše mise',
      values: [
        'Co začalo jako malý nápad - vytvořit lepší objevování knih - vzniklo do platformy která bere v potaz čtenáře první. Chtěli jsme vytvořit něco víc než jenom obchod, chtěli jsme vytvořit místo, kde se knihy mohli cítit živé a jednoduché na prozkoumání.',
        "Naše mise je jednoduchá: propijit lidi s knihami které milují. Cílíme abychom vytvořili příjemný zážitek - od procházení katalogu po pokladnu - a zároveň nabízíme promyšleně vybraný výběr napříč žánry.",
        "Naše police jsou naplněné různými žánry, které ti dávájí nekonečně mnoho směrů objevování příběhů které tě zasáhnou do srdce. Naše platforma obsahuje jednoduchý a intuitivní design, který ti dovolí se soustředit na objevování a užívání si nových knih bez rozptýlení. Dbáme na předání personalizovaných doporučení knih, které ti pomohou najít tu, kterou budeš milovat. ",
      ],
    },
    contact: {
      eyebrow: 'Kontaktuj nás',
      title: 'Kde nás můžeš najít?',
      addressLabel: 'Adresa:',
      address: 'Hlavní 128, 110 00 Praha, Česká republika',
      openingTimes: 'Otevírací doba:',
      days: ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'],
      supportLabel: 'Kontaktuj naši podporu:',
    },
  },
  catalogPage: {
    documentTitle: 'Katalog | SWI Frontend',
    hero: {
      eyebrow: 'Katalog',
      title: 'Prohlédněte si naši kolekci knih',
      description:
        'Vyber si žánr, nastav filtr podle věku, ceny nebo délky knihy a hledej knihy autora který tě zajímá.',
    },
    filters: {
      eyebrow: 'Filtry',
      title: 'Zúžit výběr',
      active: 'Aktivní',
      age: 'Věk',
      years: 'let',
      price: 'Cena',
      length: 'Délka',
      pages: 'stránek',
      fromAuthor: 'Od autora',
      bookForm: 'Knižní forma',
    },
    search: {
      eyebrow: 'Hledat',
      resultsFor: 'Výsledky pro',
      backToGenres: 'Zpátky do žánrů',
      noBooksFound: 'Žádná kniha najita pro',
      differentSearchTerm: 'Zkus jiný vyhledávací výraz.',
    },
    filteredResults: {
      eyebrow: 'Knihy',
      title: 'Filtrované výsledky',
      noBooksMatch: 'Žádné knihy se nezhodují z použitými filtry.',
      adjustFilters: 'Zkus změnit nastavení filtrů.',
    },
    categoriesSection: {
      eyebrow: 'Žánry',
      title: 'Vyber si svůj příběh',
      description:
        'Prozkoumej naši kolekci knih seřazených do žánrů. Ať miluješ vzrušující dobrodružství, nestrárnoucí klasika nebo detektivky k zamyšlení, máme vše pro jakéhokoliv čtenáře. Zvol si žánr a prozkoumej knihy, které na tebe čekají.',
    },
    discounts: {
      eyebrow: 'Slevy',
      title: 'Skvělé nabídky',
      showMore: 'Ukaž více',
    },
    bookCard: {
      age: 'věk',
      pages: 'stránek',
      coverSuffix: 'obal knihy',
    },
  },
  categoryBooksPage: {
    documentTitleFallback: 'Žánr | SWI Frontend',
    heroEyebrow: 'Žánr',
    unknownCategory: 'Neznámý žánr',
    categoryDescriptionPrefix: 'Projdi si knihy, které jsou označené pod žánrem',
    categoryNotFound: 'Žádaný žánr nebyl nalezen.',
    sectionEyebrow: 'Knihy',
    noCategorySelected: 'Žádný žánr vybrán.',
    noBooksForCategory: 'Žádná kniha není označená pod tímto žánrem.',
    chooseAnotherType: 'Zkus se vrátit do katalogu aby sis vybral jiný žánr.',
  },
  discountsPage: {
    documentTitle: 'Slevy | Najdi svoji knihu',
    hero: {
      eyebrow: 'Slevy',
      title: 'Speciální nabídka pro tyto knihy',
      description:
        'Objev úžasné nabídky naších zlevněných knih. Ušetři peníze mezitím co si zvětšuješ svojí knihovnu.',
    },
    section: {
      eyebrow: 'Zlevněné knihy',
      title: 'Časově limitované nabídky',
    },
  },
  bookDetailsPage: {
    documentTitleFallback: 'Detaily knih',
    notFound: {
      eyebrow: 'Kniha nenalezena',
      title: 'Kniha nenalezena',
      description: 'Žádaná kniha nebyla nalezena.',
    },
    hero: {
      eyebrow: 'Detaily knihy',
      by: 'Od',
    },
    overview: {
      eyebrow: 'Přehled',
      title: 'Knižní informace',
      by: 'Od',
      inStock: 'Na skladě:',
    },
    specs: {
      eyebrow: 'Specifikace',
      title: 'Detaily',
      price: 'Cena:',
      originalPrice: 'Původní cena:',
      discount: 'Sleva:',
      pages: 'Stránky:',
      format: 'Formát:',
      age: 'Věk:',
      description: 'Popis:',
    },
  },
  cartPage: {
    documentTitle: 'Košík | SWI Frontend',
    hero: {
      eyebrow: 'Košík',
      fullTitle: 'Tý jo to je hodně knih!',
      emptyTitle: 'Tvůj košík je prázdný',
      fullDescription:
        "Jsme poctěni ti poslat tvé knihy. Jenom klikni na tlačítko aby ses dostal na pokladnu kde zakončíme tvojí objednávku.",
      emptyDescription:
        'Přidej knihy z katalogu a objeví se zde jakmile je dáš do košíku.',
      continueToCheckout: 'Pokračuj na pokladnu.',
    },
    section: {
      eyebrow: 'Stav košíku',
      title: 'Tvoje knihy',
      emptyMessage: 'Tvůj košík je prázdný.',
    },
  },
  checkoutPage: {
    documentTitle: 'Pokladna | SWI Frontend',
    billingOptions: ['Hotově', 'Kartou online', 'Placení na dobírku'],
    deliveryOptions: {
      homeDelivery: 'Dovoz domů',
      checkoutAddress: 'Platební adresa',
      alzaBox: 'AlzaBox',
      ppl: 'PPL',
    },
    order: {
      preparing: 'Připravování',
      delivered: 'Dovezeno',
      book: 'kniha',
      books: 'knihy',
      thanksTimeline:
        'Děkujeme za váš nákup. Vaše objednávka by měla být dovezena do {days} {dayWord}.',
      thankYouPurchase:
        'Děkujeme za váš nákup a jsme rádi že jste si vybrali nás. Vaše objednávka by měla být dovezena do {days} {dayWord}.',
      deliveredTimeline: 'Vaše objednávka už byla doručena.',
      day: 'den',
      days: 'dnů',
    },
    hero: {
      eyebrow: 'Pokladna',
      reviewTitle: 'Zkontroluj si objednávku',
      emptyTitle: 'Tvůj košík je prázdný',
      reviewDescription:
        'Zkontroluj si své knihy v košíku než budeš platit.',
      emptyDescription: 'Přidej knihy z katalogu než budeš platit.',
    },
    review: {
      eyebrow: 'Kontrola objednávky',
      title: 'Knihy v košíku',
      subtotal: 'Mezisoučet',
      booksSubtotal: 'Knižní mezisoučet:',
      delivery: 'Dovoz',
      orderTotal: 'Celková částka objednávky:',
      emptyMessage: 'V košíku ještě nejsou žádné knihy.',
    },
    steps: {
      customerDetails: 'Detaily zákazníka',
      deliveryOptions: 'Možnosti dovozu',
      billingOptions: 'Možnosti platby',
      checkoutOverview: 'Mezisoučtový přehled',
      startCheckout: 'Začít s platbou',
      chooseDeliveryMethod: 'Vyber možnost dovozu',
      choosePaymentMethod: 'Vyber platební metodu.',
      checkYourInformation: 'Zkontroluj si informace',
    },
    form: {
      name: 'Jméno',
      namePlaceholder: 'Tvé jméno',
      email: 'E-mail',
      telephone: 'Telefonní číslo',
      address: 'Adresa',
      addressPlaceholder: 'Ulice, město PSČ',
      continueToBilling: 'Pokračuj na fakturaci',
      continueToOverview: 'Pokračuj na přehled',
      cardNumber: 'Číslo karty',
      dayOfValidity: 'Den platnosti',
      customer: 'Zákazník',
      delivery: 'Dovoz',
      billing: 'Fakturace',
      method: 'Metoda:',
      deliveryAddress: 'Dodací adresa:',
      deliveryPrice: 'Cena za dovoz:',
      payment: 'Platba:',
      card: 'Karta:',
      validUntil: 'Validní do:',
    },
    modal: {
      eyebrow: 'Platba ukončena',
      title: 'Děkujeme',
    },
  },
  signInPage: {
    documentTitle: 'Přihlášení | SWI Frontend',
    tabs: {
      logIn: 'Přihlášení',
      register: 'Registrace',
    },
    login: {
      eyebrow: 'Vítej zpátky',
      title: 'Přihlas se abys pokračoval s nákupem',
      description:
        'Měj přístup k košíku, účtu a minulým objednávkám z jednoho místa. Registrační formulář je připraven pro připojení se k backendu.',
      buttonLabel: 'Přihlášení',
      footerText: "Ještě nemáš u nás účet?",
      footerAction: 'Vytvoř si účet',
    },
    register: {
      eyebrow: 'Nový zde',
      title: 'Vytvoř si knihkupecký účet',
      description:
        'Ulož si informace, sleduj objednávky a ulehči si placení. Registrační formulář je připraven registrační endpoint.',
      buttonLabel: 'Vytvoř si účet',
      footerText: 'Už jsi registrovaný?',
      footerAction: 'Přihlášení',
    },
    whySignIn: {
      eyebrow: 'Proč se přihlásit?',
      title: 'Ulehči si život',
      items: [
        'Podívej se kdykoliv na své objednávky ať už aktivní či staré.',
        "Nemusíš psát žádné informace na pokladně.",
        'Každý měsíc můžeš vyhrát lístek se slevou 100kč z tvojí objednávky',
      ],
      viewProfile: 'Zobrazit profil',
      readAboutUs: 'Přečti si o nás',
      notLoggedIn: 'Nejsi přihlášen.',
    },
    loginForm: {
      email: 'E-mail',
      password: 'Heslo',
      passwordPlaceholder: 'Vlož své heslo',
      forgotPassword: 'Zapoměl si heslo?',
      missingCredentials: 'Vlož e-mail a heslo.',
      invalidEmail: 'Vlož platnou e-mailovou adresu.',
      noAccountFound: 'Žádný účet nenalezen. Vytvoř si nejdříve jeden v registrační záložce.',
      wrongCredentials: 'E-mail nebo heslo není správné.',
    },
    registerForm: {
      firstName: 'Jméno',
      lastName: 'Příjmení',
      email: 'E-mail',
      password: 'Heslo',
      passwordPlaceholder: 'Vytvoř si heslo',
      confirmPassword: 'Potvrď heslo',
      confirmPasswordPlaceholder: 'Napiš znova své heslo',
      terms: 'Souhlasím s podmínkami a chci si vytvořit účet v knihkupectví.',
      missingFields: 'Vyplň nejdříve všechny požadované pole než si vytvoříš účet.',
      invalidEmail: 'Vlož platnou e-mailovou adresu.',
      shortPassword: 'Heslo musí mít aspoň 8 znaků.',
      passwordMismatch: 'Hesla se nezhodují.',
      termsRequired: 'Musíš souhlasit s podmínkama než si budeš moct vytvořit účet.',
    },
  },
  resetPasswordPage: {
    documentTitle: 'Resetování hesla | SWI Frontend',
    hero: {
      eyebrow: 'Obnovení hesla',
      title: 'Obnov si heslo',
      description:
        'Potvrď účet svým e-mailem prvně, potom si vyber nové heslo.',
      backToSignIn: 'Zpátky k přihlášení',
    },
    stepOne: {
      eyebrow: 'Krok 1',
      title: 'Potvrď si e-mail',
      email: 'E-mail',
      verifyEmail: 'Ověření e-mailu',
    },
    stepTwo: {
      eyebrow: 'Krok 2',
      title: 'Nastav si nové heslo',
      verifiedAccount: 'Ověřený účet:',
      newPassword: 'Nové heslo',
      newPasswordPlaceholder: 'Vlož své nové heslo',
      confirmNewPassword: 'Potvrď své heslo',
      confirmNewPasswordPlaceholder: 'Zopakuj své nové heslo',
      saveNewPassword: 'Uložení nového hesla',
      goToSignIn: 'Jdi na přihlášení',
      waitingForEmail:
        'Vlož platný e-mail nalevo než si můžeš vytvořit nové heslo.',
    },
    errors: {
      missingEmail: 'Vlož nejdříve svůj e-mail.',
      invalidEmail: 'Vlož nejdříve platný e-mail.',
      noAccount: 'Žádný účet propojený s tímto e-mailem nebyl nalezen.',
      unavailableAccount:
        'Tenhle účet není už funkční. Zkus zotavovací proces.',
      missingPasswords: 'Vyplň obě pole s heslem.',
      shortPassword: 'Nové heslo musí mít aspoň 8 znaků.',
      passwordMismatch: 'Hesla se nezhodují.',
    },
    success: 'Heslo bylo aktualizováno. Nyní se můžeš přihlásit s novým heslem.',
  },
  profilePage: {
    documentTitle: 'Profil | SWI Frontend',
    hero: {
      eyebrow: 'Profil',
      title: 'Tvůj přehled účtu',
      description:
        'Zkontroluj si svoje kontaktní detaily, platební informace, nastavení hesla a průběh objednávky na jednom místě.',
    },
    accountDetails: {
      eyebrow: 'Detaily účtu',
      title: 'Osobní a platební informace',
      saveChanges: 'Uložit změny',
      editInformation: 'Změnit informace',
      fields: {
        fullName: 'Celé jméno',
        email: 'E-mail',
        telephone: 'Telefon',
        company: 'Společnost',
        streetAndNumber: 'Ulice a číslo domu',
        city: 'Město',
        zipCode: 'PSČ',
        country: 'Země',
      },
    },
    security: {
      eyebrow: 'Zabezpečení',
      title: 'Změna hesla',
      currentPassword: 'Aktuální heslo',
      currentPasswordPlaceholder: 'Vlož své aktuální heslo',
      newPassword: 'Nové heslo',
      newPasswordPlaceholder: 'Vlož nové heslo',
      confirmNewPassword: 'Potvrď nové heslo',
      confirmNewPasswordPlaceholder: 'Napiš znova nové heslo',
      updatePassword: 'Aktualizace hesla',
      signOff: 'Odhlášení',
      deleteProfile: 'Vymazání profilu',
      errors: {
        noSavedAccount: 'Žádný uložený účet nebyl nalezen. Prosím registruj se znova.',
        missingFields: 'Vyplň prvně všechny pole hesel.',
        wrongCurrentPassword: 'Aktuální heslo není správné.',
        shortPassword: 'Nové heslo musí mít aspoň 8 znaků.',
        passwordMismatch: 'Nové hesla se nezhodují.',
        deleteWrongPassword: 'Vlož správné heslo pro zrušení svého účtu.',
      },
      success:
        'Heslo aktualizováno. Můžeš se přihlásit svým novým hesle po odhlášení.',
    },
    orders: {
      activeEyebrow: 'Objednávky',
      activeTitle: 'Aktivní objednávky',
      historyEyebrow: 'Historie objednávek',
      historyTitle: 'Staré objednávky',
      emptyActive: 'Nemáš zatím žádné aktivní objednávky.',
      emptyHistory: 'Po dovezení objednávky se objednávka zobrazí zde.',
      placedOn: 'Objednáno dne:',
      delivery: 'Dovoz:',
      totalPrice: 'Celková cena:',
      openDetails: 'Otevřít detaily',
    },
    deleteModal: {
      eyebrow: 'Zrušit účet',
      title: 'Jseš si jistý?',
      description:
        'Tímhle se smaže účet, uložené informacem a uložené objednávky. Zadej heslo pro potvrzení.',
      passwordPlaceholder: 'Vlož své heslo.',
    },
  },
  orderDetailsPage: {
    documentTitleFallback: 'Detaily objednávky',
    notFound: {
      eyebrow: 'Objednávka nenalezena',
      title: 'Objednávka nenalezena',
      description: 'Nemohli jsme najít vybranou objednávku.',
    },
    hero: {
      activeOrder: 'Aktivní objednávka',
      pastOrder: 'Minulá objednávka',
      placedOn: 'Objednáno dne',
    },
    contents: {
      eyebrow: 'Položky',
      title: 'Obsah objednávky',
      quantity: 'Kvantita:',
    },
    summary: {
      eyebrow: 'Shrnutí',
      title: 'Detaily objednávky',
      status: 'Stav',
      placedOn: 'Objednáno dne',
      items: 'Položky',
      deliveryCost: 'Cena za dovoz',
      total: 'Celkem',
      delivery: 'Dovoz',
      payment: 'Platba',
    },
    shipping: {
      eyebrow: 'Dovoz',
      title: 'Adresa pro dovoz',
    },
    billing: {
      eyebrow: 'Fakturace',
      title: 'Fakturační adresa',
    },
    timeline: {
      eyebrow: 'Průběh',
      title: 'Průběh objednávky',
    },
  },
  notFoundPage: {
    documentTitle: 'Nenalezeno | SWI Frontend',
    eyebrow: '404',
    title: 'Tahle stránka neexistuje',
    description:
      'Tahle cesta není definována ještě. Vrať se zpátky na katalog a pokračuj od tamať.',
    goToCatalog: 'Jdi na katalog',
  },
  categories: [
    {
      slug: 'Dobrodružné příběhy',
      title: 'Dobrodružné příběhy',
      description:
        'Tyto příběhy obsahují napínavé cesty, průzkumy a hrdinské výpravy plné nebezpečí a objevů v náročných prostředích.',
    },
    {
      slug: 'Klasika',
      title: 'Klasika',
      description:
        'Nadčasová literární díla zkoumající univerzální témata, lidskou povahu a společenské problémy prostřednictvím mistrovského vyprávění.',
    },
    {
      slug: 'Krimi',
      title: 'Krimi',
      description:
        'Příběhy zaměřené na kriminální aktivity, vyšetřování a spravedlnost, často s detektivy a morálními dilematy.',
    },
    {
      slug: 'Pohádky',
      title: 'Pohádky',
      description:
        'Okouzlující, magické příběhy zakořeněné v folklóru, s mýtickými bytostmi, morálními ponaučeními a šťastnými konci.',
    },
    {
      slug: 'Fantazie',
      title: 'Fantazie',
      description:
        'Imaginární světy plné magie, mytických bytostí a epických výprav zkoumajících hrdinství a osud.',
    },
    {
      slug: 'Historická fikce',
      title: 'Historická fikce',
      description:
        'Romány prolínající skutečné minulé události s fiktivními postavami, aby poskytly vhled do minulých epoch a kultur.',
    },
    {
      slug: 'Horor',
      title: 'Horor',
      description:
        'Příběhy evokující strach prostřednictvím nadpřirozených prvků, psychologického teroru nebo monstrózních hrozeb.',
    },
    {
      slug: 'Humor a satira',
      title: 'Humor a satira',
      description: 'Vtipné příběhy využívající komedii a ironii ke kritice společnosti a lidské pošetilosti.',
    },
    {
      slug: 'Literární fikce',
      title: 'Literární fikce',
      description:
        'Příběhy založené na postavách s důrazem na psychologickou hloubku a komplexní témata ve stylistické próze.',
    },
    {
      slug: 'Detektivky',
      title: 'Detektivky',
      description:
        'Zajímavé zápletky zahrnující hádanky, tajemství a dedukce vedoucí k napínavým odhalením.',
    },
    {
      slug: 'Poezie',
      title: 'Poezie',
      description:
        'Expresivní umění využívající rytmus, obraznost a metafory k vyjádření emocí a myšlenek.',
    },
    {
      slug: 'Drama',
      title: 'Drama',
      description:
        'Dramatické scénáře pro představení zkoumající konflikty a vztahy prostřednictvím dialogů a scénických režií.',
    },
    {
      slug: 'Romány',
      title: 'Romány',
      description:
        'Příběhy zaměřené na citová pouta, milostné vztahy a osobní růst uprostřed výzev.',
    },
    {
      slug: 'Sci-fi',
      title: 'Sci-fi',
      description:
        'Spekulativní příběhy zkoumající futuristické technologie a alternativní reality s cílem řešit etická dilemata.',
    },
    {
      slug: 'Povídky',
      title: 'Povídky',
      description:
        'Stručné vyprávění, které přináší ucelené příběhy s jedinou událostí, postřehem nebo zvratem.',
    },
    {
      slug: 'Thrillery',
      title: 'Thrillery',
      description:
        'Rychlé příběhy postavené na napětí, nebezpečí a konfliktech s vysokými sázkami s nečekanými zvraty.',
    },
    {
      slug: 'Válečné',
      title: 'Válečné',
      description:
        'Vyprávění zobrazující konflikty, hrdinství a utrpení ve válečné době, zkoumající statečnost a ztráty.',
    },
    {
      slug: 'Ženská beletrie',
      title: "Ženská beletrie",
      description:
        "Příběhy zdůrazňující zkušenosti, vztahy a cesty žen z ženské perspektivy.",
    },
    {
      slug: 'Pro mladé dospělé',
      title: 'Pro mladé dospělé',
      description:
        'Příběhy o dospívání pro teenagery, kteří se zabývají identitou, láskou a sebepoznáním.',
    },
    {
      slug: 'Autobiografie a memoáry',
      title: 'Autobiografie a memoáry',
      description:
        "Osobní popisy životních zkušeností jednotlivce, které napsali samotní subjekty.",
    },
    {
      slug: 'Biografie',
      title: 'Biografie',
      description:
        "Podrobné popisy života dané osoby napsané jiným autorem na základě výzkumu.",
    },
  ],
  formats: {
    hardcover: 'Pevná vazba',
    hardcoverBook: 'Kniha v pevné vazbě',
    ebook: 'E-kniha',
    audiobook: 'Audiokniha',
  },
  books: [],
}

export const translations = {
  en,
  cz,
} as const

export type Language = keyof typeof translations
export type Translation = typeof en
