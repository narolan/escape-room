import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import './OverviewPage.css';
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function OverviewPage() {
    const { t } = useTranslation();
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const saved = localStorage.getItem("escapeRoomData");
        if (saved) {
            setData(JSON.parse(saved));
        }
    }, []);

    const handleGroupClick = (group) => {
        navigate(`/group/${group.group}`);
    };

    const handleReset = () => {
        let message = t("resetGame");
        if (confirm(message)) {
            localStorage.removeItem("escapeRoomData");
            navigate("/");
        }
    };

    if (!data) {
        return <p>{t("noData")}</p>;
    }

    return (
        <div className="overview-container">
            <LanguageSwitcher />
            <h1>{t("title")}</h1>

            <ul className="group-list">
                {data.groups.map((group) => {
                    const isDone = group.currentCode > data.codes.length;

                    return (
                        <li key={group.group} className={`group-item ${isDone ? "done" : ""}`}>
                            <div className="group-label">Groep {group.group}</div>
                            <div className="group-info">
                                {isDone ? (
                                    <span className="escaped">{t("escaped")}</span>
                                ) : (
                                    <>
                    <span>
                      {t("currentCode")}: {group.currentCode}
                    </span>
                                        <button onClick={() => handleGroupClick(group)}>
                                            {t("clickToEnter")}
                                        </button>
                                    </>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>

            <button onClick={handleReset} className="reset-btn">
                {t("reset")}
            </button>
        </div>
    );
}
