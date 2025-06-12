import React, { useEffect, useState } from 'react';

export default function NotificationUser() {
  const [applications, setApplications] = useState([]);
  const [successRate, setSuccessRate] = useState(0);
  const [pendingMessages, setPendingMessages] = useState([]);

  useEffect(() => {
    // Retrieve applications from local storage
    const storedApplications = JSON.parse(localStorage.getItem('applications')) || [];
    setApplications(storedApplications);

    // Calculate success rate (for example, assume a random success rate)
    const successCount = storedApplications.length; // Assume all applications are successful for simplicity
    const totalCount = 10; // Total applications for calculation purposes
    setSuccessRate(Math.round((successCount / totalCount) * 100));

    // Simulate pending messages
    const messages = ["Votre candidature a été reçue.", "Vous avez une réponse en attente."];
    setPendingMessages(messages);
  }, []);

  return (
    <div className="w-full px-4 sm:px-0 py-6 flex flex-col items-start">
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>

      {/* Success Rate */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Taux de réussite : {successRate}%</h3>
      </div>

      {/* Applications List */}
      <div className="w-full bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4">Candidatures effectuées :</h3>
        {applications.length > 0 ? (
          applications.map((app, index) => (
            <div key={index} className="border-b py-2">
              <p className="font-medium">{app.title}</p>
              <p className="text-sm text-gray-600">Date de postulation : {app.date}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">Aucune candidature effectuée.</p>
        )}
      </div>

      {/* Pending Messages */}
      {pendingMessages.length > 0 && (
        <div className="mt-4 w-full bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
          <h3 className="font-semibold">Messages en attente :</h3>
          <ul className="list-disc pl-5">
            {pendingMessages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}