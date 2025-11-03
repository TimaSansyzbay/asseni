import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from './locales/en/common.json'
import ruCommon from './locales/ru/common.json'
import kzCommon from './locales/kz/common.json'

void i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon },
      ru: { common: ruCommon },
      kz: { common: kzCommon },
    },
    lng: 'ru',
    fallbackLng: 'ru',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
  })

export default i18n
