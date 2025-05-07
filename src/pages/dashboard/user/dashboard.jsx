import React, { useState } from "react"
import { FaUser, FaBell, FaGraduationCap, FaFileAlt, FaComments, FaBriefcase, FaCog, FaSignOutAlt } from "react-icons/fa"
import logoCDLR from '../logoCDLR.png'
import StageAlternance from "./stage-alternance" 
import CommunautMmessage from "./communaute-message"
// Composants factices pour démonstration :
const Profile = () => <div>Profil Utilisateur</div>
const Notifications = () => <div>Notifications</div>
const KudAI = () => <div>Bienvenue dans KUD-IA</div>
const Courses = () => <div>Liste des cours</div>
const Settings = () => <div>Paramètres</div>

const Dashboard = () => {
    const [notifications, setNotifications] = useState(3)
    const [activeTab, setActiveTab] = useState("profile")
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const renderContent = () => {
        switch (activeTab) {
            case "profile":
                return <Profile />
            case "notifications":
                return <Notifications />
            case "kud-ai":
                return <KudAI />
            case "courses":
                return <Courses />
            case "community":
                return <CommunautMmessage />
            case "Stages/Alternances":
                return <StageAlternance />
            case "settings":
                return <Settings />
            default:
                return <div>Bienvenue</div>
        }
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out w-64 bg-white shadow-lg text-gray-700 p-4 z-50 lg:static lg:translate-x-0`}>
                <div className="flex items-center gap-4 p-4 mb-8">
                    <img src={logoCDLR} alt="Logo" className="h-10" />
                    <h1 className="text-xl font-bold">Chemin Réussite</h1>
                </div>

                <nav>
                    <ul className="space-y-2">
                        <NavItem icon={<FaUser />} text="Profil" active={activeTab === "profile"} onClick={() => { setActiveTab("profile"); setIsSidebarOpen(false) }} />
                        <NavItem icon={<FaBell />} text="Notifications" count={notifications} active={activeTab === "notifications"} onClick={() => { setActiveTab("notifications"); setIsSidebarOpen(false) }} />
                        <NavItem icon={<FaGraduationCap />} text="KUD-IA" active={activeTab === "kud-ai"} onClick={() => { setActiveTab("kud-ai"); setIsSidebarOpen(false) }} />
                        <NavItem icon={<FaFileAlt />} text="Cours" active={activeTab === "courses"} onClick={() => { setActiveTab("courses"); setIsSidebarOpen(false) }} />
                        <NavItem icon={<FaComments />} text="Communauté" active={activeTab === "community"} onClick={() => { setActiveTab("community"); setIsSidebarOpen(false) }} />
                        <NavItem icon={<FaBriefcase />} text="Stages/Alternances" active={activeTab === "Stages/Alternances"} onClick={() => { setActiveTab("Stages/Alternances"); setIsSidebarOpen(false) }} />
                        <NavItem icon={<FaCog />} text="Paramètres" active={activeTab === "settings"} onClick={() => { setActiveTab("settings"); setIsSidebarOpen(false) }} />
                    </ul>

                    <li className="mt-10 text-red-600">
                        <NavItem icon={<FaSignOutAlt />} text="Déconnexion" onClick={() => setIsSidebarOpen(false)} />
                    </li>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <header className="bg-white shadow-lg p-4 flex justify-between items-center">
                    <button className="lg:hidden text-gray-600 text-xl" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>☰</button>
                    <h2 className="text-xl font-semibold capitalize">{activeTab}</h2>
                    <div className="flex items-center space-x-4">
                        <button className="relative">
                            <FaBell className="text-gray-600 text-xl" />
                            {notifications > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{notifications}</span>
                            )}
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full bg-green-400 animate-ping"></div>
                            <span className="text-lg">KAGEU ULRICH</span>
                        </div>
                    </div>
                </header>

                <main className="p-6">{renderContent()}</main>
            </div>
        </div>
    )
}

const NavItem = ({ icon, text, count, active, onClick }) => (
    <li>
        <button onClick={onClick} className={`flex items-center space-x-3 w-full p-3 rounded-lg transition ${active ? 'bg-blue-500  text-white ml-3' : 'hover:bg-blue-50'}`}>
            <span>{icon}</span>
            <span>{text}</span>
            {count > 0 && <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{count}</span>}
        </button>
    </li>
)

export default Dashboard
