// src/lib/phone.js
export function normalizeIranPhone(input = "") {
  let s = String(input).trim();

  // تبدیل اعداد فارسی/عربی به انگلیسی
  const map = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
    "٠": "0",
    "١": "1",
    "٢": "2",
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9",
  };
  s = s.replace(/[۰-۹٠-٩]/g, (d) => map[d] ?? d);

  // حذف فاصله/خط تیره/...
  s = s.replace(/[^\d+]/g, "");

  // 0098 -> +98
  if (s.startsWith("0098")) s = "+98" + s.slice(4);

  // 098 -> +98
  if (s.startsWith("098")) s = "+98" + s.slice(3);

  // 98xxxxxxxxxx -> +98...
  if (s.startsWith("98") && !s.startsWith("+98")) s = "+98" + s.slice(2);

  // 0xxxxxxxxxx -> +98xxxxxxxxxx
  if (s.startsWith("0")) s = "+98" + s.slice(1);

  // 9xxxxxxxxx -> +989xxxxxxxxx
  if (s.startsWith("9")) s = "+98" + s;

  return s;
}

export function isValidIranMobile(input = "") {
  const phone = normalizeIranPhone(input);
  return /^\+989\d{9}$/.test(phone);
}
