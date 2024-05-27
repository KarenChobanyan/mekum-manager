import { Armenian, English, Russian } from "../Translations";
import i18next from "i18next";
import {initReactI18next} from "react-i18next";

const resources ={
  en:{
   translation : English
  },
  ru:{
   translation:Russian
  },
  am:{
   translation :Armenian
  }
}

i18next
 .use(initReactI18next)
 .init({
    resources,
    lng:"am"
 });

 export default i18next