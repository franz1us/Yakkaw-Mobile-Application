import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import th from './locales/th.json';

i18n
  .use(initReactI18next) // ใช้ react-i18next
  .init({
    fallbackLng: 'en', // ภาษาเริ่มต้น
    lng: 'en', // ภาษาที่จะใช้งาน
    resources: {
      en: { translation: en },
      th: { translation: th },
    },
    interpolation: {
      escapeValue: false, // React ปลอดภัย ไม่ต้อง escape HTML
    },
  });

export default i18n;
