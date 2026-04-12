import type { CommonTranslations } from "./locales/de/common";
import type { HomeTranslations } from "./locales/de/home";
import type { ServicesTranslations } from "./locales/de/services";
import type { LegalTranslations } from "./locales/de/legal";
import type { SmallBusinessTranslations } from "./locales/de/smallBusiness";

import { common as deCommonData } from "./locales/de/common";
import { home as deHomeData } from "./locales/de/home";
import { services as deServicesData } from "./locales/de/services";
import { legal as deLegalData } from "./locales/de/legal";
import { smallBusiness as deSmallBusinessData } from "./locales/de/smallBusiness";

import { common as enCommonData } from "./locales/en/common";
import { home as enHomeData } from "./locales/en/home";
import { services as enServicesData } from "./locales/en/services";
import { legal as enLegalData } from "./locales/en/legal";
import { smallBusiness as enSmallBusinessData } from "./locales/en/smallBusiness";

export type Locale = "de" | "en";

type AllTranslations = CommonTranslations &
  HomeTranslations &
  ServicesTranslations &
  LegalTranslations &
  SmallBusinessTranslations;

export const translations: { de: AllTranslations; en: AllTranslations } = {
  de: {
    ...deCommonData,
    ...deHomeData,
    ...deServicesData,
    ...deLegalData,
    ...deSmallBusinessData,
  },
  en: {
    ...enCommonData,
    ...enHomeData,
    ...enServicesData,
    ...enLegalData,
    ...enSmallBusinessData,
  },
};

export type Translations = typeof translations;
export type TranslationKey = keyof AllTranslations;

export function getTranslations(locale: Locale): AllTranslations {
  return translations[locale];
}

export function getCurrentLocale(pathname: string): Locale {
  if (pathname.startsWith("/en/") || pathname === "/en") {
    return "en";
  }
  return "de";
}
