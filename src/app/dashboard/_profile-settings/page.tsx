import React from 'react'

const Settings = () => {
  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center  flex-col w-full px-10 py-20">
      <h1 className="text-[#2f5382] text-2xl mt-5 mb-5">Postavke profila</h1>
      <form
        className="card py-5 text-black  bg-white rounded-2xl p-10
                        xxs:w-full xxs:h-screen xxs:overflow-y-scroll 
                        md:w-[500px] md:min-h-[50vh] md:h-auto md:overflow-hidden"
      >
        <div className="flex flex-col justify-center mt-4">
          {/* username */}
          <div className="mb-3">
            <label className="text-lg">Korisnicko ime</label>
            <div className="flex flex-row items-center gap-5">
              <input
                className="input input-bordered input-primary bg-white rounded-full mt-2 p-5 text-lg"
                name="username"
                type="text"
                placeholder="Novo korisnicko ime"
                required
              />
              <button
                className="btn bg-[#2f5382] rounded-full mt-2 text-xl text-white"
                type="submit"
              >
                Promijeni
              </button>
            </div>
          </div>
          <br />
          {/* password */}
          <label className="text-lg">Lozinka</label>
          <div className="flex flex-row items-center gap-5">
            <input
              className="input input-bordered input-primary bg-white rounded-full mt-2 p-5  text-lg"
              type="password"
              name="password"
              placeholder="Upišite novu lozinku"
              required
            />
            <button
              className="btn bg-[#2f5382] rounded-full mt-2 text-xl text-white"
              type="submit"
            >
              Promijeni
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Settings
