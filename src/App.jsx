import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import AdminPage from "./pages/AdminPage.jsx";
import OverviewPage from "./pages/OverviewPage.jsx";
import GroupPage from "./pages/GroupPage.jsx";
import {useEffect} from "react";

function App() {

    let data = null;

    useEffect(() => {
        const saved = localStorage.getItem("escapeRoomData");
        if (!saved) {
            return;
        }

        data = JSON.parse(saved);
    }, []);

    localStorage.getItem("escapeRoomData")

    return (
        <>
            <div className="background-overlay"></div>
            <div className="page-content">
                <Router basename="/escape-room">
                    <Routes>
                        {
                            data ?
                                <Route path="/" element={<Navigate to="/overview" replace/>} />
                                :
                                <Route path="/" element={<AdminPage/>}/>
                        }
                        <Route path="/overview" element={<OverviewPage/>}/>
                        <Route path="/group/:id" element={<GroupPage/>}/>
                    </Routes>
                </Router>
            </div>
        </>
    );

}

export default App
