import { units } from "@/data/units";
import type { Lesson } from "@/types/learning";

export const lessons: Lesson[] = [
  // ═══════════════════════════════════════════
  // SPANISH — Basics Unit
  // ═══════════════════════════════════════════
  {
    id: "es-basics-1",
    unitId: "es-basics",
    type: "vocabulary",
    title: "Hello & Goodbye",
    description: "Learn common greetings in Spanish.",
    order: 1,
    goals: [
      { description: "Say hello and goodbye", icon: "👋" },
      { description: "Introduce yourself", icon: "🙋" },
    ],
    activities: [
      {
        id: "es-basics-1-act-1",
        type: "multiple-choice",
        prompt: "How do you say 'Hello' in Spanish?",
        options: ["Hola", "Adiós", "Gracias", "Por favor"],
        correctAnswer: "Hola",
      },
      {
        id: "es-basics-1-act-2",
        type: "translation",
        prompt: "Translate 'Goodbye' to Spanish:",
        correctAnswer: "Adiós",
      },
      {
        id: "es-basics-1-act-3",
        type: "fill-blank",
        prompt: "Me llamo ___ (My name is ___)",
        correctAnswer: "llamo",
      },
    ],
    vocabulary: [
      {
        word: "Hola",
        translation: "Hello",
        pronunciation: "OH-lah",
        partOfSpeech: "interjection",
      },
      {
        word: "Adiós",
        translation: "Goodbye",
        pronunciation: "ah-dee-OHS",
        partOfSpeech: "interjection",
      },
      {
        word: "Gracias",
        translation: "Thank you",
        pronunciation: "GRAH-see-ahs",
        partOfSpeech: "interjection",
      },
    ],
    phrases: [
      {
        text: "¿Cómo estás?",
        translation: "How are you?",
        pronunciation: "KOH-moh es-TAHS",
        context: "Informal greeting",
      },
      {
        text: "Me llamo...",
        translation: "My name is...",
        pronunciation: "meh YAH-moh",
        context: "Introducing yourself",
      },
    ],
    teacherPrompt: {
      context:
        "You are teaching a beginner Spanish student their first greeting words.",
      instructions:
        "Speak slowly and clearly. Repeat each word twice. Ask the student to repeat after you.",
      voiceType: "friendly",
      prompts: [
        "Say 'Hola' and ask the student to repeat it.",
        "Explain that 'Hola' means 'Hello' and is used any time of day.",
        "Say 'Adiós' and explain it means 'Goodbye'.",
        "Encourage the student to practice both words in a short roleplay.",
      ],
    },
  },
  {
    id: "es-basics-2",
    unitId: "es-basics",
    type: "audio",
    title: "Polite Phrases",
    description: "Learn how to be polite in Spanish.",
    order: 2,
    goals: [
      { description: "Say please and thank you", icon: "🙏" },
      { description: "Apologize and excuse yourself", icon: "😊" },
    ],
    activities: [
      {
        id: "es-basics-2-act-1",
        type: "multiple-choice",
        prompt: "What does 'Por favor' mean?",
        options: ["Please", "Thank you", "Sorry", "You're welcome"],
        correctAnswer: "Please",
      },
      {
        id: "es-basics-2-act-2",
        type: "listening",
        prompt: "Listen to the phrase and type what you hear:",
        correctAnswer: "Lo siento",
      },
    ],
    vocabulary: [
      {
        word: "Por favor",
        translation: "Please",
        pronunciation: "por fah-VOR",
        partOfSpeech: "phrase",
      },
      {
        word: "Lo siento",
        translation: "I'm sorry",
        pronunciation: "loh see-EHN-toh",
        partOfSpeech: "phrase",
      },
      {
        word: "De nada",
        translation: "You're welcome",
        pronunciation: "deh NAH-dah",
        partOfSpeech: "phrase",
      },
    ],
    phrases: [
      {
        text: "Perdón",
        translation: "Excuse me / Sorry",
        pronunciation: "pehr-DOHN",
        context: "Getting attention or apologizing",
      },
      {
        text: "Muchas gracias",
        translation: "Thank you very much",
        pronunciation: "MOO-chahs GRAH-see-ahs",
        context: "Expressing gratitude",
      },
    ],
    teacherPrompt: {
      context: "You are teaching polite expressions to a Spanish beginner.",
      instructions:
        "Use a warm tone. Explain the cultural importance of politeness in Spanish-speaking countries.",
      voiceType: "friendly",
      prompts: [
        "Introduce 'Por favor' and explain when to use it.",
        "Roleplay a scenario where the student asks for something politely.",
        "Teach 'Lo siento' and practice an apology scenario.",
      ],
    },
  },

  // ═══════════════════════════════════════════
  // SPANISH — Food & Drink Unit
  // ═══════════════════════════════════════════
  {
    id: "es-food-1",
    unitId: "es-food",
    type: "vocabulary",
    title: "Common Foods",
    description: "Name basic foods and drinks in Spanish.",
    order: 1,
    goals: [
      { description: "Name common foods", icon: "🍎" },
      { description: "Order a drink", icon: "🥤" },
    ],
    activities: [
      {
        id: "es-food-1-act-1",
        type: "multiple-choice",
        prompt: "How do you say 'water' in Spanish?",
        options: ["Agua", "Leche", "Pan", "Arroz"],
        correctAnswer: "Agua",
      },
      {
        id: "es-food-1-act-2",
        type: "translation",
        prompt: "Translate 'bread' to Spanish:",
        correctAnswer: "Pan",
      },
      {
        id: "es-food-1-act-3",
        type: "fill-blank",
        prompt: "Quiero un ___ de agua (I want a ___ of water)",
        correctAnswer: "vaso",
      },
    ],
    vocabulary: [
      {
        word: "Agua",
        translation: "Water",
        pronunciation: "AH-gwah",
        partOfSpeech: "noun",
      },
      {
        word: "Pan",
        translation: "Bread",
        pronunciation: "pahn",
        partOfSpeech: "noun",
      },
      {
        word: "Leche",
        translation: "Milk",
        pronunciation: "LEH-cheh",
        partOfSpeech: "noun",
      },
      {
        word: "Arroz",
        translation: "Rice",
        pronunciation: "ah-ROHS",
        partOfSpeech: "noun",
      },
    ],
    phrases: [
      {
        text: "Quiero un café",
        translation: "I want a coffee",
        pronunciation: "KYEH-roh oon kah-FEH",
        context: "Ordering at a cafe",
      },
      {
        text: "La cuenta, por favor",
        translation: "The bill, please",
        pronunciation: "lah KWEN-tah por fah-VOR",
        context: "At a restaurant",
      },
    ],
    teacherPrompt: {
      context:
        "You are teaching food and drink vocabulary to a beginner Spanish student.",
      instructions:
        "Use visual cues. Say each food word slowly and ask the student to repeat.",
      voiceType: "enthusiastic",
      prompts: [
        "Introduce common food words: pan, agua, leche, arroz.",
        "Create a mock restaurant scenario and practice ordering.",
        "Ask the student what their favorite food is in Spanish.",
      ],
    },
  },

  // ═══════════════════════════════════════════
  // FRENCH — Greetings Unit
  // ═══════════════════════════════════════════
  {
    id: "fr-greetings-1",
    unitId: "fr-greetings",
    type: "vocabulary",
    title: "Hello & Introductions",
    description: "Learn how to greet people in French.",
    order: 1,
    goals: [
      { description: "Say hello and goodbye in French", icon: "👋" },
      { description: "Introduce yourself", icon: "🙋" },
    ],
    activities: [
      {
        id: "fr-greetings-1-act-1",
        type: "multiple-choice",
        prompt: "How do you say 'Hello' in French?",
        options: ["Bonjour", "Au revoir", "Merci", "S'il vous plaît"],
        correctAnswer: "Bonjour",
      },
      {
        id: "fr-greetings-1-act-2",
        type: "translation",
        prompt: "Translate 'Goodbye' to French:",
        correctAnswer: "Au revoir",
      },
      {
        id: "fr-greetings-1-act-3",
        type: "fill-blank",
        prompt: "Je m'___ (My name is)",
        correctAnswer: "appelle",
      },
    ],
    vocabulary: [
      {
        word: "Bonjour",
        translation: "Hello / Good day",
        pronunciation: "bohn-ZHOOR",
        partOfSpeech: "interjection",
      },
      {
        word: "Au revoir",
        translation: "Goodbye",
        pronunciation: "oh ruh-VWAHR",
        partOfSpeech: "interjection",
      },
      {
        word: "Merci",
        translation: "Thank you",
        pronunciation: "mehr-SEE",
        partOfSpeech: "interjection",
      },
    ],
    phrases: [
      {
        text: "Je m'appelle...",
        translation: "My name is...",
        pronunciation: "zhuh mah-PEL",
        context: "Introducing yourself",
      },
      {
        text: "Comment allez-vous?",
        translation: "How are you? (formal)",
        pronunciation: "koh-MAHN tah-lay VOO",
        context: "Formal greeting",
      },
    ],
    teacherPrompt: {
      context: "You are teaching beginner French greetings.",
      instructions:
        "Speak clearly with proper French pronunciation. Explain formal vs informal greetings.",
      voiceType: "friendly",
      prompts: [
        "Teach 'Bonjour' and explain it's used until evening.",
        "Teach 'Au revoir' and practice a hello-goodbye roleplay.",
        "Introduce 'Je m'appelle...' and have the student introduce themselves.",
      ],
    },
  },
  {
    id: "fr-greetings-2",
    unitId: "fr-greetings",
    type: "audio",
    title: "Being Polite",
    description: "Essential polite phrases in French.",
    order: 2,
    goals: [
      { description: "Say please and thank you", icon: "🙏" },
      { description: "Apologize in French", icon: "😊" },
    ],
    activities: [
      {
        id: "fr-greetings-2-act-1",
        type: "multiple-choice",
        prompt: "What does 'S'il vous plaît' mean?",
        options: ["Please", "Thank you", "Sorry", "Hello"],
        correctAnswer: "Please",
      },
      {
        id: "fr-greetings-2-act-2",
        type: "listening",
        prompt: "Listen and type the phrase you hear:",
        correctAnswer: "Pardon",
      },
    ],
    vocabulary: [
      {
        word: "S'il vous plaît",
        translation: "Please (formal)",
        pronunciation: "seel voo PLEH",
        partOfSpeech: "phrase",
      },
      {
        word: "Pardon",
        translation: "Sorry / Excuse me",
        pronunciation: "pahr-DOHN",
        partOfSpeech: "interjection",
      },
      {
        word: "De rien",
        translation: "You're welcome",
        pronunciation: "duh ree-EHN",
        partOfSpeech: "phrase",
      },
    ],
    phrases: [
      {
        text: "Excusez-moi",
        translation: "Excuse me",
        pronunciation: "ek-skew-ZAY MWAH",
        context: "Getting attention",
      },
      {
        text: "Merci beaucoup",
        translation: "Thank you very much",
        pronunciation: "mehr-SEE boh-KOO",
        context: "Showing gratitude",
      },
    ],
    teacherPrompt: {
      context: "You are teaching polite French expressions.",
      instructions:
        "Use a warm tone. Emphasize the importance of politeness in French culture.",
      voiceType: "friendly",
      prompts: [
        "Teach 'S'il vous plaît' and practice asking for something politely.",
        "Teach 'Merci' and 'De rien' and practice a gratitude exchange.",
        "Roleplay a scenario where the student accidentally bumps into someone and apologizes.",
      ],
    },
  },

  // ═══════════════════════════════════════════
  // FRENCH — Numbers & Colors Unit
  // ═══════════════════════════════════════════
  {
    id: "fr-numbers-colors-1",
    unitId: "fr-numbers-colors",
    type: "quiz",
    title: "Numbers 1–10",
    description: "Count from 1 to 10 in French.",
    order: 1,
    goals: [
      { description: "Count from 1 to 10", icon: "🔢" },
      { description: "Say your age in French", icon: "🎂" },
    ],
    activities: [
      {
        id: "fr-numbers-colors-1-act-1",
        type: "multiple-choice",
        prompt: "How do you say 'five' in French?",
        options: ["Cinq", "Dix", "Trois", "Huit"],
        correctAnswer: "Cinq",
      },
      {
        id: "fr-numbers-colors-1-act-2",
        type: "translation",
        prompt: "Translate 'three' to French:",
        correctAnswer: "Trois",
      },
      {
        id: "fr-numbers-colors-1-act-3",
        type: "fill-blank",
        prompt: "J'ai ___ ans (I am ___ years old — fill with 'ten')",
        correctAnswer: "dix",
      },
    ],
    vocabulary: [
      {
        word: "Un",
        translation: "One",
        pronunciation: "uhn",
        partOfSpeech: "number",
      },
      {
        word: "Deux",
        translation: "Two",
        pronunciation: "duh",
        partOfSpeech: "number",
      },
      {
        word: "Trois",
        translation: "Three",
        pronunciation: "trwah",
        partOfSpeech: "number",
      },
      {
        word: "Cinq",
        translation: "Five",
        pronunciation: "sank",
        partOfSpeech: "number",
      },
      {
        word: "Dix",
        translation: "Ten",
        pronunciation: "dees",
        partOfSpeech: "number",
      },
    ],
    phrases: [
      {
        text: "J'ai cinq ans",
        translation: "I am five years old",
        pronunciation: "zhay sank ahn",
        context: "Telling your age",
      },
    ],
    teacherPrompt: {
      context: "You are teaching French numbers 1–10 to a beginner.",
      instructions:
        "Count slowly and clearly. Ask the student to count along. Practice with fingers.",
      voiceType: "enthusiastic",
      prompts: [
        "Count from 1 to 10 in French slowly.",
        "Ask the student to repeat each number after you.",
        "Practice the phrase 'J'ai ___ ans' and have the student say their age.",
      ],
    },
  },

  // ═══════════════════════════════════════════
  // JAPANESE — Introductions Unit
  // ═══════════════════════════════════════════
  {
    id: "ja-introductions-1",
    unitId: "ja-introductions",
    type: "vocabulary",
    title: "Basic Greetings",
    description: "Learn essential Japanese greetings.",
    order: 1,
    goals: [
      { description: "Say hello and goodbye in Japanese", icon: "👋" },
      { description: "Introduce yourself politely", icon: "🙇" },
    ],
    activities: [
      {
        id: "ja-introductions-1-act-1",
        type: "multiple-choice",
        prompt: "How do you say 'Hello' in Japanese?",
        options: [
          "こんにちは (Konnichiwa)",
          "さようなら (Sayōnara)",
          "ありがとう (Arigatō)",
          "すみません (Sumimasen)",
        ],
        correctAnswer: "こんにちは (Konnichiwa)",
      },
      {
        id: "ja-introductions-1-act-2",
        type: "translation",
        prompt: "Translate 'Goodbye' to Japanese:",
        correctAnswer: "さようなら",
      },
      {
        id: "ja-introductions-1-act-3",
        type: "fill-blank",
        prompt:
          "___ はじめまして (___ hajimemashite — Nice to meet you, fill with your name + 'to mōshimasu' pattern)",
        correctAnswer: "田中",
      },
    ],
    vocabulary: [
      {
        word: "こんにちは",
        translation: "Hello",
        pronunciation: "kon-nee-chee-wah",
        partOfSpeech: "interjection",
      },
      {
        word: "さようなら",
        translation: "Goodbye",
        pronunciation: "sah-yoh-nah-rah",
        partOfSpeech: "interjection",
      },
      {
        word: "ありがとう",
        translation: "Thank you",
        pronunciation: "ah-ree-gah-toh",
        partOfSpeech: "interjection",
      },
    ],
    phrases: [
      {
        text: "はじめまして",
        translation: "Nice to meet you",
        pronunciation: "hah-jee-meh-mah-shteh",
        context: "First meeting",
      },
      {
        text: "よろしくおねがいします",
        translation: "Please treat me favorably",
        pronunciation: "yoh-roh-shee-ku oh-neh-gah-ee shee-masu",
        context: "After introducing yourself",
      },
    ],
    teacherPrompt: {
      context: "You are teaching basic Japanese greetings to a beginner.",
      instructions:
        "Teach the cultural context — bowing when greeting. Pronounce each word slowly with correct intonation.",
      voiceType: "friendly",
      prompts: [
        "Teach 'Konnichiwa' and explain it's a daytime greeting.",
        "Teach 'Sayōnara' and explain it's used when leaving for a long time.",
        "Practice a self-introduction: name + 'hajimemashite' + 'yoroshiku onegaishimasu'.",
      ],
    },
  },

  // ═══════════════════════════════════════════
  // JAPANESE — Daily Life Unit (new)
  // ═══════════════════════════════════════════
  {
    id: "ja-daily-life-1",
    unitId: "ja-daily-life",
    type: "vocabulary",
    title: "Numbers & Counting",
    description: "Learn to count from 1 to 10 in Japanese.",
    order: 1,
    goals: [
      { description: "Count from 1 to 10", icon: "🔢" },
      { description: "Use numbers in daily life", icon: "🛒" },
    ],
    activities: [
      {
        id: "ja-daily-life-1-act-1",
        type: "multiple-choice",
        prompt: "How do you say 'one' in Japanese?",
        options: ["一 (ichi)", "二 (ni)", "三 (san)", "十 (jū)"],
        correctAnswer: "一 (ichi)",
      },
      {
        id: "ja-daily-life-1-act-2",
        type: "translation",
        prompt: "Translate 'five' to Japanese:",
        correctAnswer: "五 (go)",
      },
    ],
    vocabulary: [
      {
        word: "一",
        translation: "One",
        pronunciation: "ee-chee",
        partOfSpeech: "number",
      },
      {
        word: "二",
        translation: "Two",
        pronunciation: "nee",
        partOfSpeech: "number",
      },
      {
        word: "三",
        translation: "Three",
        pronunciation: "sahn",
        partOfSpeech: "number",
      },
      {
        word: "四",
        translation: "Four",
        pronunciation: "shee",
        partOfSpeech: "number",
      },
      {
        word: "五",
        translation: "Five",
        pronunciation: "goh",
        partOfSpeech: "number",
      },
      {
        word: "十",
        translation: "Ten",
        pronunciation: "jū",
        partOfSpeech: "number",
      },
    ],
    phrases: [
      {
        text: "いくらですか？",
        translation: "How much is it?",
        pronunciation: "ee-koo-rah deh-skah",
        context: "Shopping",
      },
    ],
    teacherPrompt: {
      context: "You are teaching Japanese numbers to a beginner.",
      instructions: "Count slowly and clearly. Practice with fingers.",
      voiceType: "enthusiastic",
      prompts: ["Count from 1 to 10 in Japanese.", "Practice with prices."],
    },
  },
  {
    id: "ja-daily-life-2",
    unitId: "ja-daily-life",
    type: "audio",
    title: "Days of the Week",
    description: "Learn the days of the week in Japanese.",
    order: 2,
    goals: [
      { description: "Say all 7 days", icon: "📅" },
      { description: "Talk about your schedule", icon: "🗓️" },
    ],
    activities: [
      {
        id: "ja-daily-life-2-act-1",
        type: "multiple-choice",
        prompt: "What does '月曜日 (getsuyōbi)' mean?",
        options: ["Monday", "Tuesday", "Wednesday", "Sunday"],
        correctAnswer: "Monday",
      },
      {
        id: "ja-daily-life-2-act-2",
        type: "fill-blank",
        prompt: "___曜日 (___yōbi) means 'Saturday'",
        correctAnswer: "土 (do)",
      },
    ],
    vocabulary: [
      {
        word: "月曜日",
        translation: "Monday",
        pronunciation: "ge-tsu-yō-bi",
        partOfSpeech: "noun",
      },
      {
        word: "火曜日",
        translation: "Tuesday",
        pronunciation: "ka-yō-bi",
        partOfSpeech: "noun",
      },
      {
        word: "水曜日",
        translation: "Wednesday",
        pronunciation: "sui-yō-bi",
        partOfSpeech: "noun",
      },
      {
        word: "日曜日",
        translation: "Sunday",
        pronunciation: "ni-chi-yō-bi",
        partOfSpeech: "noun",
      },
    ],
    phrases: [
      {
        text: "今日は何曜日ですか？",
        translation: "What day is it today?",
        pronunciation: "kyō wa nan-yō-bi desu-ka",
        context: "Daily conversation",
      },
    ],
    teacherPrompt: {
      context: "You are teaching days of the week in Japanese.",
      instructions: "Explain the meaning of each kanji character.",
      voiceType: "friendly",
      prompts: [
        "Teach each day with its kanji meaning.",
        "Practice making a weekly schedule.",
      ],
    },
  },
  {
    id: "ja-daily-life-3",
    unitId: "ja-daily-life",
    type: "vocabulary",
    title: "Daily Routines",
    description: "Describe your daily activities in Japanese.",
    order: 3,
    goals: [
      { description: "Talk about waking up, eating, sleeping", icon: "🌅" },
      { description: "Use basic verbs", icon: "🏃" },
    ],
    activities: [
      {
        id: "ja-daily-life-3-act-1",
        type: "multiple-choice",
        prompt: "What does '起きる (okiru)' mean?",
        options: ["To wake up", "To eat", "To sleep", "To run"],
        correctAnswer: "To wake up",
      },
    ],
    vocabulary: [
      {
        word: "起きる",
        translation: "To wake up",
        pronunciation: "o-ki-ru",
        partOfSpeech: "verb",
      },
      {
        word: "食べる",
        translation: "To eat",
        pronunciation: "ta-be-ru",
        partOfSpeech: "verb",
      },
      {
        word: "寝る",
        translation: "To sleep",
        pronunciation: "ne-ru",
        partOfSpeech: "verb",
      },
      {
        word: "行く",
        translation: "To go",
        pronunciation: "i-ku",
        partOfSpeech: "verb",
      },
    ],
    phrases: [
      {
        text: "毎朝７時に起きます",
        translation: "I wake up at 7 every morning",
        pronunciation: "mai-asa shichi-ji ni o-ki-masu",
        context: "Daily routine",
      },
    ],
    teacherPrompt: {
      context: "You are teaching daily routine verbs.",
      instructions: "Use gestures and examples.",
      voiceType: "friendly",
      prompts: [
        "Teach each verb with a gesture.",
        "Ask about the student's daily routine.",
      ],
    },
  },

  // ═══════════════════════════════════════════
  // JAPANESE — Food & Travel Unit (new)
  // ═══════════════════════════════════════════
  {
    id: "ja-food-travel-1",
    unitId: "ja-food-travel",
    type: "vocabulary",
    title: "Food & Drinks",
    description: "Order food and name common dishes in Japanese.",
    order: 1,
    goals: [
      { description: "Name common foods", icon: "🍜" },
      { description: "Order at a restaurant", icon: "🏪" },
    ],
    activities: [
      {
        id: "ja-food-travel-1-act-1",
        type: "multiple-choice",
        prompt: "What does 'お茶 (ocha)' mean?",
        options: ["Tea", "Coffee", "Water", "Juice"],
        correctAnswer: "Tea",
      },
    ],
    vocabulary: [
      {
        word: "お茶",
        translation: "Tea",
        pronunciation: "o-cha",
        partOfSpeech: "noun",
      },
      {
        word: "ご飯",
        translation: "Rice / Meal",
        pronunciation: "go-han",
        partOfSpeech: "noun",
      },
      {
        word: "水",
        translation: "Water",
        pronunciation: "mi-zu",
        partOfSpeech: "noun",
      },
      {
        word: "ラーメン",
        translation: "Ramen",
        pronunciation: "rā-men",
        partOfSpeech: "noun",
      },
    ],
    phrases: [
      {
        text: "メニューを見せてください",
        translation: "Please show me the menu",
        pronunciation: "me-nyū o mi-se-te ku-da-sai",
        context: "At a restaurant",
      },
      {
        text: "お会計お願いします",
        translation: "Check please",
        pronunciation: "o-kai-kei o-ne-gai shi-masu",
        context: "Paying the bill",
      },
    ],
    teacherPrompt: {
      context: "You are teaching food vocabulary.",
      instructions: "Use enthusiasm when talking about food.",
      voiceType: "enthusiastic",
      prompts: [
        "Introduce popular Japanese dishes.",
        "Practice ordering at a restaurant.",
      ],
    },
  },
  {
    id: "ja-food-travel-2",
    unitId: "ja-food-travel",
    type: "quiz",
    title: "Travel Essentials",
    description: "Essential phrases for traveling in Japan.",
    order: 2,
    goals: [
      { description: "Ask for directions", icon: "🗺️" },
      { description: "Use public transport", icon: "🚃" },
    ],
    activities: [
      {
        id: "ja-food-travel-2-act-1",
        type: "multiple-choice",
        prompt: "How do you ask 'Where is the station?'",
        options: [
          "駅はどこですか？",
          "トイレはどこですか？",
          "いくらですか？",
          "お名前は？",
        ],
        correctAnswer: "駅はどこですか？",
      },
    ],
    vocabulary: [
      {
        word: "駅",
        translation: "Station",
        pronunciation: "e-ki",
        partOfSpeech: "noun",
      },
      {
        word: "トイレ",
        translation: "Toilet / Restroom",
        pronunciation: "to-i-re",
        partOfSpeech: "noun",
      },
      {
        word: "出口",
        translation: "Exit",
        pronunciation: "de-gu-chi",
        partOfSpeech: "noun",
      },
      {
        word: "入口",
        translation: "Entrance",
        pronunciation: "i-ri-gu-chi",
        partOfSpeech: "noun",
      },
    ],
    phrases: [
      {
        text: "すみません、道に迷いました",
        translation: "Excuse me, I'm lost",
        pronunciation: "su-mi-ma-sen, mi-chi ni ma-yo-i-ma-shi-ta",
        context: "Getting help",
      },
      {
        text: "これをください",
        translation: "I'll take this please",
        pronunciation: "ko-re o ku-da-sai",
        context: "Shopping",
      },
    ],
    teacherPrompt: {
      context: "You are teaching travel phrases.",
      instructions: "Use realistic travel scenarios.",
      voiceType: "friendly",
      prompts: [
        "Roleplay asking for directions.",
        "Practice buying a train ticket.",
      ],
    },
  },
];

// ── Helper Functions ─────────────────────────

export function getLessonsByUnit(unitId: string): Lesson[] {
  return lessons
    .filter((lesson) => lesson.unitId === unitId)
    .sort((a, b) => a.order - b.order);
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getLessonsByLanguage(languageId: string): Lesson[] {
  const langUnits = units.filter((unit) => unit.languageId === languageId);
  const unitIds = new Set(langUnits.map((u) => u.id));
  return lessons
    .filter((lesson) => unitIds.has(lesson.unitId))
    .sort((a, b) => a.order - b.order);
}
