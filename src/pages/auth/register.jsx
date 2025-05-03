import React, { useState } from "react"
import axios from "axios"
import { FaGoogle, FaFacebookF } from "react-icons/fa"
import { Link } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:5000/api/login", { email, phone })
      alert("Connexion réussie")
    } catch (error) {
      console.error(error)
      alert("Erreur de connexion")
    }
  }

  return (
    <section className="flex flex-col lg:flex-row min-h-screen bg-[#F3F4F8]">
      {/* IMAGE À GAUCHE */}
      <div
        className="hidden lg:flex w-1/2 items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('https://source.unsplash.com/800x800/?technology,login')` }}
      ></div>

      {/* FORMULAIRE À DROITE */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 py-12">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded w-full mb-4"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Téléphone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-2 border rounded w-full mb-4"
            required
          />

          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full">
            Se connecter
          </button>

          {/* Boutons de connexion sociale */}
          <div className="mt-6 text-center">
            <p className="mb-2 text-sm text-gray-500">Ou se connecter avec</p>
            <div className="flex justify-center gap-4">
              <button type="button" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center gap-2">
                <FaGoogle /> Google
              </button>
              <button type="button" className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded flex items-center gap-2">
                <FaFacebookF /> Facebook
              </button>
            </div>
          </div>

          {/* Lien vers l'inscription */}
          <div className="mt-6 text-center">
            <p className="text-sm">
              Vous n'avez pas encore de compte ?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Inscrivez-vous
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Login
