// ====================
// Глобальные переменные
// ====================

// Для счетчика
let countdownInterval;

// Для квиза
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

// Текущий язык (по умолчанию русский)
let currentLang = 'ru';

// Переводы для интерфейса
const translations = {
    ru: {
        siteTitle: "Новый год",
        siteSubtitle: "Встречаем Новый 2026 год вместе!",
        countdownTitle: "До Нового года осталось:",
        daysLabel: "дней",
        hoursLabel: "часов",
        minutesLabel: "минут",
        secondsLabel: "секунд",
        greetingTitle: "Генератор новогодних поздравлений",
        nameLabel: "Имя получателя:",
        namePlaceholder: "Введите имя",
        relationshipLabel: "Ваши отношения:",
        familyOption: "Семья/Родственник",
        friendOption: "Друг/Подруга",
        colleagueOption: "Коллега",
        partnerOption: "Партнер/Возлюбленный",
        childOption: "Ребенок",
        toneLabel: "Тон поздравления:",
        formalOption: "Официальный",
        friendlyOption: "Дружеский",
        funnyOption: "Шуточный",
        romanticOption: "Романтический",
        inspirationalOption: "Вдохновляющий",
        generateBtn: "Сгенерировать поздравление",
        greetingPlaceholder: "Здесь появится ваше новогоднее поздравление",
        copyBtn: "Скопировать поздравление",
        quizTitle: "Новогодний квиз",
        questionLabel: "Вопрос:",
        scoreLabel: "Баллы:",
        loadingQuestion: "Вопрос загружается...",
        prevBtn: "Предыдущий",
        nextBtn: "Следующий",
        submitBtn: "Завершить квиз",
        resultTitle: "Результаты квиза",
        restartBtn: "Пройти еще раз",
        footerText1: "Счастливого Нового года!",
        footerText2: "Created by O'tkirbek Xalimjonov"
    },
    en: {
        siteTitle: "New Year",
        siteSubtitle: "Welcome New Year 2026 together!",
        countdownTitle: "Time until New Year:",
        daysLabel: "days",
        hoursLabel: "hours",
        minutesLabel: "minutes",
        secondsLabel: "seconds",
        greetingTitle: "New Year Greetings Generator",
        nameLabel: "Recipient's name:",
        namePlaceholder: "Enter name",
        relationshipLabel: "Your relationship:",
        familyOption: "Family/Relative",
        friendOption: "Friend",
        colleagueOption: "Colleague",
        partnerOption: "Partner/Beloved",
        childOption: "Child",
        toneLabel: "Greeting tone:",
        formalOption: "Formal",
        friendlyOption: "Friendly",
        funnyOption: "Funny",
        romanticOption: "Romantic",
        inspirationalOption: "Inspirational",
        generateBtn: "Generate greeting",
        greetingPlaceholder: "Your New Year greeting will appear here",
        copyBtn: "Copy greeting",
        quizTitle: "New Year Quiz",
        questionLabel: "Question:",
        scoreLabel: "Score:",
        loadingQuestion: "Loading question...",
        prevBtn: "Previous",
        nextBtn: "Next",
        submitBtn: "Finish quiz",
        resultTitle: "Quiz Results",
        restartBtn: "Try again",
        footerText1: "Happy New Year!",
        footerText2: "Created by O'tkirbek Xalimjonov"
    },
    uz: {
        siteTitle: "Yangi Yil",
        siteSubtitle: "2026 Yangi Yilni birgalikda kutamiz!",
        countdownTitle: "Yangi Yilgacha qolgan vaqt:",
        daysLabel: "kun",
        hoursLabel: "soat",
        minutesLabel: "daqiqa",
        secondsLabel: "soniya",
        greetingTitle: "Yangi Yil tabriklari generatori",
        nameLabel: "Qabul qiluvchi ismi:",
        namePlaceholder: "Ism kiriting",
        relationshipLabel: "Munosabatingiz:",
        familyOption: "Oila/Qarindosh",
        friendOption: "Do'st",
        colleagueOption: "Xamkor",
        partnerOption: "Sherik/Sevgili",
        childOption: "Bola",
        toneLabel: "Tabrik ohangi:",
        formalOption: "Rasmiy",
        friendlyOption: "Do'stona",
        funnyOption: "Kulgili",
        romanticOption: "Romantik",
        inspirationalOption: "Ilhomlantiruvchi",
        generateBtn: "Tabrik yaratish",
        greetingPlaceholder: "Bu yerda sizning Yangi Yil tabrig'ingiz paydo bo'ladi",
        copyBtn: "Tabrikni nusxalash",
        quizTitle: "Yangi Yil kvizi",
        questionLabel: "Savol:",
        scoreLabel: "Ball:",
        loadingQuestion: "Savol yuklanmoqda...",
        prevBtn: "Oldingi",
        nextBtn: "Keyingi",
        submitBtn: "Kvizni tugatish",
        resultTitle: "Kviz natijalari",
        restartBtn: "Qayta urinish",
        footerText1: "Yangi Yilingiz muborak bo'lsin!",
        footerText2: "Created by O'tkirbek Xalimjonov"
    }
};

// Шаблоны поздравлений на разных языках
const greetingTemplates = {
    ru: {
        family: {
            formal: "Дорогой(ая) {name}, от всей души поздравляю тебя с наступающим Новым годом! Желаю, чтобы этот год принес тебе и нашей семье много счастья, здоровья и благополучия. Пусть каждый день будет наполнен радостью и теплом семейного очага.",
            friendly: "Привет, {name}! С Новым годом тебя! Желаю, чтобы следующий год был еще лучше предыдущего. Пусть сбываются все мечты, а рядом всегда будут близкие и родные люди. Горячего чая, мандаринов и отличного настроения!",
            funny: "Эй, {name}! Новый год на носу! Желаю тебе в следующем году столько же счастья, сколько иголок на ёлке, столько же денег, сколько снежинок за окном, и столько же поводов для радости, сколько подарков под ёлкой!",
            romantic: "Милый(ая) {name}, с наступающим Новым годом! В этот волшебный праздник хочу пожелать, чтобы наша любовь становилась только крепче. Пусть следующий год принесет нам еще больше счастливых моментов вместе.",
            inspirational: "Дорогой(ая) {name}, с Новым годом! Пусть этот год станет для тебя временем новых свершений, ярких открытий и смелых решений. Верь в себя, и у тебя все получится!"
        },
        friend: {
            formal: "Уважаемый(ая) {name}, поздравляю тебя с наступающим Новым годом! Желаю успехов во всех начинаниях, крепкого здоровья и исполнения самых заветных желаний.",
            friendly: "{name}, с Новым годом, друг! Пусть этот год будет полон крутых событий, интересных встреч и незабываемых моментов. Желаю тебе драйва, позитива и классной компании!",
            funny: "Ну что, {name}, готов(а) к новогоднему безумию? Желаю тебе в следующем году столько же веселья, сколько сейчас, только растянутого на все 365 дней! Пусть шампанское будет холодным, а оливье — вкусным!",
            romantic: "Дорогой(ая) {name}, с наступающим Новым годом! Пусть этот праздник принесет в твою жизнь не только новые надежды, но и настоящую любовь. Желаю тебе встретить того, кто будет делать тебя счастливым(ой) каждый день.",
            inspirational: "{name}, с Новым годом! Пусть этот год станет для тебя временем роста, развития и новых возможностей. Верь в свои силы, и ты достигнешь всего, о чем мечтаешь!"
        },
        colleague: {
            formal: "Уважаемый(ая) {name}, от всей души поздравляю Вас с наступающим Новым годом! Желаю профессиональных успехов, стабильности и процветания. Пусть новый год принесет новые перспективы и достижения.",
            friendly: "{name}, с Новым годом! Желаю, чтобы работа приносила удовольствие, коллеги были понимающими, а начальство — справедливым. Успехов в карьере и баланса между работой и личной жизнью!",
            funny: "Коллега {name}, с Новым годом! Желаю, чтобы кофе был крепким, дедлайны — далекими, а зарплата — растущей. Пусть в новом году будет меньше совещаний и больше праздников!",
            romantic: "Дорогой(ая) {name}, с наступающим Новым годом! Пусть этот праздник принесет не только профессиональные успехи, но и личное счастье. Желаю встретить свою вторую половинку, если еще не встретил(а).",
            inspirational: "{name}, с Новым годом! Пусть этот год станет для вас временем профессионального роста, интересных проектов и новых вызовов. Верьте в свои силы, и у вас все получится!"
        },
        partner: {
            formal: "Дорогой(ая) {name}, поздравляю тебя с наступающим Новым годом! Желаю, чтобы наши отношения становились только крепче, а вместе мы шли к новым вершинам. Любви, взаимопонимания и гармонии.",
            friendly: "Любимый(ая) {name}, с Новым годом! Желаю нам еще больше совместных приключений, смеха и теплых вечеров. Пусть наш союз будет таким же крепким, как лед на зимнем озере, и таким же ярким, как новогодние огни.",
            funny: "Мой(я) дорогой(ая) {name}, с Новым годом! Желаю, чтобы наши ссоры были короткими, как зимний день, а моменты счастья — длинными, как ночь перед экзаменом. Люблю тебя!",
            romantic: "Моя любовь, {name}, с наступающим Новым годом! В этот волшебный праздник хочу сказать, как сильно я тебя люблю. Пусть наша любовь становится только сильнее с каждым днем, а вместе мы будем счастливы вечно.",
            inspirational: "Дорогой(ая) {name}, с Новым годом! Пусть этот год принесет нам новые совместные цели, достижения и рост. Вместе мы можем все! Люблю и верю в нас."
        },
        child: {
            formal: "Дорогой(ая) {name}, поздравляю тебя с наступающим Новым годом! Желаю тебе слушаться родителей, хорошо учиться и всегда быть послушным(ой). Пусть Дед Мороз принесет тебе много подарков!",
            friendly: "Привет, {name}! С Новым годом! Желаю тебе самых крутых игрушек, вкусных сладостей и веселых каникул. Пусть Дед Мороз исполнит все твои желания!",
            funny: "Эй, {name}! Новый год — время чудес! Желаю тебе найти под ёлкой гору подарков, наесться сладостей до отвала и не спать всю ночь от восторга. Будь хорошим(ей), чтобы Дед Мороз не пропустил твой дом!",
            romantic: "Милый(ая) {name}, с наступающим Новым годом! Желаю тебе верить в чудеса, ведь они действительно случаются. Пусть ангел-хранитель всегда оберегает тебя, а сердце будет наполнено добротой.",
            inspirational: "Дорогой(ая) {name}, с Новым годом! Пусть этот год принесет тебе новые знания, интересные открытия и верных друзей. Стремись к мечте, и у тебя все получится!"
        }
    },
    en: {
        family: {
            formal: "Dear {name}, I sincerely congratulate you on the upcoming New Year! I wish this year brings you and our family much happiness, health, and prosperity. May every day be filled with joy and the warmth of family.",
            friendly: "Hey {name}! Happy New Year! I wish the next year to be even better than the previous one. May all dreams come true, and may loved ones always be by your side. Hot tea, tangerines, and great mood!",
            funny: "Hey {name}! New Year is around the corner! I wish you as much happiness as there are needles on a Christmas tree, as much money as snowflakes outside, and as many reasons for joy as presents under the tree!",
            romantic: "My dear {name}, happy upcoming New Year! On this magical holiday, I wish our love grows stronger. May the next year bring us even more happy moments together.",
            inspirational: "Dear {name}, Happy New Year! May this year become a time of new achievements, bright discoveries, and bold decisions for you. Believe in yourself, and you will succeed!"
        },
        friend: {
            formal: "Dear {name}, I congratulate you on the upcoming New Year! I wish you success in all endeavors, good health, and the fulfillment of your most cherished desires.",
            friendly: "{name}, Happy New Year, friend! May this year be full of cool events, interesting meetings, and unforgettable moments. I wish you drive, positivity, and great company!",
            funny: "So, {name}, ready for New Year's madness? I wish you as much fun next year as now, only stretched over all 365 days! May the champagne be cold and the salad delicious!",
            romantic: "Dear {name}, happy upcoming New Year! May this holiday bring not only new hopes but also true love into your life. I wish you to meet someone who will make you happy every day.",
            inspirational: "{name}, Happy New Year! May this year become a time of growth, development, and new opportunities for you. Believe in your strength, and you will achieve everything you dream of!"
        },
        colleague: {
            formal: "Dear {name}, I sincerely congratulate you on the upcoming New Year! I wish you professional success, stability, and prosperity. May the new year bring new perspectives and achievements.",
            friendly: "{name}, Happy New Year! I wish your work brings you pleasure, colleagues are understanding, and management is fair. Success in your career and balance between work and personal life!",
            funny: "Colleague {name}, Happy New Year! I wish your coffee is strong, deadlines are far, and salary is growing. May the new year have fewer meetings and more holidays!",
            romantic: "Dear {name}, happy upcoming New Year! May this holiday bring not only professional success but also personal happiness. I wish you to meet your soulmate if you haven't yet.",
            inspirational: "{name}, Happy New Year! May this year become a time of professional growth, interesting projects, and new challenges for you. Believe in your strength, and you will succeed!"
        },
        partner: {
            formal: "Dear {name}, I congratulate you on the upcoming New Year! I wish our relationship becomes even stronger, and together we reach new heights. Love, mutual understanding, and harmony.",
            friendly: "My beloved {name}, Happy New Year! I wish us even more joint adventures, laughter, and warm evenings. May our union be as strong as ice on a winter lake and as bright as New Year lights.",
            funny: "My dear {name}, Happy New Year! I wish our quarrels are as short as a winter day, and moments of happiness are as long as a night before an exam. Love you!",
            romantic: "My love {name}, happy upcoming New Year! On this magical holiday, I want to say how much I love you. May our love become stronger with each day, and together we will be happy forever.",
            inspirational: "Dear {name}, Happy New Year! May this year bring us new joint goals, achievements, and growth. Together we can do anything! I love you and believe in us."
        },
        child: {
            formal: "Dear {name}, I congratulate you on the upcoming New Year! I wish you to obey your parents, study well, and always be obedient. May Santa bring you many gifts!",
            friendly: "Hi {name}! Happy New Year! I wish you the coolest toys, delicious sweets, and fun holidays. May Santa fulfill all your wishes!",
            funny: "Hey {name}! New Year is a time for miracles! I wish you to find a mountain of gifts under the tree, eat sweets until you're full, and stay awake all night from delight. Be good so Santa doesn't miss your house!",
            romantic: "My dear {name}, happy upcoming New Year! I wish you to believe in miracles because they really happen. May your guardian angel always protect you, and your heart be filled with kindness.",
            inspirational: "Dear {name}, Happy New Year! May this year bring you new knowledge, interesting discoveries, and loyal friends. Strive for your dream, and you will succeed!"
        }
    },
    uz: {
        family: {
            formal: "Hurmatli {name}! Sizni kirib kelayotgan Yangi yil bilan samimiy tabriklayman. Yangi yil Sizga mustahkam sog'lik, xonadoningizga tinchlik va baraka, ishlaringizda muvaffaqiyat olib kelsin. Hayotingiz quvonchli voqealar, ezgu maqsadlar va yutuqlarga boy bo'lishini tilayman.",
            friendly: "Aziz {name}! Seni kirib kelayotgan Yangi yil bilan chin dildan tabriklayman. Yangi yil hayotingga sog'lik, quvonch va omad olib kelsin. Oilang tinch, ko'ngling xotirjam bo'lsin. Barcha niyatlaring amalga oshib, har kuning baraka va yaxshi kayfiyat bilan o'tsin.",
            funny: "Aziz {name}! Seni Yangi yil bilan tabriklayman! Yangi yil sovg'alari ko'p, tashvishlari kam bo'lsin. Hamyoning hech qachon bo'shab qolmasin, kayfiyating doim yuqori bo'lsin. Qarindoshlar kam gapirib, sen ko'p kuladigan, omadli va quvonchli yil bo'lsin 😄",
            romantic: "Aziz {name}! Seni Yangi yil bilan yurakdan tabriklayman. Yangi yil hayotingga mehr, iliqlik va chiroyli lahzalar olib kelsin. Qalbing tinch, yuzingda tabassum bo'lsin. Har kuni sevgi, e’tibor va baxtli onlar bilan to'lsin.",
            inspirational: "Aziz {name}! Seni Yangi yil bilan chin yurakdan tabriklayman. Yangi yil senga yangi imkoniyatlar, kuch va ishonch olib kelsin. Oldinga dadil qadam tashla, orzularingdan voz kechma. Har bir kuning muvaffaqiyat, ishonch va ilhom bilan to'lsin."
        },
        friend: {
            formal: "Hurmatli {name}! Sizni kirib kelayotgan Yangi yil bilan samimiy tabriklayman. Yangi yil Sizga mustahkam sog'lik, tinchlik va barqarorlik olib kelsin. Ishlaringizda muvaffaqiyat, rejalaringizda yutuqlar va hayotingizda ijobiy o'zgarishlar tilayman.",
            friendly: "Do'stim {name}! Seni Yangi yil bilan chin dildan tabriklayman. Yangi yil hayotingga quvonch, sog'lik va omad olib kelsin. Rejalaring amalga oshib, kunlaring kulgu va ijobiy lahzalarga boy bo'lsin. Har doim yoningda ishonchli do'stlar bo'lishini tilayman.",
            funny: "Xo'sh, {name}, Yangi Yil shov-shuviga tayyormisan? Kelasi yilda senga hozirgi kabi, 365 kun davomida quvnoq bo'lishni tilayman! Turqing sovuq, salat esa mazali bo'lsin!",
            romantic: "Hurmatli {name}, Yangi Yiling bilan! Ushbu bayram hayotinga nafaqat yangi umidlar, balki haqiqiy sevgini ham olib kelsin. Seni har kuni baxtli qiladigan insonni topishingni tilayman.",
            inspirational: "{name}, Yangi Yilingiz muborak! Ushbu yil siz uchun o'sish, rivojlanish va yangi imkoniyatlar davri bo'lsin. Kuchingizga ishoning va siz orzu qilgan hamma narsaga erishasiz!"
        },
        colleague: {
            formal: "Hurmatli {name}, sizni Yangi Yil bilan chin qalbimdan tabriklayman! Kasbiy muvaffaqiyatlar, barqarorlik va farovonlik tilayman. Yangi yil yangi istiqbollar va yutuqlar olib kelsin.",
            friendly: "{name}, Yangi Yilingiz muborak! Ishingiz sizga zavq olib kelishi, hamkorlaringiz tushunarli, rahbarligingiz adolatli bo'lishini tilayman. Karyerangizda muvaffaqiyat va ish-shaxsiy hayotda muvozanatni tilayman!",
            funny: "Hamkor {name}, Yangi Yilingiz muborak! Kofeingiz kuchli, muddatlaringiz uzoq, maoshingiz o'sadigan bo'lsin. Yangi yilda kamroq yig'ilish va ko'proq bayramlar bo'lsin!",
            romantic: "Hurmatli {name}, yangi Yil bilan! Ushbu bayram nafaqat kasbiy muvaffaqiyat, balki shaxsiy baxt ham olib kelsin. Agar hali topmagan bo'lsangiz, ikkinchi yarmingizni topishingizni tilayman.",
            inspirational: "{name}, Yangi Yilingiz muborak! Ushbu yil siz uchun kasbiy o'sish, qiziqarli loyihalar va yangi chaqiriqlar davri bo'lsin. Kuchingizga ishoning va siz muvaffaqiyatga erishasiz!"
        },
        partner: {
            formal: "Hurmatli {name}, sizni Yangi Yil bilan tabriklayman! Munosabatlarimiz yanada mustahkam bo'lishini va birgalikda yangi cho'qqilarga chiqishimizni tilayman. Sevgi, o'zaro tushunish va uyg'unlik.",
            friendly: "Sevgilim {name}, Yangi Yiling muborak! Yana ko'proq birgalikdagi sarguzashtlar, kulgi va issiq kechalar tilayman. Ittifoqimiz qishki ko'l muzi kabi mustahkam va yangi yil chiroqlari kabi yorqin bo'lsin.",
            funny: "Azizim {name}, Yangi Yiling muborak! Janjallarimiz qish kuni kabi qisqa, baxtli lahzalaringiz esa imtihon oldidagi tun kabi uzun bo'lsin. Seni sevaman!",
            romantic: "Sevgim {name}, yangi Yil bilan! Ushbu sehrli bayramda sizni qanchalik sevishimni aytmoqchiman. Sevgi har kuni kuchayib borsin va birgalikda biz abadiy baxtli bo'laylik.",
            inspirational: "Hurmatli {name}, Yangi Yilingiz muborak! Ushbu yil bizga yangi birgalikdagi maqsadlar, yutuqlar va o'sish olib kelsin. Birgalikda biz hamma narsaga qodirmiz! Seni sevaman va bizga ishonaman."
        },
        child: {
            formal: "Hurmatli {name}, sizni Yangi Yil bilan tabriklayman! Ota-onangizga bo'ysunishingiz, yaxshi o'qishingiz va har doim itoatkor bo'lishingizni tilayman. Qor Bobo sizga ko'p sovg'alar olib kelsin!",
            friendly: "Salom {name}! Yangi Yiling muborak! Sizga eng zo'r o'yinchoqlar, mazali shirinliklar va qiziqarli ta'tillar tilayman. Qor Bobo barcha orzularingizni ro'yob chiqarsin!",
            funny: "Hey {name}! Yangi Yil mo''jizalar vaqti! Archa ostida sovg'alar to'pini topishingiz, shirinliklarga to'yguncha yeyishingiz va quvonchdan butun kecha uyqusiz qolishingizni tilayman. Qor Bobo uyingizni o'tkazib yubormasligi uchun yaxshi bo'ling!",
            romantic: "Azizim {name}, yangi Yil bilan! Mo''jizalarga ishonishingizni tilayman, chunki ular haqiqatan ham sodir bo'ladi. Farishtangiz sizni har doim himoya qilsin va qalblingiz mehribonlik bilan to'lsin.",
            inspirational: "Hurmatli {name}, Yangi Yilingiz muborak! Ushbu yil sizga yangi bilimlar, qiziqarli kashfiyotlar va sodiq do'stlar olib kelsin. Orzularingizga intiling va siz muvaffaqiyatga erishasiz!"
        }
    }
};

// Глобальные вопросы для квиза (на всех языках)
const quizQuestions = {
    ru: [
        {
            question: "В какой стране традиционно празднуют Новый год первым в мире?",
            options: ["Австралия", "Новая Зеландия", "Япония", "Китай"],
            correctAnswer: 1
        },
        {
            question: "Какой город считается родиной новогодней ёлки?",
            options: ["Рига (Латвия)", "Страсбург (Франция)", "Берлин (Германия)", "Вена (Австрия)"],
            correctAnswer: 0
        },
        {
            question: "В каком городе Узбекистана ежегодно проходит грандиозный новогодний праздник 'Зимняя сказка'?",
            options: ["Самарканд", "Бухара", "Ташкент", "Хива"],
            correctAnswer: 2
        },
        {
            question: "Какая страна первой встречает Новый год?",
            options: ["Япония", "Австралия", "Новая Зеландия", "Россия"],
            correctAnswer: 2
        },
        {
            question: "Как называется традиционный узбекский новогодний плов?",
            options: ["Ош", "Манты", "Шурпа", "Самса"],
            correctAnswer: 0
        }
    ],
    en: [
        {
            question: "Which country traditionally celebrates New Year first in the world?",
            options: ["Australia", "New Zealand", "Japan", "China"],
            correctAnswer: 1
        },
        {
            question: "Which city is considered the birthplace of the New Year tree?",
            options: ["Riga (Latvia)", "Strasbourg (France)", "Berlin (Germany)", "Vienna (Austria)"],
            correctAnswer: 0
        },
        {
            question: "In which city of Uzbekistan does the grand New Year celebration 'Winter Fairy Tale' take place annually?",
            options: ["Samarkand", "Bukhara", "Tashkent", "Khiva"],
            correctAnswer: 2
        },
        {
            question: "Which country is the first to celebrate New Year?",
            options: ["Japan", "Australia", "New Zealand", "Russia"],
            correctAnswer: 2
        },
        {
            question: "What is the name of the traditional Uzbek New Year pilaf?",
            options: ["Osh", "Manti", "Shurpa", "Samsa"],
            correctAnswer: 0
        }
    ],
    uz: [
        {
            question: "Qaysi mamlakat an'anaviy ravishda dunyoda birinchi bo'lib Yangi Yilni nishonlaydi?",
            options: ["Avstraliya", "Yangi Zelandiya", "Yaponiya", "Xitoy"],
            correctAnswer: 1
        },
        {
            question: "Qaysi shahar Yangi Yil archasining vatani hisoblanadi?",
            options: ["Riga (Latviya)", "Strasburg (Fransiya)", "Berlin (Germaniya)", "Vena (Avstriya)"],
            correctAnswer: 0
        },
        {
            question: "O'zbekistonning qaysi shahrida har yili 'Qishki ertak' nomli ulkan Yangi Yil bayrami o'tkaziladi?",
            options: ["Samarqand", "Buxoro", "Toshkent", "Xiva"],
            correctAnswer: 2
        },
        {
            question: "Qaysi mamlakat birinchi bo'lib Yangi Yilni nishonlaydi?",
            options: ["Yaponiya", "Avstraliya", "Yangi Zelandiya", "Rossiya"],
            correctAnswer: 2
        },
        {
            question: "An'anaviy o'zbekcha Yangi Yil oshining nomi nima?",
            options: ["Osh", "Manti", "Shurpa", "Samsa"],
            correctAnswer: 0
        }
    ]
};

// ====================
// Основные функции
// ====================

// Функция для переключения языка
function switchLanguage(lang) {
    currentLang = lang;
    
    // Обновляем активную кнопку переключателя языка
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Обновляем все тексты на странице
    updateTexts();
    
    // Обновляем вопросы квиза
    loadQuestion();
    
    // Генерируем новое поздравление на выбранном языке
    if (document.getElementById('name').value) {
        generateGreeting();
    }
}

// Функция для обновления текстов на странице
function updateTexts() {
    // Обновляем все элементы с атрибутом data-key
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[currentLang][key]) {
            if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                element.placeholder = translations[currentLang][key];
            } else {
                element.textContent = translations[currentLang][key];
            }
        }
    });
    
    // Обновляем опции в селектах
    updateSelectOptions();
}

// Функция для обновления опций в селектах
function updateSelectOptions() {
    // Обновляем опции в селекте отношений
    const relationshipSelect = document.getElementById('relationship');
    Array.from(relationshipSelect.options).forEach(option => {
        const key = option.getAttribute('data-key');
        if (key && translations[currentLang][key]) {
            option.textContent = translations[currentLang][key];
        }
    });
    
    // Обновляем опции в селекте тона
    const toneSelect = document.getElementById('tone');
    Array.from(toneSelect.options).forEach(option => {
        const key = option.getAttribute('data-key');
        if (key && translations[currentLang][key]) {
            option.textContent = translations[currentLang][key];
        }
    });
}

// Функция счетчика времени до Нового года
function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextYear = currentYear + 1;
    const newYearDate = new Date(`January 1, ${nextYear} 00:00:00`);
    
    const timeDiff = newYearDate - now;
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    // Создаем эффект фейерверка при смене секунд
    if (seconds === 0 || seconds === 30) {
        createFirework();
    }
}

// Функция генератора поздравлений
function generateGreeting() {
    const name = document.getElementById('name').value || translations[currentLang]['namePlaceholder'].replace('Введите имя', 'друг').replace('Enter name', 'friend').replace('Ism kiriting', 'do\'stim');
    const relationship = document.getElementById('relationship').value;
    const tone = document.getElementById('tone').value;
    
    let greeting = greetingTemplates[currentLang][relationship][tone];
    greeting = greeting.replace(/{name}/g, name);
    
    document.getElementById('greeting-text').textContent = greeting;
    document.getElementById('greeting-result').style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
    
    // Анимация появления
    const greetingText = document.getElementById('greeting-text');
    greetingText.style.opacity = '0';
    greetingText.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        greetingText.style.transition = 'opacity 0.5s, transform 0.5s';
        greetingText.style.opacity = '1';
        greetingText.style.transform = 'translateY(0)';
    }, 100);
}

// Функция копирования поздравления
function copyGreeting() {
    const greetingText = document.getElementById('greeting-text').textContent;
    navigator.clipboard.writeText(greetingText).then(() => {
        const copyBtn = document.getElementById('copy-btn');
        const originalHTML = copyBtn.innerHTML;
        
        // Меняем текст кнопки на всех языках
        let copiedText = '';
        switch(currentLang) {
            case 'ru': copiedText = 'Скопировано!'; break;
            case 'en': copiedText = 'Copied!'; break;
            case 'uz': copiedText = 'Nusxalandi!'; break;
        }
        
        copyBtn.innerHTML = `<i class="fas fa-check"></i> ${copiedText}`;
        copyBtn.style.background = 'linear-gradient(to right, var(--green), #388e3c)';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.background = 'linear-gradient(to right, var(--green), #43a047)';
        }, 2000);
    });
}

// Функции для квиза
function loadQuestion() {
    const questions = quizQuestions[currentLang];
    const question = questions[currentQuestionIndex];
    
    document.getElementById('quiz-question').textContent = question.question;
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('total-questions').textContent = questions.length;
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        if (userAnswers[currentQuestionIndex] === index) {
            optionElement.classList.add('selected');
        }
        optionElement.textContent = option;
        optionElement.dataset.index = index;
        
        optionElement.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(optionElement);
    });
    
    // Обновляем состояние кнопок
    document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;
    
    if (currentQuestionIndex === questions.length - 1) {
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('submit-btn').style.display = 'flex';
    } else {
        document.getElementById('next-btn').style.display = 'flex';
        document.getElementById('submit-btn').style.display = 'none';
    }
}

function selectAnswer(answerIndex) {
    userAnswers[currentQuestionIndex] = answerIndex;
    
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((option, index) => {
        option.classList.remove('selected');
        if (index === answerIndex) {
            option.classList.add('selected');
        }
    });
}

function nextQuestion() {
    const questions = quizQuestions[currentLang];
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function submitQuiz() {
    const questions = quizQuestions[currentLang];
    
    // Подсчет баллов
    score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === questions[index].correctAnswer) {
            score++;
        }
    });
    
    // Показываем правильные/неправильные ответы
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((option, index) => {
        const optionIndex = parseInt(option.dataset.index);
        const questionIndex = currentQuestionIndex;
        
        if (optionIndex === questions[questionIndex].correctAnswer) {
            option.classList.add('correct');
        } else if (optionIndex === userAnswers[questionIndex]) {
            option.classList.add('incorrect');
        }
    });
    
    // Показываем результат
    document.getElementById('final-score').textContent = `${score}/${questions.length}`;
    document.getElementById('result-message').textContent = getResultMessage(score, questions.length);
    document.getElementById('quiz-result').style.display = 'block';
    document.getElementById('submit-btn').style.display = 'none';
    
    // Прокручиваем к результату
    document.getElementById('quiz-result').scrollIntoView({ behavior: 'smooth' });
}

function getResultMessage(score, total) {
    const percentage = (score / total) * 100;
    
    // Сообщения на разных языках
    const messages = {
        ru: {
            perfect: "Потрясающе! Вы настоящий эксперт в новогодних традициях! 🎉",
            excellent: "Отличный результат! Вы хорошо знаете новогодние традиции!",
            good: "Хороший результат! Вы неплохо разбираетесь в новогодних традициях.",
            average: "Неплохо, но есть куда стремиться!",
            poor: "Попробуйте еще раз, и вы обязательно улучшите результат!"
        },
        en: {
            perfect: "Amazing! You are a real expert in New Year traditions! 🎉",
            excellent: "Excellent result! You know New Year traditions well!",
            good: "Good result! You know New Year traditions quite well.",
            average: "Not bad, but there's room for improvement!",
            poor: "Try again and you'll definitely improve your result!"
        },
        uz: {
            perfect: "Ajoyib! Siz Yangi Yil an'analarida haqiqiy mutaxassissiz! 🎉",
            excellent: "A'lo natija! Siz Yangi Yil an'analarini yaxshi bilasiz!",
            good: "Yaxshi natija! Siz Yangi Yil an'analarini unchalik yomon bilmayabsiz.",
            average: "Yomon emas, lekin yaxshilash uchun joy bor!",
            poor: "Qayta urinib ko'ring va siz natijangizni yaxshilaysiz!"
        }
    };
    
    if (percentage === 100) {
        return messages[currentLang].perfect;
    } else if (percentage >= 80) {
        return messages[currentLang].excellent;
    } else if (percentage >= 60) {
        return messages[currentLang].good;
    } else if (percentage >= 40) {
        return messages[currentLang].average;
    } else {
        return messages[currentLang].poor;
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    document.getElementById('score').textContent = '0';
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'flex';
    loadQuestion();
}

// Визуальные эффекты
function createSnowflakes() {
    const snowflakesCount = 50;
    const container = document.body;
    
    for (let i = 0; i < snowflakesCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.innerHTML = '❄';
        snowflake.classList.add('snowflake');
        
        // Случайная позиция
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.top = `${Math.random() * 100}vh`;
        
        // Случайный размер
        const size = Math.random() * 20 + 10;
        snowflake.style.fontSize = `${size}px`;
        
        // Случайная прозрачность
        snowflake.style.opacity = Math.random() * 0.5 + 0.3;
        
        // Случайная скорость анимации
        const duration = Math.random() * 10 + 10;
        snowflake.style.animation = `fall ${duration}s linear infinite`;
        
        // Добавляем CSS для падения
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fall {
                0% { transform: translateY(-100px) rotate(0deg); }
                100% { transform: translateY(100vh) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        container.appendChild(snowflake);
    }
}

function createFirework() {
    const container = document.body;
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < 15; i++) {
        const firework = document.createElement('div');
        firework.classList.add('firework');
        
        // Случайный цвет
        firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Случайная позиция
        firework.style.left = `${Math.random() * 100}vw`;
        firework.style.top = `${Math.random() * 100}vh`;
        
        container.appendChild(firework);
        
        // Анимация фейерверка
        firework.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: `scale(${Math.random() * 3 + 1})`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });
        
        // Удаляем элемент после анимации
        setTimeout(() => {
            firework.remove();
        }, 1000);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация счетчика
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
    
    // Инициализация переключателя языка
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchLanguage(this.dataset.lang);
        });
    });
    
    // Инициализация генератора поздравлений
    document.getElementById('generate-btn').addEventListener('click', generateGreeting);
    document.getElementById('copy-btn').addEventListener('click', copyGreeting);
    
    // Инициализация квиза
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    document.getElementById('prev-btn').addEventListener('click', prevQuestion);
    document.getElementById('submit-btn').addEventListener('click', submitQuiz);
    document.getElementById('restart-btn').addEventListener('click', restartQuiz);
    
    // Загружаем первый вопрос
    loadQuestion();
    
    // Создаем снежинки
    createSnowflakes();
    
    // Генерируем начальное поздравление
    setTimeout(() => {
        generateGreeting();
    }, 500);
    
    // Добавляем случайные фейерверки
    setInterval(() => {
        if (Math.random() > 0.7) {
            createFirework();
        }
    }, 3000);
});