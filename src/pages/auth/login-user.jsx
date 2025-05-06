import React, { useState } from "react"
import axios from "axios"
import { FaGoogle, FaFacebookF } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
  const [phone, setPhone] = useState("")
  const [pwd, setPwd] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setLoading(true)

    if (!phone || !pwd) {
      setError("Veuillez remplir tous les champs.")
      setLoading(false)
      return
    }

    try {
      const res = await axios.post("http://localhost:3001/student/login", {
        phone,
        pwd,
      })

      if (res.data.success) {
        localStorage.setItem("token", res.data.data.token)
        setSuccess(true)

        // Attente de 10 secondes avant redirection
        setTimeout(() => {
          navigate("/dashboard")
        }, 6000)
      } else {
        setError(res.data.message || "Erreur de connexion")
      }
    } catch (error) {
      console.error(error)
      setError("Erreur lors de la connexion. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex mt-14 bg-[#F3F4F8]  ">
      <div className="flex justify-center w-full px-6 py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>

          {error && (
            <div className=" text-red-700 p-2 mb-4 rounded text-center">
              {error}
            </div>
          )}

          {success && (
            <div className=" text-green-700 p-2 mb-4 rounded text-center flex items-center justify-center gap-2">
              Connexion réussie.
              <span className="animate-spin h-5 w-5 border-2 border-t-transparent border-green-600 rounded-full"></span>
            </div>
          )}

          <input
            type="text"
            name="phone"
            placeholder="Téléphone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-2 border rounded w-full mb-4"
            required
          />
          <input
            type="password"
            name="pwd"
            placeholder="Mot de passe"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className="p-2 border rounded w-full mb-4"
            required
          />

          <button
            type="submit"
            disabled={loading || success}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>

          <div className="mt-6 text-center">
            <p className="mb-2 text-sm text-gray-500">Ou se connecter avec</p>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center gap-2"
              >
                <FaGoogle /> Google
              </button>
              <button
                type="button"
                className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded flex items-center gap-2"
              >
                <FaFacebookF /> Facebook
              </button>
            </div>
          </div>

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
