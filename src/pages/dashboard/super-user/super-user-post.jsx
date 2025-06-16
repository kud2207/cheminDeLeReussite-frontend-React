import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserCircle, FaPlus, FaCalendarAlt, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaChevronDown, FaChevronUp, FaTrash, FaUserGraduate } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';


export default function SuperUserDashboard() {
  const [formData, setFormData] = useState({
    title: '',
    position: '',
    description: '',
    skills: '',
    requiredSkills: '',
    location: '',  
    internshipPeriod: '',
    deadline: '',
    educationLevel: '',
    requestedByClient: false,
    status: 'active'
  });

  const [postedStages, setPostedStages] = useState([]);
  const [usersWhoPosted, setUsersWhoPosted] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('offers');
  const [isFormCollapsed, setIsFormCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()),
        requiredSkills: formData.requiredSkills ? JSON.parse(formData.requiredSkills) : []
      };

      await axios.post('http://localhost:3001/poststage/create', payload);
      alert('Offre créée avec succès !');
      fetchStages();
      setFormData({
        title: '',
        position: '',
        description: '',
        skills: '',
        requiredSkills: '',
        location: '',
        internshipPeriod: '',
        deadline: '',
        educationLevel: '',
        requestedByClient: false,
        status: 'active'
      });
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création de l'offre.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStages = async () => {
    try {
      const res = await axios.get('http://localhost:3001/poststage');
      setPostedStages(res.data.data || []);
      const users = Array.from(new Set(res.data.data.map(post => post?.user?.email || 'Anonyme')));
      setUsersWhoPosted(users);
    } catch (error) {
      console.error('Erreur récupération des offres :', error);
    }
  };

  const fetchAllStudents = async () => {
    try {
      const res = await axios.get('http://localhost:3001/student');
      setAllStudents(res.data.data || []);
    } catch (error) {
      console.error('Erreur récupération des étudiants :', error);
    }
  };

  const fetchApplicants = async () => {
    try {
      // Remplacez cette URL par votre endpoint réel pour les candidats
      const res = await axios.get('http://localhost:3001/student');
      setApplicants(res.data.data || []);
    } catch (error) {
      console.error('Erreur récupération des candidats :', error);
      // Pour l'exemple, nous allons simuler des données
      setApplicants([
        {
          _id: "1",
          name: "Jean Dupont",
          email: "jean.dupont@example.com",
          applicationDate: "2025-05-10T12:00:00.000Z",
          position: "Développeur Frontend",
          educationLevel: "Master"
        },
        {
          _id: "2",
          name: "Marie Martin",
          email: "marie.martin@example.com",
          applicationDate: "2025-05-11T14:30:00.000Z",
          position: "Designer UX",
          educationLevel: "Licence"
        }
      ]);
    }
  };

  const deleteStudent = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      try {
        await axios.delete(`http://localhost:3001/student/${id}`);
        fetchAllStudents();
        alert('Étudiant supprimé avec succès');
      } catch (error) {
        console.error('Erreur suppression étudiant :', error);
        alert("Erreur lors de la suppression de l'étudiant");
      }
    }
  };

  useEffect(() => {
    fetchStages();
    fetchAllStudents();
    fetchApplicants();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4 md:p-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-2 md:p-3 bg-blue-100 rounded-xl">
              <FaUserCircle size={isMobile ? 28 : 32} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-gray-800">Tableau de Bord</h1>
              <p className="text-xs md:text-sm text-gray-500">Gérez les offres et utilisateurs</p>
            </div>
            
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <button 
              onClick={() => setActiveTab('offers')}
              className={`px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-lg transition-all ${activeTab === 'offers' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              Offres
            </button>
            <button 
              onClick={() => setActiveTab('users')}
              className={`px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-lg transition-all ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              Utilisateurs
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'offers' ? (
            <motion.div
              key="offers"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4 md:gap-6"
            >
              {/* Bouton pour afficher/masquer le formulaire sur mobile */}
              {isMobile && (
                <button
                  onClick={() => setIsFormCollapsed(!isFormCollapsed)}
                  className="flex items-center justify-between w-full bg-white p-3 rounded-lg shadow-md border border-gray-200"
                >
                  <span className="font-medium">{isFormCollapsed ? 'Afficher' : 'Masquer'} le formulaire</span>
                  {isFormCollapsed ? <FaChevronDown /> : <FaChevronUp />}
                </button>
              )}

              {/* Conteneur principal pour mobile/desktop */}
              <div className={`${isMobile ? (isFormCollapsed ? 'hidden' : 'block') : 'grid grid-cols-1 lg:grid-cols-3 gap-6'}`}>
                {/* Formulaire de création */}
                {(!isMobile || !isFormCollapsed) && (
                  <motion.div 
                    whileHover={{ y: isMobile ? 0 : -5 }}
                    className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100 mb-4 md:mb-0"
                  >
                    <div 
                      className="flex items-center gap-3 mb-4 md:mb-6 cursor-pointer md:cursor-auto"
                      onClick={isMobile ? () => setIsFormCollapsed(true) : undefined}
                    >
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FaPlus className="text-blue-600" />
                      </div>
                      <h2 className="text-lg md:text-xl font-bold text-gray-800">Créer une offre</h2>
                      {isMobile && <FaChevronUp className="ml-auto" />}
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                      {[
                        { name: 'title', placeholder: 'Titre de l\'offre', icon: null },
                        { name: 'position', placeholder: 'Poste', icon: <FaBriefcase className="text-gray-400" /> },
                        { name: 'description', placeholder: 'Description', type: 'textarea', rows: 3 },
                        { name: 'skills', placeholder: 'Compétences (séparées par virgules)', icon: null },
                        { name: 'requiredSkills', placeholder: 'Compétences obligatoires (JSON)', type: 'textarea', rows: 2 },
                        { name: 'location', placeholder: 'Lieu', icon: <FaMapMarkerAlt className="text-gray-400" /> },
                        { name: 'internshipPeriod', placeholder: 'Période', icon: <FaCalendarAlt className="text-gray-400" /> },
                        { name: 'deadline', placeholder: 'Date limite', type: 'date' },
                        { name: 'educationLevel', placeholder: 'Niveau d\'étude', icon: <FaGraduationCap className="text-gray-400" /> },
                      ].map((field) => (
                        <div key={field.name} className="space-y-1">
                          {field.type === 'textarea' ? (
                            <textarea
                              name={field.name}
                              placeholder={field.placeholder}
                              value={formData[field.name]}
                              onChange={handleChange}
                              className="w-full p-2 md:p-3 bg-gray-50 rounded-lg md:rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all text-sm md:text-base"
                              rows={field.rows || 4}
                            />
                          ) : (
                            <div className="relative">
                              {field.icon && (
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                  {field.icon}
                                </div>
                              )}
                              <input
                                type={field.type || 'text'}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className={`w-full p-2 md:p-3 bg-gray-50 rounded-lg md:rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm md:text-base ${field.icon ? 'pl-8 md:pl-10' : ''}`}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between pt-1 md:pt-2 gap-2">
                        <label className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                          <input 
                            type="checkbox" 
                            name="requestedByClient" 
                            checked={formData.requestedByClient} 
                            onChange={handleChange} 
                            className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                          />
                          Demandée par client
                        </label>
                        
                        <select 
                          name="status" 
                          value={formData.status} 
                          onChange={handleChange} 
                          className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="active">Active</option>
                          <option value="expired">Expirée</option>
                          <option value="closed">Fermée</option>
                        </select>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 md:mt-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 md:py-3 rounded-lg md:rounded-xl font-medium hover:from-blue-700 hover:to-blue-600 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm md:text-base"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Création...
                          </>
                        ) : (
                          <>
                            <FaPlus size={14} />
                            Créer l'offre
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* Liste des offres */}
                <div className={`bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100 ${isMobile ? 'mt-0' : 'col-span-2'}`}>
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h2 className="text-lg md:text-xl font-bold text-gray-800">Offres publiées</h2>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      {postedStages.length} offres
                    </span>
                  </div>
                  
                  {postedStages.length === 0 ? (
                    <div className="text-center py-8 md:py-12">
                      <div className="mx-auto w-16 h-16 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                        <FaBriefcase className="text-gray-400 text-xl md:text-3xl" />
                      </div>
                      <h3 className="text-base md:text-lg font-medium text-gray-700">Aucune offre disponible</h3>
                      <p className="text-gray-500 text-sm md:text-base mt-1">Créez votre première offre</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 md:gap-4">
                      {postedStages.map((post) => (
                        <motion.div 
                          key={post._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          whileHover={{ y: isMobile ? 0 : -5 }}
                          className="bg-gradient-to-br from-gray-50 to-white rounded-lg md:rounded-xl p-3 md:p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all"
                        >
                          <div className="flex justify-between items-start mb-1 md:mb-2">
                            <h3 className="font-bold text-base md:text-lg text-gray-800 line-clamp-1">{post.title}</h3>
                            <span className={`text-xs px-2 py-0.5 md:px-2 md:py-1 rounded-full ${
                              post.status === 'active' ? 'bg-green-100 text-green-800' : 
                              post.status === 'expired' ? 'bg-amber-100 text-amber-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {post.status === 'active' ? 'Active' : post.status === 'expired' ? 'Expirée' : 'Fermée'}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-4 line-clamp-2">{post.description}</p>
                          
                          <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
                            <div className="flex items-center gap-1 md:gap-2 text-gray-500">
                              <FaBriefcase className="text-xs" />
                              <span className="truncate">{post.position}</span>
                            </div>
                            <div className="flex items-center gap-1 md:gap-2 text-gray-500">
                              <FaMapMarkerAlt className="text-xs" />
                              <span className="truncate">{post.location}</span>
                            </div>
                            <div className="flex items-center gap-1 md:gap-2 text-gray-500">
                              <FaCalendarAlt className="text-xs" />
                              <span className="truncate">{post.internshipPeriod}</span>
                            </div>
                            <div className="flex items-center gap-1 md:gap-2 text-gray-500">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="truncate">Fin: {new Date(post.deadline).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          {post.skills?.length > 0 && (
                            <div className="mt-2 md:mt-4">
                              <div className="flex flex-wrap gap-1 md:gap-2">
                                {post.skills.slice(0, 3).map((skill, idx) => (
                                  <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                                    {skill}
                                  </span>
                                ))}
                                {post.skills.length > 3 && (
                                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                                    +{post.skills.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="users"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Section Utilisateurs ayant posté */}
              <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-gray-800">Utilisateurs ayant posté des offres</h2>
                </div>
                
                {usersWhoPosted.length === 0 ? (
                  <div className="text-center py-8 md:py-12">
                    <div className="mx-auto w-16 h-16 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <h3 className="text-base md:text-lg font-medium text-gray-700">Aucun utilisateur trouvé</h3>
                    <p className="text-gray-500 text-sm md:text-base mt-1">Les utilisateurs apparaîtront ici après avoir posté des offres</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    {usersWhoPosted.map((user, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ scale: isMobile ? 1 : 1.02 }}
                        className="bg-gray-50 rounded-lg p-3 md:p-4 flex items-center gap-2 md:gap-3 border border-gray-200"
                      >
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm md:text-base">
                          {user.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="font-medium text-gray-800 text-sm md:text-base truncate">{user}</h4>
                          <p className="text-xs text-gray-500 truncate">
                            {postedStages.filter(post => post?.user?.email === user).length} offre(s)
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Section Tous les étudiants */}
              <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FaUserGraduate className="text-green-600" />
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-gray-800">Tous les étudiants</h2>
                </div>
                
                {allStudents.length === 0 ? (
                  <div className="text-center py-8 md:py-12">
                    <div className="mx-auto w-16 h-16 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                      <FaUserGraduate className="text-gray-400 text-xl md:text-3xl" />
                    </div>
                    <h3 className="text-base md:text-lg font-medium text-gray-700">Aucun étudiant enregistré</h3>
                    <p className="text-gray-500 text-sm md:text-base mt-1">Les étudiants apparaîtront ici après inscription</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Niveau</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {allStudents.map((student) => (
                          <tr key={student._id}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              {student.name} {student.secondName}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {student.email}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {student.phone}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {student.educationLevel}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              <button
                                onClick={() => deleteStudent(student._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Section Candidats */}
              <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FaBriefcase className="text-blue-600" />
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-gray-800">Candidats récents</h2>
                </div>
                
                {applicants.length === 0 ? (
                  <div className="text-center py-8 md:py-12">
                    <div className="mx-auto w-16 h-16 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                      <FaBriefcase className="text-gray-400 text-xl md:text-3xl" />
                    </div>
                    <h3 className="text-base md:text-lg font-medium text-gray-700">Aucun candidat récent</h3>
                    <p className="text-gray-500 text-sm md:text-base mt-1">Les candidatures apparaîtront ici</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3 md:gap-4">
                    {applicants.map((applicant) => (
                      <motion.div 
                        key={applicant._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ y: isMobile ? 0 : -5 }}
                        className="bg-gradient-to-br from-gray-50 to-white rounded-lg md:rounded-xl p-3 md:p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="flex justify-between items-start mb-1 md:mb-2">
                          <h3 className="font-bold text-base md:text-lg text-gray-800">{applicant.name}</h3>
                          <span className="text-xs text-gray-500">
                            {new Date(applicant.applicationDate).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
                          <div className="flex items-center gap-1 md:gap-2 text-gray-500">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="truncate">{applicant.email}</span>
                          </div>
                          <div className="flex items-center gap-1 md:gap-2 text-gray-500">
                            <FaBriefcase className="text-xs" />
                            <span className="truncate">{applicant.position}</span>
                          </div>
                          <div className="flex items-center gap-1 md:gap-2 text-gray-500">
                            <FaGraduationCap className="text-xs" />
                            <span className="truncate">{applicant.educationLevel}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}