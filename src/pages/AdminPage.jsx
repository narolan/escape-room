import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./AdminPage.css";
import LanguageSwitcher from "../components/LanguageSwitcher";

const AdminPage = () => {
    const [numGroups, setNumGroups] = useState(2);
    const [codes, setCodes] = useState([""]);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleAddCode = () => {
        setCodes([...codes, ""]);
    };

    const handleCodeChange = (index, value) => {
        const newCodes = [...codes];
        newCodes[index] = value;
        setCodes(newCodes);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const codeObjects = codes
            .filter((c) => c.trim() !== "")
            .map((code, i) => ({
                number: i + 1,
                value: code.trim(),
            }));

        const groupObjects = Array.from({ length: numGroups }, (_, i) => ({
            group: i + 1,
            currentCode: 1,
        }));

        const gameData = {
            codes: codeObjects,
            groups: groupObjects,
        };

        localStorage.setItem("escapeRoomData", JSON.stringify(gameData));

        navigate("/overview");
    };

    return (
        <div className="admin-container">
            <LanguageSwitcher />
            <h1>{t("adminTitle")}</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    {t("numGroups")}:
                    <input
                        type="number"
                        min="1"
                        value={numGroups}
                        onChange={(e) => setNumGroups(parseInt(e.target.value, 10))}
                    />
                </label>

                <div className="codes-section">
                    <label>{t("codes")}:</label>
                    {codes.map((code, index) => (
                        <input
                            key={index}
                            type="text"
                            value={code}
                            onChange={(e) => handleCodeChange(index, e.target.value)}
                            placeholder={`Code ${index + 1}`}
                        />
                    ))}
                    <button type="button" className="add-code-btn" onClick={handleAddCode}>
                        {t("addCode")}
                    </button>
                </div>

                <button type="submit" className="start-btn">
                    {t("startGame")}
                </button>
            </form>
        </div>
    );}

export default AdminPage;