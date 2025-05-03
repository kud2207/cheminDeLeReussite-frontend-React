import React, { useState } from "react"
import axios from "axios"
import { FaGoogle, FaFacebookF } from "react-icons/fa"
import { Link } from "react-router-dom"

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    secondName: "",
    email: "",
    phone: "",
    status: "Étudiant",
    educationLevel: "",
    interests: "",
    cv: "",
    profilePhoto: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Envoyer les données à ton backend ici
      // await axios.post("http://ton-backend/register", formData)
      alert("Inscription réussie")
    } catch (err) {
      console.error(err)
      alert("Erreur lors de l'inscription")
    }
  }

  return (
    <section className="flex flex-col lg:flex-row min-h-screen bg-[#F3F4F8]">
      {/* IMAGE À GAUCHE */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('https://source.unsplash.com/800x800/?education,students')` }}>
        {/* Tu peux remplacer cette image par une image locale ou autre lien */}
      </div>

      {/* FORMULAIRE À DROITE */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 py-12">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Créer un compte</h2>

          <div className="grid grid-cols-2 gap-4">
            <input name="name" placeholder="Prénom" onChange={handleChange} className="p-2 border rounded" required />
            <input name="secondName" placeholder="Nom" onChange={handleChange} className="p-2 border rounded" required />
          </div>

          <input name="email" type="email" placeholder="Email" onChange={handleChange} className="p-2 border rounded w-full mt-4" required />
          <input name="phone" placeholder="Téléphone" onChange={handleChange} className="p-2 border rounded w-full mt-4" required />

          <select name="status" onChange={handleChange} className="p-2 border rounded w-full mt-4">
            <option>Étudiant</option>
            <option>Élève</option>
            <option>Demandeur d'emploi</option>
            <option>Autre</option>
          </select>

          <input name="educationLevel" placeholder="Niveau d'études" onChange={handleChange} className="p-2 border rounded w-full mt-4" />
          <input name="interests" placeholder="Centres d'intérêt" onChange={handleChange} className="p-2 border rounded w-full mt-4" />
          <input name="cv" placeholder="Lien du CV (URL)" onChange={handleChange} className="p-2 border rounded w-full mt-4" />
          <input name="profilePhoto" placeholder="Photo de profil (URL)" onChange={handleChange} className="p-2 border rounded w-full mt-4" />

          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full mt-6">
            S'inscrire
          </button>

          {/* Boutons de connexion sociale */}
          <div className="mt-6 text-center">
            <p className="mb-2 text-sm text-gray-500">Ou s'inscrire avec</p>
            <div className="flex justify-center gap-4">
              <button type="button" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center gap-2">
                <FaGoogle /> Google
              </button>
              <button type="button" className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded flex items-center gap-2">
                <FaFacebookF /> Facebook
              </button>
            </div>
          </div>

          {/* Lien vers connexion */}
          <div className="mt-6 text-center">
            <p className="text-sm">
              Vous avez déjà un compte ?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Connectez-vous
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Register
