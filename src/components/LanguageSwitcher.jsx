import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className="language-switcher">
      <select onChange={changeLanguage} value={i18n.language}>
        <option value="en">English</option>
        <option value="pa">ਪੰਜਾਬੀ</option>
        <option value="mr">मराठी</option>
      </select>
    </div>
  );
}

export default LanguageSwitcher;
