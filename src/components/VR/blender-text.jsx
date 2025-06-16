import React, { useEffect } from 'react';
import '@google/model-viewer';

const BlenderText = () => {
  useEffect(() => {
    // Vérification de la compatibilité AR
    const checkARSupport = async () => {
      if (!navigator.xr) {
        alert("Votre navigateur ne supporte pas WebXR. Essayez Chrome sur Android.");
        return false;
      }
      return await navigator.xr.isSessionSupported('immersive-ar');
    };

    checkARSupport().then(supported => {
      if (!supported) {
        alert("La réalité augmentée n'est pas disponible sur cet appareil.");
      }
    });
  }, []);
 
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}> 
      <model-viewer
        src="/models/Sun.glb"
        ios-src=""
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        environment-image="neutral"
        shadow-intensity="1"
        auto-rotate
        style={{ width: '100%', height: '100%' }}
      >
        <button slot="ar-button" style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '12px 24px',
          background: '#FF5722',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer'
        }}>
          Activer la Caméra AR
        </button>
        
        <div slot="ar-prompt" style={{
          position: 'absolute',
          bottom: '80px',
          width: '100%',
          textAlign: 'center',
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: '10px'
        }}>
          Scannez votre environnement pour placer le modèle
        </div>
      </model-viewer>
    </div>
  );
};

export default BlenderText;