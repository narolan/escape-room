import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
    const { i18n, t } = useTranslation();

    const handleChange = (e) => {
        i18n.changeLanguage(e.target.value);
    };

    return (
        <div style={{ textAlign: "right", marginBottom: "1rem" }}>
            <label htmlFor="lang-select" style={{ marginRight: "0.5rem" }}>
                {t("language")}:
            </label>
            <select id="lang-select" onChange={handleChange} value={i18n.language}>
                <option value="nl">Nederlands</option>
                <option value="en">English</option>
            </select>
        </div>
    );
}
