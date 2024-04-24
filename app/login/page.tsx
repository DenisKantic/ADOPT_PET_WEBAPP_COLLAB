import Link from "next/link"


export default function Login() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
        <form className="card w-[30%] min-h-[50vh] bg-base-300 rounded-xl p-5">
            <p className="text-2xl py-2 text-center font-bold">Prijavi se</p>

            
            <div className="flex flex-col justify-center mt-10">
            <label className="text-lg">
                Email
            </label>
            <input
            className="input mt-5 p-5 input-bordered text-lg"
            name="email"
            type="email"
            required
            placeholder="Upisite svoj mail"
            />
            <br />

            <label className="text-lg">
                Password
            </label>
            <input
            className="input mt-5 p-5 input-bordered text-lg"
            type="password"
            name="password"
            required
            placeholder="Upisite svoju sifru"
            />
            </div>

            <button 
            className="btn btn-info my-10 text-xl hover:text-white"
            type="submit"
            >
            Prijavi se
            </button>

            <p className="text-lg text-center">Nemas profil? 
            <Link className="underline hover:text-white ml-2" href="/register">
                Klikni ovdje da kreiras
                </Link></p>
           


        </form>
    </div>
  )
}
