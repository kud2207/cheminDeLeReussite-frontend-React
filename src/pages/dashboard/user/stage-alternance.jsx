import React, { useState } from 'react';
import { FaBriefcase, FaUserGraduate, FaRobot } from 'react-icons/fa';
import { StageUser } from '../../../components/dashboard/user/stage-user';
import AlternanceUser from '../../../components/dashboard/user/alternance-user';
import IaHelpsUser from '../../../components/dashboard/user/ia-helps-user';

export default function StageAlternance() {
  const [activeTab, setActiveTab] = useState("stage");

  const renderContent = () => {
    switch (activeTab) {
      case "stage":
        return <StageUser/>;
      case "alternant":
        return <AlternanceUser/> ;
      case "ia":
        return <IaHelpsUser/>;
      default:
        return <p className="text-lg">Sélectionnez une section</p>;
    }
  };

  return (
    <div className="flex gap-6 min-h-[500px]">
      {/* Partie gauche avec boutons */}
      <div className="w-1/4 bg-white p-4  shadow space-y-4 max-h-64">
        <button
          className={`w-full py-3 px-4 flex items-center mt-4 gap-3  text-left ${activeTab === 'stage' ? 'bg-orange-400 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => setActiveTab('stage')}
        >
          <FaBriefcase className="text-lg" />
          Stage
        </button>
        <button
          className={`w-full py-3 px-4 flex items-center gap-3 rounded text-left ${activeTab === 'alternant' ? 'bg-orange-400 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => setActiveTab('alternant')}
        >
          <FaUserGraduate className="text-lg" />
          Alternant
        </button>
        <button
          className={`w-full py-3 px-4 flex items-center gap-3 rounded text-left ${activeTab === 'ia' ? 'bg-orange-400 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => setActiveTab('ia')}
        >
          <FaRobot className="text-lg" />
          IA Recherche
        </button>
      </div>

      {/* Partie droite avec contenu */}
      <div className="flex-1 bg-white p-6 shadow min-h-[500px]">
        {renderContent()}
      </div>
    </div>
  );
}
