import React, { useState, useEffect } from 'react';
import { FaRobot, FaSearch, FaLightbulb, FaSmileWink, FaUpload, FaRegCopy } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { stages } from './stage-user';
import { posts } from './alternance-user';

export default function IaHelpsUser() {
  // États
  const [type, setType] = useState('stage');
  const [description, setDescription] = useState('');
  const [cvText, setCvText] = useState('');
  const [result, setResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [showThinking, setShowThinking] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  // Suggestions
  const suggestions = [
    "Stage en développement web avec React",
    "Alternance en marketing digital - Paris",
    "Design graphique en entreprise",
    "Data science avec Python"
  ];

  // Recherche locale
  const performLocalSearch = () => {
    if (!description.trim()) return;

    setIsSearching(true);
    setShowThinking(true);
    setResult(null);
    setSelectedSuggestion(null);

    // Simuler un délai pour l'animation
    setTimeout(() => {
      const data = type === 'stage' ? stages : posts;
      const searchTerm = description.toLowerCase();
      
      const results = data.filter(item => {
        // Recherche dans le titre et la description
        const titleMatch = item.titre?.toLowerCase().includes(searchTerm) || 
                          item.title?.toLowerCase().includes(searchTerm);
        const descMatch = item.description?.toLowerCase().includes(searchTerm);
        
        return titleMatch || descMatch;
      });

      setSearchResults(results.slice(0, 5)); // Limiter à 5 résultats
      
      // Générer un résultat formaté
      if (results.length > 0) {
        setResult(`## Résultats de recherche\n\n${results.length} ${type === 'stage' ? 'stages' : 'offres d\'alternance'} trouvés :`);
      } else {
        setResult("## Aucun résultat trouvé\n\nEssayez avec d'autres mots-clés.");
      }
      
      setIsSearching(false);
      setShowThinking(false);
    }, 1500);
  };

  // Gestion du fichier CV
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type === 'application/pdf') {
      alert("Pour les PDF, veuillez extraire le texte manuellement.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => setCvText(e.target.result.substring(0, 2000));
    reader.readAsText(file);
  };

  // Animation de chargement
  useEffect(() => {
    if (showThinking) {
      const messages = [
        "Analyse de votre profil...",
        "Recherche dans notre base...",
        "Génération des conseils..."
      ];
      let i = 0;

      const interval = setInterval(() => {
        setTypingText(messages[i]);
        i = (i + 1) % messages.length;
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [showThinking]);

  // Copie des résultats
  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert("Résultats copiés !");
  };

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-2xl shadow-xl relative overflow-hidden border border-gray-100">
      {/* Animation de fond */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <FaRobot className="absolute -right-40 -top-40 text-[400px] text-indigo-300 animate-pulse" />
      </div>

      <div className="relative z-10">
        {/* En-tête */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="relative mb-4">
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <FaRobot className="text-5xl text-indigo-600" />
            </motion.div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping" />
          </div>
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Assistant IA Professionnel
          </h2>
          <p className="text-gray-500 mt-2">Recherche intelligente dans notre base</p>
        </motion.div>

        {/* Suggestions rapides */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-600 flex items-center">
              <FaLightbulb className="mr-2 text-yellow-400" /> Exemples de recherche
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setDescription(suggestion);
                  setSelectedSuggestion(suggestion);
                }}
                className={`p-3 text-sm rounded-xl transition-all ${
                  selectedSuggestion === suggestion
                    ? 'bg-indigo-100 border-2 border-indigo-300 text-indigo-700'
                    : 'bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700'
                }`}
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Formulaire de recherche */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <motion.select
                whileHover={{ scale: 1.02 }}
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="stage">Stage</option>
                <option value="alternance">Alternance</option>
              </motion.select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CV (optionnel)</label>
              <label className="w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2 cursor-pointer">
                <FaUpload />
                <span>{cvText ? 'CV analysé ✓' : 'Télécharger mon CV'}</span>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileUpload}
                  accept=".txt,.doc,.docx,.pdf"
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Votre recherche</label>
            <motion.textarea
              whileFocus={{ scale: 1.01 }}
              placeholder="Décrivez vos compétences, centres d'intérêt, domaine..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-36 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={performLocalSearch}
            disabled={isSearching || !description.trim()}
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all shadow-md flex items-center justify-center gap-3 ${
              isSearching
                ? 'bg-indigo-400 cursor-not-allowed'
                : !description.trim()
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
            }`}
          >
            {isSearching ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Recherche en cours...</span>
              </>
            ) : (
              <>
                <FaSearch />
                <span>Rechercher dans notre base</span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Animation pendant la recherche */}
        <AnimatePresence>
          {showThinking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 p-5 bg-indigo-50 rounded-xl border border-indigo-100 flex items-start gap-4"
            >
              <div className="relative mt-1">
                <FaRobot className="text-2xl text-indigo-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
              </div>
              <div>
                <p className="font-medium text-indigo-800 mb-1">{typingText}</p>
                <div className="flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
                <p className="text-sm text-indigo-600 mt-2">Recherche dans notre base de données</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Résultats */}
        <AnimatePresence>
          {(result || searchResults.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 rounded-xl overflow-hidden shadow-sm bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-indigo-900">Résultats de la recherche</h3>
                  <button 
                    onClick={copyToClipboard}
                    className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-full"
                    title="Copier les résultats"
                  >
                    <FaRegCopy />
                  </button>
                </div>
                
                {/* Texte de résultat */}
                <div className="bg-white p-4 rounded-lg border border-gray-200 whitespace-pre-wrap mb-4">
                  {result.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-3 text-gray-700">
                      {paragraph.startsWith('##') ? (
                        <strong className="text-indigo-600 block mt-4 mb-2">
                          {paragraph.replace('##', '')}
                        </strong>
                      ) : (
                        paragraph
                      )}
                    </p>
                  ))}
                </div>
                
                {/* Cartes de résultats */}
                {searchResults.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {searchResults.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                      >
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt={item.titre || item.title} 
                            className="w-16 h-16 object-contain mb-3 mx-auto"
                          />
                        )}
                        <h4 className="font-semibold text-lg text-indigo-700">
                          {item.titre || item.title}
                        </h4>
                        {item.description && (
                          <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        {item.deadline && (
                          <p className="text-sm text-gray-500 mt-2">
                            Date limite: {item.deadline}
                          </p>
                        )}
                        {item.competences && (
                          <div className="mt-3">
                            <p className="text-xs font-medium text-gray-500">Compétences:</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {item.competences.map((skill, i) => (
                                <span key={i} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
                
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={performLocalSearch}
                    className="flex-1 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                  >
                    <FaSearch />
                    <span>Relancer la recherche</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setResult(null);
                      setDescription('');
                      setCvText('');
                      setSearchResults([]);
                    }}
                    className="flex-1 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition"
                  >
                    Nouvelle recherche
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}