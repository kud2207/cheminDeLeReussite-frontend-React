import React from 'react';

export const stages = [
  {
    id: 1,
    titre: "Stage Développeur React",
    image: "https://reactnative.dev/img/tiny_logo.png",
    description: "Développe des interfaces dynamiques avec React.js.",
    competences: ["React", "JavaScript", "Git"],
    obligatoire: true
  },
  {
    id: 2,
    titre: "Stage UX/UI Designer",
    image: "https://cdn-icons-png.flaticon.com/512/919/919831.png",
    description: "Conçois des interfaces utilisateur intuitives.",
    competences: ["Figma", "Adobe XD", "Design Thinking"],
    obligatoire: false
  },
  {
    id: 3,
    titre: "Stage DevOps & Docker",
    image: "https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png",
    description: "Travaille sur des déploiements avec Docker.",
    competences: ["Docker", "CI/CD", "Linux"],
    obligatoire: true
  },
  {
    id: 4,
    titre: "Stage Data Analyst",
    image: "https://cdn-icons-png.flaticon.com/512/2721/2721296.png",
    description: "Analyse des données pour extraire des insights.",
    competences: ["Python", "Excel", "SQL"],
    obligatoire: false
  },
  {
    id: 5,
    titre: "Stage Backend Node.js",
    image: "https://nodejs.org/static/images/logo.svg",
    description: "Crée des APIs robustes avec Node.js.",
    competences: ["Node.js", "Express", "MongoDB"],
    obligatoire: true
  },
  {
    id: 6,
    titre: "Stage Frontend Vue.js",
    image: "https://vuejs.org/images/logo.png",
    description: "Développe des interfaces modernes avec Vue.js.",
    competences: ["Vue", "JavaScript", "CSS"],
    obligatoire: false
  },
  {
    id: 7,
    titre: "Stage Mobile React Native",
    image: "https://reactnative.dev/img/tiny_logo.png",
    description: "Développe des apps mobiles cross-platform.",
    competences: ["React Native", "API", "Redux"],
    obligatoire: true
  },
  {
    id: 8,
    titre: "Stage en Cybersécurité",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    description: "Protège les systèmes contre les cyberattaques.",
    competences: ["Sécurité Réseau", "Linux", "Firewall"],
    obligatoire: true
  }
];

export const StageUser = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {stages.map(stage => (
        <div key={stage.id} className="card bg-white shadow-md border rounded-lg overflow-hidden">
          <figure className="bg-slate-50 p-4">
            <img src={stage.image} alt={stage.titre} className="h-32 object-contain w-full" />
          </figure>
          <div className="card-body px-5 py-4">
            <h2 className="card-title text-slate-800">{stage.titre}</h2>
            <p className="text-slate-600 mt-2">{stage.description}</p>
            <div className="mt-3 text-sm text-slate-500">
              <strong>Compétences :</strong> {stage.competences.join(', ')}
            </div>
            <div className="text-sm mt-1 text-slate-500">
              {stage.obligatoire ? (
                <span className="text-red-600 font-semibold">Competance Obligatoire</span>
              ) : (
                <span className="text-green-600 font-semibold">Competance Facultatif</span>
              )}
            </div>
            <div className="card-actions justify-end mt-4">
              <button className="btn px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:scale-105 hover:brightness-110 transition-transform duration-300 animate-pulse">
                Postuler
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
