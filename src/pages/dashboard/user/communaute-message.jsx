import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaRobot, FaEllipsisV, FaReply, FaShare, FaCopy, FaFlag, FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommunautMessage() {
  // Messages prédéfinis pour simuler un chat de groupe
  const initialMessages = [
    {
      id: 1,
      author: "Marie",
      avatar: <FaUser className="text-blue-500" />,
      content: "Bonjour à tous ! Comment allez-vous aujourd'hui ?",
      timestamp: "08:30",
      isWarning: false
    },
    {
      id: 2,
      author: "Pierre",
      avatar: <FaUser className="text-green-500" />,
      content: "Salut Marie ! Je vais bien merci, et toi ?",
      timestamp: "08:32",
      isWarning: false
    },
    {
      id: 3,
      author: "Sophie",
      avatar: <FaUser className="text-purple-500" />,
      content: "Je suis nouvelle ici, contente de vous rencontrer !",
      timestamp: "08:35",
      isWarning: false
    },
    {
      id: 4,
      author: "Modérateur",
      avatar: <FaRobot className="text-red-500" />,
      content: "Bienvenue Sophie ! N'hésitez pas à poser vos questions.",
      timestamp: "08:36",
      isWarning: false
    },
    {
        id: 3,
        author: "Sophie",
        avatar: <FaUser className="text-purple-500" />,
        content: "Je suis nouvelle ici, contente de vous rencontrer !",
        timestamp: "08:35",
        isWarning: false
      },
      {
        id: 4,
        author: "Modérateur",
        avatar: <FaRobot className="text-red-500" />,
        content: "Bienvenue Sophie ! N'hésitez pas à poser vos questions.",
        timestamp: "08:36",
        isWarning: false
      }
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('Utilisateur');
  const [showDropdown, setShowDropdown] = useState(null);
  const [isModerating, setIsModerating] = useState(false);
  const messagesEndRef = useRef(null);

  const forbiddenWords = ['sexeul', 'politique', 'porno', 'haine', 'racisme', 'insulte'];
  const warningMessages = [
    "Ce message contient du contenu inapproprié et ne peut être envoyé.",
    "Veuillez respecter les règles de la communauté.",
    "Ce type de contenu n'est pas autorisé dans nos discussions."
  ];

  const containsForbiddenContent = (text) => {
    const lowerText = text.toLowerCase();
    return forbiddenWords.some(word => lowerText.includes(word.toLowerCase()));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    if (containsForbiddenContent(newMessage)) {
      setIsModerating(true);
      const warning = {
        id: Date.now(),
        author: "Modérateur",
        avatar: <FaRobot className="text-red-500" />,
        content: warningMessages[Math.floor(Math.random() * warningMessages.length)],
        timestamp: new Date().toLocaleTimeString(),
        isWarning: true
      };
      setMessages(prev => [...prev, warning]);
      setNewMessage('');
      setTimeout(() => setIsModerating(false), 3000);
      return;
    }

    const message = {
      id: Date.now(),
      author: userName,
      avatar: <FaUser className="text-indigo-500" />,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString(),
      isWarning: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleMessageAction = (action, messageId) => {
    switch (action) {
      case 'copy':
        const msg = messages.find(m => m.id === messageId);
        navigator.clipboard.writeText(msg.content);
        break;
      case 'report':
        alert('Message signalé aux modérateurs');
        break;
      case 'delete':
        setMessages(prev => prev.filter(m => m.id !== messageId));
        break;
      default:
        break;
    }
    setShowDropdown(null);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800 relative">
      {/* Fond d'écran style WhatsApp */}
      <div className="absolute inset-0 bg-[url('https://web.whatsapp.com/img/bg-chat-tile-light_a4be512e7195b6b733d9110b408f075d.png')] opacity-5 dark:opacity-10 z-0"></div>
      
      <div className="relative z-10">
        <div className="bg-indigo-600 text-white p-4 dark:bg-indigo-800">
          <h2 className="text-xl font-bold">Chat Communautaire</h2>
          <p className="text-sm opacity-90">Espace d'entraide et d'échange</p>
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-gray-50/70 dark:bg-gray-700/90">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
              <p>Aucun message encore. Soyez le premier à participer !</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <AnimatePresence key={message.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-2.5 ${
                      message.isWarning ? 'justify-center' : 
                      message.author === userName ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {!message.isWarning && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-600">
                        {message.avatar}
                      </div>
                    )}

                    <div className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 rounded-e-xl rounded-es-xl ${
                      message.isWarning 
                        ? 'bg-red-100 border-red-200 dark:bg-red-900 dark:border-red-800' 
                        : message.author === userName 
                          ? 'bg-indigo-100 border-indigo-200 dark:bg-indigo-900 dark:border-indigo-800' 
                          : 'bg-white/90 border-gray-200 dark:bg-gray-600 dark:border-gray-500'
                    } border shadow-sm`}>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className={`text-sm font-semibold ${
                          message.isWarning 
                            ? 'text-red-800 dark:text-red-200' 
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {message.author}
                        </span>
                        <span className={`text-sm font-normal ${
                          message.isWarning 
                            ? 'text-red-600 dark:text-red-300' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {message.timestamp}
                        </span>
                      </div>
                      <p className={`text-sm font-normal py-2.5 ${
                        message.isWarning 
                          ? 'text-red-700 dark:text-red-200' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {message.content}
                      </p>
                      <span className={`text-sm font-normal ${
                        message.isWarning 
                          ? 'text-red-600 dark:text-red-300' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {message.isWarning ? 'Bloqué' : 'Envoyé'}
                      </span>
                    </div>

                    {!message.isWarning && (
                      <div className="relative">
                        <button 
                          onClick={() => setShowDropdown(showDropdown === message.id ? null : message.id)}
                          className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                          <FaEllipsisV className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </button>

                        {showDropdown === message.id && (
                          <div className="z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                              <li>
                                <button 
                                  onClick={() => handleMessageAction('reply', message.id)}
                                  className="flex items-center px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  <FaReply className="mr-2" /> Répondre
                                </button>
                              </li>
                              <li>
                                <button 
                                  onClick={() => handleMessageAction('copy', message.id)}
                                  className="flex items-center px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  <FaCopy className="mr-2" /> Copier
                                </button>
                              </li>
                              <li>
                                <button 
                                  onClick={() => handleMessageAction('report', message.id)}
                                  className="flex items-center px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  <FaFlag className="mr-2" /> Signaler
                                </button>
                              </li>
                              {(message.author === userName || userName === 'Modérateur') && (
                                <li>
                                  <button 
                                    onClick={() => handleMessageAction('delete', message.id)}
                                    className="flex items-center px-4 py-2 w-full text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-400"
                                  >
                                    <FaTrash className="mr-2" /> Supprimer
                                  </button>
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Zone de saisie */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm">
          <div className="flex items-center mb-2">
            <label className="text-sm text-gray-600 dark:text-gray-300 mr-2">Pseudo:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value || 'Utilisateur')}
              className="flex-1 text-sm border-b border-gray-300 focus:border-indigo-500 outline-none py-1 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
              maxLength="20"
            />
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={isModerating ? "Contenu inapproprié détecté..." : "Écrivez votre message..."}
              className={`flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                isModerating
                  ? 'border-red-300 bg-red-50 placeholder-red-300 dark:bg-red-900/80 dark:border-red-700'
                  : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700/80 dark:border-gray-600 dark:text-white'
              }`}
              disabled={isModerating}
            />
            <button
              type="submit"
              className={`px-4 py-3 rounded-lg font-medium ${
                isModerating
                  ? 'bg-red-500 text-white cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
              disabled={isModerating}
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}