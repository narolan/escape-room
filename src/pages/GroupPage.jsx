import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function GroupPage() {
    const {t} = useTranslation();
    const {id} = useParams(); // group id from URL
    const groupId = parseInt(id, 10);
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [group, setGroup] = useState(null);
    const [currentCodeValue, setCurrentCodeValue] = useState("");
    const [feedback, setFeedback] = useState({message: "", type: ""});

    useEffect(() => {
        const saved = localStorage.getItem("escapeRoomData");
        if (!saved) {
            alert(t("noData"));
            navigate("/");
            return;
        }

        const parsed = JSON.parse(saved);
        setData(parsed);

        const foundGroup = parsed.groups.find((g) => g.group === groupId);
        if (!foundGroup) {
            alert(t("groupNotFound"));
            navigate("/overview");
            return;
        }
        setGroup(foundGroup);
    }, [groupId, navigate, t]);

    if (!data || !group) {
        return null;
    }

    const currentCodeIndex = group.currentCode - 1;
    const codes = data.codes;

    if (group.currentCode > codes.length) {
        return (
            <div className="group-page-container">
                <LanguageSwitcher/>
                <h1>{t("escapedTitle")}</h1>
                <p>{t("escapedMessage")}</p>
                <button onClick={() => navigate("/overview")}>
                    {t("backToOverview")}
                </button>
            </div>
        );
    }

    const currentCode = codes[currentCodeIndex];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentCodeValue.trim() === "") {
            setFeedback({message: t("enterCodePrompt"), type: "error"});
            return;
        }

        if (currentCodeValue.trim() === currentCode.value.toString()) {
            const updatedGroups = data.groups.map((g) =>
                g.group === groupId ? {...g, currentCode: g.currentCode + 1} : g
            );

            const newData = {...data, groups: updatedGroups};
            localStorage.setItem("escapeRoomData", JSON.stringify(newData));
            setFeedback({message: t("correctCode"), type: "success"});

            setTimeout(() => {
                navigate("/overview");
            }, 1200);
        } else {
            setFeedback({message: t("incorrectCode"), type: "error"});
            setCurrentCodeValue("");
        }
    };

    return (
        <div className="group-page-container">
            <LanguageSwitcher/>
            <h1>
                {t("group")} {group.group} - {t("enterCodeNumber")} {currentCode.number}
            </h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={currentCodeValue}
                    onChange={(e) => setCurrentCodeValue(e.target.value)}
                    placeholder={t("enterCodePlaceholder")}
                    autoFocus
                />
                <button type="submit">{t("submitCode")}</button>
            </form>

            {feedback.message && (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: feedback.type === "success" ? "#d4edda" : "#f8d7da",
                        color: feedback.type === "success" ? "#155724" : "#721c24",
                        padding: "1.5rem 2rem",
                        borderRadius: "12px",
                        border: `3px solid ${feedback.type === "success" ? "#c3e6cb" : "#f5c6cb"}`,
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        zIndex: 9999,
                        textAlign: "center",
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                        userSelect: "none",
                        animation: "popupFadeIn 0.3s ease forwards",
                        minWidth: 280,
                        maxWidth: "90%",
                    }}
                    role="alert"
                    aria-live="assertive"
                >
                    <button
                        onClick={() => setFeedback({ message: "", type: "" })}
                        style={{
                            position: "absolute",
                            top: "0px",
                            right: "0px",
                            background: "transparent",
                            border: "none",
                            fontSize: "1rem",
                            fontWeight: "700",
                            cursor: "pointer",
                            color: feedback.type === "success" ? "#155724" : "#721c24",
                        }}
                        aria-label={t("close")}
                    >
                        ×
                    </button>
                    {feedback.message}
                </div>
            )}

            <button onClick={() => navigate("/overview")}>{t("backToOverview")}</button>
        </div>
    );
}
