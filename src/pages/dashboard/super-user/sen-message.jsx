import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    dateEntretien: '',
    heureEntretien: '',
    local: '',
    contactResponsable: '',
    informationsSupplementaires: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3001/student')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
  
      await axios.delete(`http://localhost:3001/student/${id}`);
      setUsers(users.filter(user => user._id !== id));
    
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendConfirmation = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:3001/emailMessage', {
        destinataire: selectedUser.email,
        nomEtudiant: selectedUser.name,
        ...formData
      });
      alert("Email envoyé avec succès !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi de l'email.");
    }
    setLoading(false);
    setModalOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Liste des utilisateurs</h2>
      <ul className="space-y-4">
        {users.map(user => (
          <li key={user._id} className="border p-4 rounded shadow-md flex justify-between items-center">
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="space-x-2">
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(user._id)}
              >
                Supprimer
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => handleOpenModal(user)}
              >
                Programmer entretien
              </button>
            </div>
          </li>
        ))}
      </ul>

      {modalOpen && selectedUser && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Envoyer un email à {selectedUser.name}</h3>
            <input name="dateEntretien" type="date" onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <input name="heureEntretien" type="time" onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <input name="local" placeholder="Lieu" onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <input name="contactResponsable" placeholder="Contact responsable" onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <textarea name="informationsSupplementaires" placeholder="Infos supplémentaires" onChange={handleChange} className="w-full mb-4 p-2 border rounded"></textarea>

            <div className="flex justify-end space-x-2">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setModalOpen(false)}>Annuler</button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={sendConfirmation}
                disabled={loading}
              >
                {loading ? "Envoi..." : "Confirmer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
