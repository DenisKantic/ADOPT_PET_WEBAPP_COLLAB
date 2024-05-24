import CardItem from '@/app/globalComponents/CardItem'
import {prisma} from "@/lib/prisma"


export default async function Home() {

  return (
   <div className="h-screen bg-white text-black px-14">
   <h1 className="pt-20">Test page</h1>

   <div className="w-full bg-red-200 h-[10vh]">
      <p className="text-2xl text-center">Category</p>
   </div>

    <div className="grid grid-cols-6 gap-10">
        <CardItem  />
    </div>
    </div>
  );
}
