import { signOut } from "@public/auth"

export default function SignOut() {
  return (
    <form action={async()=>{
      "use server";

      await signOut();
    }}>
      <button 
      type="submit"
      className="my-2 text-red-800 font-bold rounded-xl text-start flex justify-start text-md w-full" 
      >
        Odjavi se
        </button>
    </form>
  )
}
