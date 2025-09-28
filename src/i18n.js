import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          "home": "Home",
          "admin_dashboard": "Admin Dashboard",
          "real_time_hazard_map": "Real-time Hazard Map",
          "all_alerts": "All Alerts",
          "search_alerts": "Search alerts...",
          "all_types": "All Types",
          "no_alerts_found": "No alerts found.",
          "type": "Type",
          "severity": "Severity",
          "date": "Date",
          "flood_prediction": "Flood Prediction",
          "select_state": "Select State",
          "select_city": "Select City",
          "predict_flood": "Predict Flood",
          "no_chances_of_flood": "No chances of flood in {{city}}.",
          "flood_risk_in": "Flood risk in {{city}}: {{risk_level}}.",
          "could_not_determine_flood_risk": "Could not determine flood risk for {{city}}.",
          "error_predicting_flood": "Error predicting flood.",
          "please_select_both_state_and_city": "Please select both state and city.",
          "select_a_city_and_predict_flood_chances": "Select a city and predict flood chances."
        }
      },
      pa: {
        translation: {
          "home": "ਘਰ",
          "admin_dashboard": "ਐਡਮਿਨ ਡੈਸ਼ਬੋਰਡ",
          "real_time_hazard_map": "ਰੀਅਲ-ਟਾਈਮ ਖ਼ਤਰੇ ਦਾ ਨਕਸ਼ਾ",
          "all_alerts": "ਸਾਰੀਆਂ ਚੇਤਾਵਨੀਆਂ",
          "search_alerts": "ਚੇਤਾਵਨੀਆਂ ਖੋਜੋ...",
          "all_types": "ਸਾਰੀਆਂ ਕਿਸਮਾਂ",
          "no_alerts_found": "ਕੋਈ ਚੇਤਾਵਨੀ ਨਹੀਂ ਮਿਲੀ।",
          "type": "ਕਿਸਮ",
          "severity": "ਗੰਭੀਰਤਾ",
          "date": "ਮਿਤੀ",
          "flood_prediction": "ਹੜ੍ਹ ਦੀ ਭਵਿੱਖਬਾਣੀ",
          "select_state": "ਰਾਜ ਚੁਣੋ",
          "select_city": "ਸ਼ਹਿਰ ਚੁਣੋ",
          "predict_flood": "ਹੜ੍ਹ ਦੀ ਭਵਿੱਖਬਾਣੀ ਕਰੋ",
          "no_chances_of_flood": "{{city}} ਵਿੱਚ ਹੜ੍ਹ ਦੀ ਕੋਈ ਸੰਭਾਵਨਾ ਨਹੀਂ।",
          "flood_risk_in": "{{city}} ਵਿੱਚ ਹੜ੍ਹ ਦਾ ਜੋਖਮ: {{risk_level}}।",
          "could_not_determine_flood_risk": "{{city}} ਲਈ ਹੜ੍ਹ ਦਾ ਜੋਖਮ ਨਿਰਧਾਰਤ ਨਹੀਂ ਕੀਤਾ ਜਾ ਸਕਿਆ।",
          "error_predicting_flood": "ਹੜ੍ਹ ਦੀ ਭਵਿੱਖਬਾਣੀ ਕਰਨ ਵਿੱਚ ਗਲਤੀ।",
          "please_select_both_state_and_city": "ਕਿਰਪਾ ਕਰਕੇ ਰਾਜ ਅਤੇ ਸ਼ਹਿਰ ਦੋਵੇਂ ਚੁਣੋ।",
          "select_a_city_and_predict_flood_chances": "ਇੱਕ ਸ਼ਹਿਰ ਚੁਣੋ ਅਤੇ ਹੜ੍ਹ ਦੀ ਸੰਭਾਵਨਾ ਦੀ ਭਵਿੱਖਬਾਣੀ ਕਰੋ।"
        }
      },
      mr: {
        translation: {
          "home": "मुख्यपृष्ठ",
          "admin_dashboard": "प्रशासक डॅशबोर्ड",
          "real_time_hazard_map": "रिअल-टाइम धोका नकाशा",
          "all_alerts": "सर्व सूचना",
          "search_alerts": "सूचना शोधा...",
          "all_types": "सर्व प्रकार",
          "no_alerts_found": "कोणतीही सूचना आढळली नाही.",
          "type": "प्रकार",
          "severity": "तीव्रता",
          "date": "तारीख",
          "flood_prediction": "पूर अंदाज",
          "select_state": "राज्य निवडा",
          "select_city": "शहर निवडा",
          "predict_flood": "पुराचा अंदाज लावा",
          "no_chances_of_flood": "{{city}} मध्ये पूर येण्याची शक्यता नाही.",
          "flood_risk_in": "{{city}} मध्ये पुराचा धोका: {{risk_level}}.",
          "could_not_determine_flood_risk": "{{city}} साठी पुराचा धोका निश्चित केला जाऊ शकला नाही.",
          "error_predicting_flood": "पुराचा अंदाज लावण्यात त्रुटी.",
          "please_select_both_state_and_city": "कृपया राज्य आणि शहर दोन्ही निवडा.",
          "select_a_city_and_predict_flood_chances": "शहर निवडा आणि पुराच्या शक्यतांचा अंदाज लावा."
        }
      }
    },
    lng: 'en', // default language
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
