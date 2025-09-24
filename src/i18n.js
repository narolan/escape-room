import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    nl: {
        translation: {
            adminTitle: "Beheer Spel",
            numGroups: "Aantal groepen",
            codes: "Codes",
            addCode: "+ Nog een code toevoegen",
            startGame: "Start het spel",
            title: "Groepsoverzicht",
            currentCode: "Huidige code",
            clickToEnter: "Klik om code in te voeren",
            escaped: "Deze groep is ontsnapt!",
            noData: "Geen spelgegevens gevonden.",
            reset: "Spel opnieuw starten",
            language: "Taal",
            group: "Groep",
            enterCodeNumber: "Voer een code in.",
            enterCodePlaceholder: "Voer je code in",
            submitCode: "Verstuur",
            correctCode: "Correct! Ga door naar de volgende code.",
            incorrectCode: "Verkeerde code, probeer het opnieuw.",
            enterCodePrompt: "Voer een code in.",
            backToOverview: "Terug naar overzicht",
            escapedTitle: "Je bent ontsnapt!",
            escapedMessage: "Gefeliciteerd, deze groep heeft het escape room spel voltooid.",
            groupNotFound: "Groep niet gevonden.",
            close: "Sluiten",
            resetGame: "Weet je zeker dat je het spel wilt resetten?",
        },
    },
    en: {
        translation: {
            adminTitle: "Admin Setup",
            numGroups: "Number of Groups",
            codes: "Codes",
            addCode: "+ Add another code",
            startGame: "Start Game",
            title: "Group Overview",
            currentCode: "Current code",
            clickToEnter: "Click to enter code",
            escaped: "This group has escaped!",
            noData: "No game data found.",
            reset: "Restart game",
            language: "Language",
            group: "Group",
            enterCodeNumber: "Enter code number",
            enterCodePlaceholder: "Enter your code",
            submitCode: "Submit",
            correctCode: "Correct! Proceed to the next code.",
            incorrectCode: "Incorrect code, please try again.",
            enterCodePrompt: "Please enter a code.",
            backToOverview: "Back to overview",
            escapedTitle: "You've escaped!",
            escapedMessage: "Congratulations, this group completed the escape room.",
            groupNotFound: "Group not found.",
            close: "Close",
            resetGame: "Are you sure you want to reset the game?",
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem("language") || "nl", // <-- add this
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

i18n.on("languageChanged", (lng) => {
    localStorage.setItem("language", lng);
});

export default i18n;
