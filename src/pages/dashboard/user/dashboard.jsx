// Dashboard.jsx
import React, { useState } from "react"
import { Routes, Route, Link } from "react-router-dom"
import { FaUser, FaBell, FaGraduationCap, FaFileAlt, FaComments, FaBriefcase, FaCog, FaSignOutAlt } from "react-icons/fa"
import logoCDLR from'../logoCDLR.png'

const Dashboard = () => {
  const [notifications, setNotifications] = useState(3)
  const [activeTab, setActiveTab] = useState("profile")

const [isSidebarOpen, setIsSidebarOpen] = useState(false)

return (
    <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div
            className={`fixed inset-y-0 left-0 transform ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out w-64 bg-white shadow-lg  text-gray-700 p-4 z-50 lg:static lg:translate-x-0`}
        >
            <div className="flex items-center space-x-2 p-4 mb-8 gap-4">
                <img src={logoCDLR} alt="Logo" className="h-10" />
                <h1 className="text-xl font-bold">Chemin Réussite</h1>
            </div>

            <nav>
                <ul className="space-y-2">
                    <NavItem 
                        icon={<FaUser />} 
                        text="Profil" 
                        active={activeTab === "profile"} 
                        onClick={() => {
                            setActiveTab("profile")
                            setIsSidebarOpen(false)
                        }}
                    />
                    <NavItem 
                        icon={<FaBell />} 
                        text="Notifications" 
                        count={notifications}
                        active={activeTab === "notifications"} 
                        onClick={() => {
                            setActiveTab("notifications")
                            setIsSidebarOpen(false)
                        }}
                    />
                    <NavItem 
                        icon={<FaGraduationCap />} 
                        text="KUD-IA" 
                        active={activeTab === "kud-ai"} 
                        onClick={() => {
                            setActiveTab("kud-ai")
                            setIsSidebarOpen(false)
                        }}
                    />
                    <NavItem 
                        icon={<FaFileAlt />} 
                        text="Cours" 
                        active={activeTab === "courses"} 
                        onClick={() => {
                            setActiveTab("courses")
                            setIsSidebarOpen(false)
                        }}
                    />
                    <NavItem 
                        icon={<FaComments />} 
                        text="Communauté" 
                        active={activeTab === "community"} 
                        onClick={() => {
                            setActiveTab("community")
                            setIsSidebarOpen(false)
                        }}
                    />
                    <NavItem 
                        icon={<FaBriefcase />} 
                        text="Stages/Emplois" 
                        active={activeTab === "jobs"} 
                        onClick={() => {
                            setActiveTab("jobs")
                            setIsSidebarOpen(false)
                        }}
                    />
                    <NavItem 
                        icon={<FaCog />} 
                        text="Paramètres" 
                        active={activeTab === "settings"} 
                        
                        onClick={() => {
                            setActiveTab("settings")
                            setIsSidebarOpen(false)
                        }}
                    />
                </ul>

                <li className="mt-10 text-red-600">
                    <NavItem 
                        icon={<FaSignOutAlt />} 
                        text="Déconnexion" 
                        active={false} 
                        onClick={() => {
                            setIsSidebarOpen(false)
                        }}
                    />
                </li>
            </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
            <header className="bg-white shadow-lg  p-4 flex justify-between items-center">
                <button
                    className="lg:hidden text-gray-600 text-xl"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    ☰
                </button>
                <h2 className="text-xl font-semibold capitalize">{activeTab}</h2>
                <div className="flex items-center space-x-4">
                    <button className="relative">
                        <FaBell className="text-gray-600 text-xl" />
                        {notifications > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {notifications}
                            </span>
                        )}
                    </button>
                    <img 
                        src={"/default-avatar.jpg"}
                        alt="Profile" 
                        className="h-10 w-10 rounded-full"
                    />
                </div>
            </header>

            <main className="p-6">
                {/* <Routes>
                    <Route path="/profile" element={<ProfileSection />} />
                    <Route path="/notifications" element={<NotificationsSection />} />
                    <Route path="/kud-ai" element={<KudAISection />} />
                    <Route path="/courses" element={<CoursesSection />} />
                    <Route path="/community" element={<CommunitySection />} />
                    <Route path="/jobs" element={<JobsSection />} />
                    <Route path="/settings" element={<SettingsSection />} />
                </Routes> */}
            </main>
        </div>
    </div>
)
}

const NavItem = ({ icon, text, count, active, onClick }) => (
  <li>
    <button
      onClick={onClick}
      className={`flex items-center space-x-3 w-full p-3 rounded-lg transition ${active ? 'bg-blue-200' : 'hover:bg-blue-50'}`}
    >
      <span>{icon}</span>
      <span>{text}</span>
      {count > 0 && (
        <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  </li>
)

export default Dashboard