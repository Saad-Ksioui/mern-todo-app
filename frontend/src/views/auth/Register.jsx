import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const signUp = async (e) => {
    e.preventDefault()
    if (nom === '' || email === '' || password === '') {
      toast.error("Remplissez tous les champs")
      return
    }
    try {
      setIsLoading(true)

      const response = await axios.post('http://localhost:3000/api/user/signup', { nom, email, password })

      if (response && response.data) {
        localStorage.setItem('user', [response.data.token, response.data.UserId, response.data.email])
        toast.success(`Bienvenue`)
        setIsLoading(false)
        navigate('/tasks')
      }
      toast.error(`Veuillez réessayer`)

    } catch (error) {
      toast.error(error.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
          Register
        </h1>
        <p className="text-lg mb-6 text-gray-700">
          Vous avez déjà un compte? <Link to={'/login'} className='underline text-gray-900'>Log in!</Link>
        </p>

        <form onSubmit={signUp} className="w-full">
          <div className="mb-8 w-full">
            <div className="nom flex flex-col items-start">
              <label htmlFor="nom" className="mb-1 text-black font-medium">Nom</label>
              <input type="text" name="nom" className="border-[0.5px] border-gray-700 py-2 px-3 rounded-lg w-full text-gray-500 outline-none" placeholder="John Doe" value={nom} onChange={e => setNom(e.target.value)} />
            </div>
          </div>
          <div className="mb-8 w-full">
            <div className="email flex flex-col items-start">
              <label htmlFor="email" className="mb-1 text-black font-medium">Email</label>
              <input type="email" name="email" className="border-[0.5px] border-gray-700 py-2 px-3 rounded-lg w-full text-gray-500 outline-none" placeholder="johndoe@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="mb-8 w-full">
            <div className="password flex flex-col items-start">
              <label htmlFor="password" className="mb-1 text-black font-medium">Password</label>
              <input type="password" name="password" className="border-[0.5px] border-gray-700 py-2 px-3 rounded-lg w-full text-gray-500 outline-none" placeholder="*******" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
          </div>

          <button
            type="submit"
            className="bg-gray-900 text-white px-6 py-3 rounded-xl inline-block shadow-md transition duration-300 hover:bg-gray-800"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  )
};

export default Register
