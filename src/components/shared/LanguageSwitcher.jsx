
import { useState } from "react";

function LanguageSwitcher() {
  const [lang, setLang] = useState("en");

  const changeLanguage = (e) => {
    const value = e.target.value;
    setLang(value);

    // جاهز للربط مع i18n لاحقًا
    console.log("Language changed to:", value);
  };

  return (
    <select
      value={lang}
      onChange={changeLanguage}
      className="bg-slate-800 text-white px-2 py-1 rounded-lg text-sm border border-white/10"
    >
      <option value="en">EN</option>
      <option value="ar">AR</option>
    </select>
  );
}

export default LanguageSwitcher;