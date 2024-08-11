"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const FilterMenu: React.FC = () => {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [grad, setGrad] = useState("");
  const [spol, setSpol] = useState("");
  const [starost, setStarost] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "category") setCategory(value);
    if (name === "grad") setGrad(value);
    if (name === "spol") setSpol(value);
    if (name === "starost") setStarost(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Trigger fetch on server-side via router push with search params
    const params = new URLSearchParams({ category, grad, spol, starost });
    // router.push(`/adoptPet/${params.toString()}`);
  };

  return (
    <div className="border rounded-[24px] p-4 bg-white shadow-lg">
      <form
        onSubmit={handleSubmit}
        className="flex items-center space-x-4 justify-center mb-3"
      >
        <div className="flex flex-col flex-1">
          <label htmlFor="category" className="mb-1 text-black text-[12px]">
            Kategorija
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={handleInputChange}
            className="p-2 border rounded-[24px] bg-white text-[#A4A4A4] text-[12px]"
          >
            <option value="Pas">Pas</option>
            <option value="Macka">Mačka</option>
            <option value="Ostalo">Ostale životinje</option>
          </select>
        </div>
        <div className="flex flex-col flex-1">
          <label htmlFor="grad" className="mb-1 text-black text-[12px]">
            Grad
          </label>
          <select
            id="grad"
            name="grad"
            value={grad}
            onChange={handleInputChange}
            className="p-2 border rounded-[24px] bg-white text-[#A4A4A4] text-[12px]"
          >
            <option value="Sarajevo">Sarajevo</option>
            <option value="Tuzla">Tuzla</option>
            <option value="Zenica">Zenica</option>
            <option value="Banja Luka">Banja Luka</option>
            <option value="Bihac">Bihac</option>
            <option value="Bijeljina">Bijeljina</option>
          </select>
        </div>
        <div className="flex flex-col flex-1">
          <label htmlFor="spol" className="mb-1 text-black text-[12px]">
            Spol
          </label>
          <select
            id="spol"
            name="spol"
            value={spol}
            onChange={handleInputChange}
            className="p-2 border rounded-[24px] bg-white text-[#A4A4A4] text-[12px]"
          >
            <option value="Musko">Muško</option>
            <option value="Zensko">Žensko</option>
          </select>
        </div>
        <div className="flex flex-col flex-1">
          <label htmlFor="starost" className="mb-1 text-black text-[12px]">
            Starost
          </label>
          <select
            id="starost"
            name="starost"
            value={starost}
            onChange={handleInputChange}
            className="p-2 border rounded-[24px] bg-white text-[#A4A4A4] text-[12px]"
          >
            <option value="Mladje">Mladje</option>
            <option value="Odraslo">Odraslo</option>
            <option value="Starije">Starije</option>
          </select>
        </div>
        <div className="mt-6 px-4">
          <button
            type="submit"
            className="px-4 py-2 text-[14px] text-white bg-[#A4A4A4] rounded-[24px] 
            hover:bg-[#2F5382] mb-1.5"
          >
            Osvježi rezultate
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterMenu;
