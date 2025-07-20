import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AdminPage from "./pages/AdminPage.jsx";
import OverviewPage from "./pages/OverviewPage.jsx";
import GroupPage from "./pages/GroupPage.jsx";

function App() {
    return (
        <>
            <div className="background-overlay"></div>
            <div className="page-content">
                <Router basename="/escape-room">
                    <Routes>
                        <Route path="/" element={<AdminPage/>}/>
                        <Route path="/overview" element={<OverviewPage/>}/>
                        <Route path="/group/:id" element={<GroupPage/>}/>
                    </Routes>
                </Router>
            </div>
        </>
    );

}

export default App
