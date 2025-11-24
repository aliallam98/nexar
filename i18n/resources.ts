import en_main from "./locales/en/main.json";
import ar_main from "./locales/ar/main.json";
import en_common from "./locales/en/common.json";
import ar_common from "./locales/ar/common.json";
import en_breadcrumb from "./locales/en/breadcrumb.json";
import ar_breadcrumb from "./locales/ar/breadcrumb.json";
import en_sidebar from "./locales/en/sidebar.json";
import ar_sidebar from "./locales/ar/sidebar.json";

export const resources = {
  en: {
    common: en_common,
    main: en_main,
    breadcrumb: en_breadcrumb,
    sidebar: en_sidebar,
  },
  ar: {
    common: ar_common,
    main: ar_main,
    breadcrumb: ar_breadcrumb,
    ar_sidebar,
  },
} as const;
