// src/constants/products.js

export const MOCK_PRODUCTS = [
  {
    id: 1,
    slug: "brazil-espresso",
    name: "اسپرسو برزیل",
    englishName: "Brazil Espresso",
    country: "برزیل",
    type: "اسپرسو",
    category: "espresso",
    recommended: true,
    img: "/images/test2.jpg",
    price: 320000,
    flavor: {
      bitter: 70,
      energy: 80,
      complexity: 60,
    },
    description:
      "ترکیب کلاسیک اسپرسوی برزیل با بادی متوسط، تلخی متعادل و روست ویژه مناسب شات‌های روزانه و لاته.",
  },
  {
    id: 2,
    slug: "colombia-single-origin",
    name: "قهوه کلمبیا",
    englishName: "Colombia Single Origin",
    country: "کلمبیا",
    type: "تک‌خاستگاه",
    category: "single-origin",
    recommended: false,
    img: "/images/test3.jpg",
    price: 360000,
    flavor: {
      bitter: 40,
      energy: 65,
      complexity: 80,
    },
    description:
      "دانه عربیکای شسته‌شده از ارتفاعات کلمبیا با اسیدیته‌ی میوه‌ای، پیچیدگی عطری بالا و فینیش طولانی.",
  },
  {
    id: 3,
    slug: "rash-special-blend",
    name: "ترکیب ویژه رش",
    englishName: "Rash Special Blend",
    country: "ترکیب اختصاصی",
    type: "بلند اختصاصی",
    category: "blend",
    recommended: true,
    img: "/images/test4.jpg",
    price: 390000,
    flavor: {
      bitter: 55,
      energy: 90,
      complexity: 75,
    },
    description:
      "بلند اختصاصی رش برای اسپرسو و شیرمبنا؛ کرمای ضخیم، کافئین بالا و طعمی متعادل بین تلخی و شیرینی.",
  },
];

export function getProductBySlug(slug) {
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
}
