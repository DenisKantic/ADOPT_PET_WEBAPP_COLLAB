import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function page() {

    const session = await getSession()
    const user = session?.user;

    if(!user){
        redirect("/")
    }

  return (
    <div className='h-screen w-full bg-gray-200 px-10 py-20'>
      <div className="grid grid-cols-5 gap-14 grid-rows-3">
            <div className="bg-gray-300 h-[50vh] col-span-2 row-span-4 p-5">
                    <h1 className="text-xl text-black">Vaši oglasi <span className="text-md font-bold text-gray-700">{`( ${2} )`}</span></h1>
                    <div className="flex flex-row justify-between items-center gap-10">
                        <div className="h-auto border-[1px] border-black rounded-xl my-5 w-full pb-2">
                            <Image
                            src="/images/logo.png"
                            alt="test"
                            height={50}
                            width={50}
                            className="object-scale-down h-[10vh] bg-purple-400 w-full"
                            />
                            <div className="w-full">
                                <ul className="text-black mt-2">
                                    <li>Muzjak</li>
                                    <li>Sarajevo</li>
                                    <li>Junior</li>
                                </ul>
                                <button className="btn btn-primary rounded-full w-full mt-5">Pogledaj detalje</button>

                                <p className="mt-4 text-sm text-black flex justify-between">Datum objave oglasa: <span className="font-bold">11.11.2011</span></p>
                            </div>
                        </div>
                        <div className="h-auto border-[1px] border-black rounded-xl my-5 w-full pb-2">
                            <Image
                            src="/images/logo.png"
                            alt="test"
                            height={50} 
                            width={50}
                            className="object-scale-down h-[10vh] bg-purple-400 w-full"
                            />
                            <div className="w-full">
                                <ul className="text-black mt-2">
                                    <li>Muzjak</li>
                                    <li>Sarajevo</li>
                                    <li>Junior</li>
                                </ul>
                                <button className="btn btn-primary rounded-full w-full mt-5">Pogledaj detalje</button>

                                <p className="mt-4 text-sm text-black flex justify-between">Datum objave oglasa: <span className="font-bold">11.11.2011</span></p>
                            </div>
                        </div>
                    </div>
            </div>
            <div className="bg-gray-300 col-span-3 row-span-2">
                    <h1>Test</h1>
            </div>

            <div className="bg-gray-300 col-span-3 row-span-2">
                    <h1>Test</h1>
            </div>
      </div>

      <div className="mt-10 grid grid-cols-5 grid-rows-1 gap-10 w-full">
        
        <div className="col-span-3 bg-red-400">
        <h1>Najnoviji ljubimci</h1>
                <h1>ostale zivotinje</h1>
        </div>

        <div className="col-span-2 bg-red-200">
            <h1>Vet stanice</h1>
        </div>
      </div>

      
    </div>
  )
}
