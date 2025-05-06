import React, { useState } from "react"
import axios from "axios"
import { FaGoogle, FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";


const RegisterUser = () => {

  //laoding pour attendre modal
  const [isLoadingCode, setIsLoadingCode] = useState(false)

  //laoding pour login
  const [loadingSuccess, setLoadingSuccess] = useState(false)
  const navigate = useNavigate()

  //data
  const [formData, setFormData] = useState({
    name: "",
    secondName: "",
    email: "",
    phone: "",
    status: "Étudiant",
    educationLevel: "",
    password: "",
    confirmPassword: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [codeModal, setCodeModal] = useState(false)
  const [code, setCode] = useState("")
  const [serverError, setServerError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError("")
    setIsLoadingCode(true) // Démarre le loading

    if (formData.password !== formData.confirmPassword) {
      setServerError("Les mots de passe ne correspondent pas")
      setIsLoadingCode(false) // arrête le loading si erreur
      return
    }

    try {
      const response = await axios.post("http://localhost:3001/student/create", {
        ...formData,
        pwd: formData.password
      })

      if (response.data.message === "Code de vérification envoyé par email.") {
        setCodeModal(true)
      } else {
        alert("Inscription réussie")
      }
    } catch (err) {
      console.error(err)
      setServerError(err?.response?.data?.message || "Erreur serveur")
    } finally {
      setIsLoadingCode(false) // ✅ Arrête le loading
    }
  }


  const handleVerifyCode = async () => {
    try {
      const response = await axios.post("http://localhost:3001/student/create", {
        ...formData,
        pwd: formData.password,
        code: code
      })

      if (response.data.success) {
        setLoadingSuccess(true)
        setCodeModal(false)
        setTimeout(() => {
          navigate("/login")
        }, 10000)
        // setCodeModal(false)
      } else {
        setServerError(response.data.message)
      }
    } catch (err) {
      console.error(err)
      setServerError(err?.response?.data?.message || "Erreur de vérification")
    }
  }

  if (loadingSuccess) {
    return (
      <div className="h-screen bg-white flex justify-center">
        <div className="flex flex-col items-center mt-32">
          <svg className="animate-spin h-32 w-32 text-blue-600 mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a10 10 0 100 20v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
          </svg>
          <p className="text-gray-600 font-semibold text-xs text-center">
            Votre compte est entre d'être créé ...<br />
          </p>
        </div>
      </div>

    )
  }


  return (
    <section className="bg-[#F3F4F8] flex justify-center">
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 py-12">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">Créer un compte</h1>
          <p className="text-lg text-gray-600 mt-2">Faire passer les Camerounais de l'état de consommateur à producteur</p>
        </div>

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

          <div className="relative w-full mt-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mot de passe"
              onChange={handleChange}
              className="p-2 border rounded w-full"
              required
            />
            <span onClick={togglePasswordVisibility} className="absolute right-3 top-2.5 cursor-pointer text-gray-600">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="relative w-full mt-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirmer le mot de passe"
              onChange={handleChange}
              className="p-2 border rounded w-full"
              required
            />
            <span onClick={toggleConfirmPasswordVisibility} className="absolute right-3 top-2.5 cursor-pointer text-gray-600">
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {serverError && <p className="text-red-500 mt-2 text-sm text-center">{serverError}</p>}

          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full mt-6">
            S'inscrire
          </button>

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

          <div className="mt-6 text-center">
            <p className="text-sm">
              Vous avez déjà un compte ?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Connectez-vous
              </Link>
            </p>
          </div>
          {isLoadingCode && (
            <div className="flex justify-center mt-4">
              <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a10 10 0 100 20v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
              </svg>
            </div>
          )}

        </form>
      </div>

      {/* Modal Code */}
      {codeModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-bold mb-2 text-center">Vérification Email</h3>
            <p className="text-sm text-center mb-4">Un code a été envoyé à votre email. Veuillez le saisir ci-dessous.</p>
            <input
              type="text"
              placeholder="Code de vérification"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            {serverError && <p className="text-red-500 text-sm text-center mb-2">{serverError}</p>}
            <button
              onClick={handleVerifyCode}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
            >
              Vérifier le code
            </button>
            <button
            className="text-orange-500 mt-1"
              type="button"
              onClick={() => setCodeModal(false)}>annuler</button>
          </div>
        </div>
      )}
    </section>
  )
}

export default RegisterUser
