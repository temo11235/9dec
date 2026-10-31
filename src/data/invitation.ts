export type Lang = "ar" | "en";
export type Bi = { ar: string; en: string };
export type LangPair = { ar: Lang; en: Lang };

export const LANGS: Lang[] = ["ar", "en"];

/** Event facts – the single source of truth used across the invitation. */
export const EVENT = {
  groomAr: "محمود",
  groomEn: "Mahmoud",
  brideAr: "آية",
  brideEn: "Aya",
  groomFatherAr: "أحمد السنهوري",
  groomFatherEn: "Ahmed El Senhory",
  brideFatherAr: "أيمن الرويعي",
  brideFatherEn: "Ayman El Roweii",
  dateAr: "الأربعاء",
  dateLongAr: "9 ديسمبر 2026",
  dateEn: "Wednesday",
  dateLongEn: "December 9, 2026",
  timeAr: "8:00 مساءً",
  timeEn: "8:00 PM",
  venueAr: "قاعة مارسيليا جاردن",
  venueEn: "Marsilia Garden Hall",
  addressAr: ["أول الطريق الدولي، 45 ميامي", "أمام مدرسة القدس الدولية"],
  addressEn: ["First International Road, 45 Miami", "In front of Al-Quds International School"],
  mapsUrl: "https://maps.app.goo.gl/dAiuf6DiQkiPARSD8",
  mapsCoordinates: "31.250454,30.021929",
  timeZone: "Africa/Cairo",
  /** 9 December 2026, 8:00 PM in the venue's local time (Alexandria). */
  startsAt: { year: 2026, month: 12, day: 9, hour: 20, minute: 0 },
  hashtag: "#MahmoudAndAya",
} as const;

/** Exact place pin resolved from the supplied short link (Marsilia Garden). */
export const mapEmbedUrl = (lang: Lang) =>
  `https://maps.google.com/maps?q=${EVENT.mapsCoordinates}&z=16&hl=${
    lang === "ar" ? "ar" : "en"
  }&output=embed`;

/** Marsilia Garden Hall — real venue photography. */
export const VENUE_IMAGES = [
  {
    src: "/images/venue-main.jpg",
    alt: {
      ar: "قاعة مارسيليا جاردن من الداخل: سرادق أبيض بالثريات والأضواء المتدلية وطاولات الاستقبال المزينة بالزهور",
      en: "Marsilia Garden Hall interior: white marquee with chandeliers, fairy lights and flower-dressed reception tables",
    } satisfies Bi,
  },
  {
    src: "/images/venue-2.jpg",
    alt: {
      ar: "منصة مارسيليا جاردن المزينة بالورود البيضاء والأريكة الزرقاء واللمسات الذهبية",
      en: "The Marsilia Garden stage dressed in white roses around a blue velvet sofa with gold details",
    } satisfies Bi,
  },
  {
    src: "/images/venue-entrance.jpg",
    alt: {
      ar: "مدخل قاعة مارسيليا جاردن بإضاءة لافتة MARSEILA GARDEN ليلاً",
      en: "The illuminated MARSEILA GARDEN entrance of the venue at night",
    } satisfies Bi,
  },
  {
    src: "/images/venue-walkway.jpg",
    alt: {
      ar: "ممر حدائق مارسيليا جاردن المزروع بالأقواس الخضراء والإضاءة الدافئة",
      en: "Marsilia Garden's tree-lined walkway with green arches and warm lighting",
    } satisfies Bi,
  },
] as const;

export const VENUE_CAPTIONS = [
  { ar: "أجواء القاعة", en: "The reception hall" },
  { ar: "منصة الاحتفال", en: "The celebration stage" },
  { ar: "مدخل مارسيليا جاردن", en: "Marsilia Garden entrance" },
  { ar: "ممر الحدائق", en: "The garden walkway" },
] as const;

export const copy = {
  meta: {
    docTitle: {
      ar: "محمود & آية | دعوة خطوبة",
      en: "Mahmoud & Aya | Engagement Invitation",
    },
  },
  common: {
    and: { ar: "و", en: "&" },
    engagement: { ar: "خطوبة", en: "Engagement" },
    engagementCelebration: { ar: "حفل خطوبة", en: "Engagement Celebration" },
    namesAr: { ar: "محمود & آية", en: "محمود & آية" },
    namesEn: { ar: "Mahmoud & Aya", en: "Mahmoud & Aya" },
    monogram: { ar: "م & آ", en: "M & A" },
    withLove: { ar: "بكل الحب", en: "With love" },
    families: { ar: "بحضور الأهل والأحباب", en: "Together with our families" },
    groom: { ar: "العريس", en: "The Groom" },
    bride: { ar: "العروسة", en: "The Bride" },
    groomName: { ar: EVENT.groomAr, en: EVENT.groomEn },
    brideName: { ar: EVENT.brideAr, en: EVENT.brideEn },
    groomFatherLabel: { ar: "والد العريس", en: "Father of the Groom" },
    brideFatherLabel: { ar: "والد العروسة", en: "Father of the Bride" },
    groomFatherName: { ar: EVENT.groomFatherAr, en: EVENT.groomFatherEn },
    brideFatherName: { ar: EVENT.brideFatherAr, en: EVENT.brideFatherEn },
    dateDay: { ar: EVENT.dateAr, en: EVENT.dateEn },
    dateLong: { ar: EVENT.dateLongAr, en: EVENT.dateLongEn },
    time: { ar: EVENT.timeAr, en: EVENT.timeEn },
    dateLabel: { ar: "التاريخ", en: "The Date" },
    timeLabel: { ar: "الساعة", en: "At" },
    venue: { ar: EVENT.venueAr, en: EVENT.venueEn },
    address: { ar: EVENT.addressAr, en: EVENT.addressEn },
  },
  envelope: {
    eyebrow: { ar: "دعوة حفل خطوبة", en: "An Engagement Celebration" },
    scriptTitle: { ar: "دعوة خطوبة", en: "Engagement Invitation" },
    cordial: {
      ar: "الدعوة لحضور حفل خطوبتنا",
      en: "You are cordially invited to our engagement",
    },
    intro: {
      ar: "بكل الحب والتقدير، نتشرف بدعوتكم لمشاركتنا فرحة الخطوبة",
      en: "Together with joyful hearts, we invite you to share the beginning of our forever.",
    },
    open: { ar: "افتح الدعوة", en: "Open Invitation" },
    opening: { ar: "جارٍ فتح الدعوة…", en: "Opening the invitation…" },
    autoNote: {
      ar: "سيبدأ التمرير التلقائي بهدوء بعد فتح الدعوة",
      en: "Gentle auto scroll begins after you open the invitation",
    },
    audioNote: {
      ar: "الموسيقى تبدأ بلمستك",
      en: "Music begins with your touch",
    },
    sealAlt: { ar: "خاتم شمع على شكل قلب يحمل قلبين متشابكين", en: "Heart wax seal with two intertwined hearts" },
    cardEyebrow: { ar: "بكل الحب والتقدير", en: "With love and appreciation" },
    cardInvite: {
      ar: "نتشرف بدعوتكم لحضور حفل خطوبة",
      en: "We invite you to celebrate our engagement",
    },
    skip: { ar: "فتح الدعوة كاملة", en: "Reveal the full invitation" },
  },
  intro: {
    eyebrow: { ar: "بكل الحب والتقدير", en: "With love and warmest regards" },
    heading: { ar: "نتشرف بدعوتكم لحضور حفل خطوبة", en: "We invite you to celebrate our engagement" },
    subtitle: {
      ar: "بكل الحب والتقدير، نتشرف بدعوتكم لحضور حفل خطوبة",
      en: "With great pleasure, we invite you to celebrate our engagement.",
    },
    quote: {
      ar: "قلبان، رحلة واحدة… وحكاية تكتمل بوجودكم",
      en: "Two hearts, one journey… a lifetime of love.",
    },
    dateLine: {
      ar: "الأربعاء · 9 ديسمبر 2026 · 8:00 مساءً",
      en: "Wednesday · December 9, 2026 · 8:00 PM",
    },
    scrollHint: { ar: "مرّر لاكتشاف تفاصيل الدعوة", en: "Scroll to discover the invitation" },
  },
  parents: {
    eyebrow: { ar: "من عائلتينا", en: "From our families" },
    heading: { ar: "بحضور الأهل والأحباب", en: "With the blessing of our families" },
    subheading: {
      ar: "نحتفي بحبنا مع من نحب",
      en: "Two families, joined in celebrating a beautiful beginning.",
    },
    divider: { ar: "قلبان تحت سماء واحدة", en: "Two hearts, one celebration" },
  },
  when: {
    eyebrow: { ar: "احفظوا التاريخ", en: "Save the date" },
    heading: { ar: "موعدنا مع الفرح", en: "When we celebrate" },
    celebrationTitle: { ar: "نتطلع لمشاركتكم هذه اللحظة المميزة", en: "We look forward to your presence" },
    celebrationEn: {
      ar: "We look forward to celebrating this special day with you.",
      en: "We look forward to celebrating this special day with you.",
    },
    calendarAria: { ar: "التاريخ: الأربعاء 9 ديسمبر 2026", en: "Date: Wednesday, December 9, 2026" },
    clockAria: { ar: "الوقت: 8:00 مساءً", en: "Time: 8:00 PM" },
  },
  countdown: {
    eyebrow: { ar: "العد التنازلي", en: "The countdown" },
    heading: { ar: "متبقٍ على لحظة فرحتنا", en: "Counting down to our engagement" },
    subheading: {
      ar: "كل ثانية تقرّبنا من لحظة لا تُنسى",
      en: "Every second brings us closer to a beautiful beginning.",
    },
    days: { ar: "الأيام", en: "Days" },
    hours: { ar: "الساعات", en: "Hours" },
    minutes: { ar: "الدقائق", en: "Minutes" },
    seconds: { ar: "الثواني", en: "Seconds" },
    today: { ar: "اليوم موعدنا", en: "Today is the day" },
    pastTitle: { ar: "مبارك… بدأت لحظتنا المميزة", en: "The wait is over — our celebration has begun" },
    pastBody: {
      ar: "شكرًا لكل من شاركنا الفرحة. وجودكم في قلوبنا دائمًا.",
      en: "Thank you to everyone who shared this joy with us. Your presence stays in our hearts.",
    },
    liveLabel: { ar: "الوقت المتبقي", en: "Time remaining" },
    finished: { ar: "اكتمل العد التنازلي", en: "Countdown complete" },
  },
  venue: {
    eyebrow: { ar: "مكان الاحتفال", en: "The venue" },
    heading: { ar: EVENT.venueAr, en: EVENT.venueEn },
    tagline: {
      ar: "بين الحدائق والأنوار، تبدأ أجمل الحكايات",
      en: "An evening of garden light, soft blooms and beautiful beginnings.",
    },
    body: {
      ar: "نلتقي في أمسية استثنائية بين الحدائق والأنوار، لنحتفل معًا ببدايةٍ جديدة مليئة بالحب.",
      en: "Join us for an exceptional evening of gardens and gentle light as we celebrate a new beginning, surrounded by those we love.",
    },
    addressLabel: { ar: "العنوان", en: "Address" },
    galleryLabel: { ar: "لمحة عن الأجواء", en: "A glimpse of the atmosphere" },
    galleryNote: {
      ar: "لحظات من قاعة مارسيليا جاردن في انتظاركم.",
      en: "Moments from Marsilia Garden Hall, waiting for you.",
    },
    mapsButton: {
      ar: "افتح الموقع على خرائط جوجل",
      en: "Open Location on Google Maps",
    },
    mapsAria: {
      ar: EVENT.venueAr,
      en: `Open the location of ${EVENT.venueEn} in Google Maps`,
    },
  },
  location: {
    eyebrow: { ar: "العنوان والوصول", en: "Location & directions" },
    heading: { ar: "ستجدوننا هنا", en: "Find your way to us" },
    intro: {
      ar: "في قلب الإسكندرية، على الطريق الدولي، بانتظار حضوركم.",
      en: "On the International Road in Alexandria, we will be waiting for you.",
    },
    mapBadge: { ar: "موقع القاعة التقريبي", en: "Approximate venue location" },
    mapTitle: { ar: "خريطة موقع قاعة مارسيليا جاردن", en: "Map location of Marsilia Garden Hall" },
    mapFallback: {
      ar: "إذا لم تظهر الخريطة، افتح الموقع مباشرة عبر خرائط جوجل.",
      en: "If the map does not load, open the venue directly in Google Maps.",
    },
    directionsHeading: { ar: "خطوات الوصول", en: "Directions" },
    steps: {
      ar: [
        "اذهب إلى الطريق الدولي",
        "استمر إلى 45 ميامي",
        "ستجد القاعة أمام مدرسة القدس الدولية",
      ],
      en: [
        "Go to the International Road",
        "Continue to 45 Miami",
        "You will find the hall in front of Al-Quds International School",
      ],
    },
    note: {
      ar: "إرشادات عامة للوصول — افتح الخريطة للاطلاع على المسار المباشر.",
      en: "General directions only — open the map for live navigation.",
    },
    qrTitle: { ar: "امسح للوصول", en: "Scan to get directions" },
    qrBody: {
      ar: "وجّه كاميرا هاتفك إلى الرمز، ليأخذك مباشرة إلى موقع القاعة.",
      en: "Point your phone camera at the code to open the venue location.",
    },
    qrAlt: {
      ar: "رمز QR يقود إلى موقع قاعة مارسيليا جاردن على خرائط جوجل",
      en: "QR code linking to Marsilia Garden Hall on Google Maps",
    },
    qrLoading: { ar: "جارٍ إنشاء رمز الوصول…", en: "Generating your access code…" },
    qrError: {
      ar: "تعذّر توليد رمز QR. يمكنك استخدام الزر أعلاه للوصول للموقع.",
      en: "The QR code could not be generated. Please use the button above.",
    },
    mapsButton: {
      ar: "الاتجاهات على خرائط جوجل",
      en: "Google Maps directions",
    },
    hashtag: { ar: EVENT.hashtag, en: EVENT.hashtag },
  },
  final: {
    eyebrow: { ar: "وتبقى الحكاية", en: "And so it begins" },
    heading: { ar: "وجودكم يسعدنا ويكمل فرحتنا", en: "Your presence will make our joy complete." },
    line1: { ar: "ننتظركم بكل الحب ❤️", en: "Looking forward to celebrating with you." },
    line2: {
      ar: "حضوركم أغلى هدية… ولحظتنا تكتمل بكم.",
      en: "Your presence is the greatest gift, and our joy is complete with you.",
    },
    dateLine: {
      ar: "الأربعاء · 9 ديسمبر 2026",
      en: "Wednesday · December 9, 2026",
    },
    returnButton: { ar: "العودة إلى بداية الدعوة", en: "Return to the beginning" },
    restartHint: { ar: "لتعيش اللحظة من جديد", en: "Experience the opening once more" },
    closing: { ar: "صُنعت هذه الدعوة بكل الحب", en: "Made with love, for the people we love" },
    namesAria: { ar: "محمود وآية", en: "Mahmoud and Aya" },
  },
  controls: {
    ariaLabel: { ar: "أدوات الدعوة", en: "Invitation controls" },
    music: { ar: "الموسيقى", en: "Music" },
    playMusic: { ar: "تشغيل الموسيقى", en: "Play music" },
    pauseMusic: { ar: "إيقاف الموسيقى", en: "Pause music" },
    musicUnavailable: { ar: "الملف الموسيقي غير متوفر", en: "Music file not available" },
    musicLoading: { ar: "جارٍ تحميل الموسيقى", en: "Loading music" },
    pause: { ar: "إيقاف الحركة", en: "Pause" },
    resume: { ar: "متابعة", en: "Resume" },
    playing: { ar: "التمرير يعمل", en: "Auto scroll" },
    paused: { ar: "التمرير متوقف", en: "Paused" },
    finished: { ar: "ختام الدعوة", en: "The end" },
    restart: { ar: "إعادة البدء", en: "Restart" },
    restartTitle: { ar: "إعادة عرض الدعوة؟", en: "Replay the invitation?" },
    restartBody: {
      ar: "ستعود إلى المغلّف المزخرف من جديد، وستتوقف الموسيقى حتى تفتح الدعوة مرة أخرى.",
      en: "You will return to the decorated envelope. Music will pause until you open the invitation again.",
    },
    cancel: { ar: "ليس الآن", en: "Not now" },
    confirmRestart: { ar: "نعم، أعِد البداية", en: "Yes, replay it" },
    language: { ar: "اللغة", en: "Language" },
    switchTo: { ar: "Switch to English", en: "التبديل إلى العربية" },
    reduceMotionNotice: {
      ar: "التمرير التلقائي متوقف احترامًا لإعداد تقليل الحركة. يمكنك تشغيله يدويًا.",
      en: "Auto scroll is paused to respect reduced-motion settings. You can start it manually.",
    },
    progress: { ar: "تقدم الدعوة", en: "Invitation progress" },
    openedNote: {
      ar: "تفضل بجولة هادئة في الدعوة. يمكنك إيقاف التمرير التلقائي في أي وقت.",
      en: "Take your time. You can pause the gentle auto scroll whenever you like.",
    },
    close: { ar: "إغلاق", en: "Close" },
    toastMissingAudio: {
      ar: "لم يُضف ملف الصوت بعد. ضع engagement-music.mp3 داخل مجلد public/audio وسيعمل زر الموسيقى تلقائيًا.",
      en: "No soundtrack file has been added yet. Place engagement-music.mp3 in public/audio and the music control will work automatically.",
    },
    musicError: {
      ar: "تعذّر تشغيل الموسيقى على هذا المتصفح.",
      en: "Music could not be played in this browser.",
    },
    skipToInvitation: { ar: "انتقل إلى الدعوة", en: "Skip to the invitation" },
  },
} as const;

export const t = (pair: Bi | { ar: string; en: string }, lang: Lang): string =>
  lang === "ar" ? pair.ar : pair.en;

export const other = (lang: Lang): Lang => (lang === "ar" ? "en" : "ar");
