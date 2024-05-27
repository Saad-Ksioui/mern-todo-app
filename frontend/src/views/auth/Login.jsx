import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const logIn = async (e) => {
    e.preventDefault()
    if (email === '' || password === '') {
      toast.error("Remplissez tous les champs")
      return
    }
    try {
      setIsLoading(true)

      const response = await axios.post('http://localhost:3000/api/user/login', { email, password })

      if (response && response.data) {
        localStorage.setItem('user', response.data)
        toast.success(`Welcome back`)
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
          Login
        </h1>
        <p className="text-lg mb-6 text-gray-700">
          Vous n'avez pas de compte? <Link to={'/register'} className='underline text-gray-900'>Sign up!</Link>
        </p>

        <form onSubmit={logIn} className="w-full">
          <div className="mb-8 w-full">
            <div className="email flex flex-col items-start">
              <label htmlFor="email" className="mb-1 text-black font-medium">Email</label>
              <input type="email" name="email" className="border border-black py-2 px-3 rounded-xl w-full text-gray-500 outline-none" placeholder="johndoe@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="mb-8 w-full">
            <div className="password flex flex-col items-start">
              <label htmlFor="password" className="mb-1 text-black font-medium">Password</label>
              <input type="password" name="password" className="border border-black py-2 px-3 rounded-xl w-full text-gray-500 outline-none" placeholder="*******" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
          </div>

          <button
            type="submit"
            className="bg-gray-900 text-white px-6 py-3 rounded-xl inline-block shadow-md transition duration-300 hover:bg-gray-800"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  )
};

export default Login
