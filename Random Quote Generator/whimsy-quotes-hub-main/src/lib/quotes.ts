export interface Quote {
  id: string;
  text: string;
  author: string;
  categories: string[];
  language: string;
}

export const quotes: Quote[] = [
  {
    id: "1",
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
    categories: ["Inspiration", "Motivation"],
    language: "English"
  },
  {
    id: "2",
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    categories: ["Success", "Motivation"],
    language: "English"
  },
  {
    id: "3",
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    categories: ["Life", "Wisdom"],
    language: "English"
  },
  {
    id: "4",
    text: "Love all, trust a few, do wrong to none.",
    author: "William Shakespeare",
    categories: ["Love", "Wisdom"],
    language: "English"
  },
  {
    id: "5",
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    categories: ["Success", "Motivation", "Work"],
    language: "English"
  },
  {
    id: "6",
    text: "The unexamined life is not worth living.",
    author: "Socrates",
    categories: ["Philosophy", "Wisdom"],
    language: "English"
  },
  {
    id: "7",
    text: "Happiness is not something ready-made. It comes from your own actions.",
    author: "Dalai Lama",
    categories: ["Happiness", "Wisdom"],
    language: "English"
  },
  {
    id: "8",
    text: "The only way to achieve true success is to express yourself completely in service to society.",
    author: "Aristotle",
    categories: ["Philosophy", "Success"],
    language: "English"
  },
  {
    id: "9",
    text: "Life is about growth and exploration, not achieving a fixed state of balance.",
    author: "James Hollis",
    categories: ["Growth", "Life"],
    language: "English"
  },
  {
    id: "10",
    text: "The greatest happiness of life is the conviction that we are loved.",
    author: "Victor Hugo",
    categories: ["Happiness", "Love"],
    language: "English"
  },
  {
    id: "11",
    text: "Growth is painful. Change is painful. But nothing is as painful as staying stuck somewhere you don't belong.",
    author: "Mandy Hale",
    categories: ["Growth", "Motivation"],
    language: "English"
  }
];

export const categories = [
  "All",
  "Inspiration",
  "Wisdom",
  "Life",
  "Success",
  "Love",
  "Motivation",
  "Philosophy",
  "Happiness",
  "Growth"
];
