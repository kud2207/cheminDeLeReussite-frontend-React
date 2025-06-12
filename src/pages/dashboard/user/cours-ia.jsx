import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

function GeminiLearningApp() {
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState('generate'); // 'generate' or 'summarize'

  // Initialisez le modèle Gemini avec votre clé API
  const genAI = new GoogleGenerativeAI("AIzaSyC50q3Lzn6eL8xHMVs2VHHHQi7f_9RJ5ro");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleGenerateCourse = async () => {
    setIsLoading(true);
    try {
      const prompt = `Crée un plan de cours complet sur le sujet suivant : ${input}. 
      Structure-le comme suit :
      1. Titre du cours
      2. Objectifs d'apprentissage
      3. Prérequis
      4. Roadmap hebdomadaire (4 semaines)
      5. Ressources recommandées
      6. Projet final
      
      Sois précis et détaillé. Utilise un langage clair et pédagogique.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setOutput(response.text());
    } catch (error) {
      console.error('Erreur:', error);
      setOutput("Une erreur s'est produite lors de la génération du cours.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummarize = async () => {
    if (!file) return;
    
    setIsLoading(true);
    try {
      // Pour les fichiers texte
      if (file.type === 'text/plain') {
        const text = await file.text();
        const prompt = `Résume ce texte de cours en points clés. 
        Structure le résumé comme suit :
        1. Concepts principaux
        2. Points clés à retenir
        3. Exemples importants
        4. Applications pratiques
        
        Texte à résumer : ${text}`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        setOutput(response.text());
      } 
      // Pour les PDF (nécessite une conversion texte d'abord)
      else if (file.type === 'application/pdf') {
        // Note: Dans une vraie application, vous devriez extraire le texte du PDF
        // Ici nous simulons avec le nom du fichier
        const prompt = `Résume ce document PDF de cours (${file.name}) en points clés. 
        Structure le résumé comme suit :
        1. Thème principal
        2. Concepts clés
        3. Conclusions importantes
        4. Applications pratiques`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        setOutput(response.text());
      }
    } catch (error) {
      console.error('Erreur:', error);
      setOutput("Une erreur s'est produite lors du résumé du document.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Assistant d'Apprentissage IA</h1>
      
      <div className="flex mb-6 border-b">
        <button
          className={`px-4 py-2 font-medium ${mode === 'generate' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setMode('generate')}
        >
          Générer un cours
        </button>
        <button
          className={`px-4 py-2 font-medium ${mode === 'summarize' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setMode('summarize')}
        >
          Résumer un cours
        </button>
      </div>

      {mode === 'generate' ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Générateur de Plan de Cours</h2>
          <p className="text-gray-600">
            Entrez un sujet et obtenez un plan de cours détaillé avec roadmap d'apprentissage.
          </p>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ex: Apprentissage automatique, Développement Web, Biologie moléculaire..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleGenerateCourse}
            disabled={isLoading || !input}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium disabled:bg-blue-300"
          >
            {isLoading ? 'Génération en cours...' : 'Générer le cours'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Résumé de Documents de Cours</h2>
          <p className="text-gray-600">
            Téléchargez un fichier PDF ou texte et obtenez un résumé des points clés.
          </p>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.txt"
            className="w-full p-3 border rounded-lg"
          />
          <button
            onClick={handleSummarize}
            disabled={isLoading || !file}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium disabled:bg-green-300"
          >
            {isLoading ? 'Analyse en cours...' : 'Résumer le document'}
          </button>
        </div>
      )}

      {output && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">
            {mode === 'generate' ? 'Plan de Cours Généré' : 'Résumé du Document'}
          </h3>
          <div className="whitespace-pre-wrap">{output}</div>
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="mt-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
          >
            Copier le texte
          </button>
        </div>
      )}

      <div className="mt-8 text-sm text-gray-500">
        <p>Note : Cette applicationgénérer du contenu pédagogique.</p>
      </div>
    </div>
  );
}

export default GeminiLearningApp;