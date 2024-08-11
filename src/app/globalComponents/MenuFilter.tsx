"use client"
import { ChangeEvent, useState } from "react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

const FilterMenu: React.FC = () => {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [isPending, startTransition] = useTransition(); // loading state

  const handleInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "category") setCategory(value);
    if (name === "location") setLocation(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const params = new URLSearchParams();
      if (category) {
        params.append("category", category);
      }
      if (location) {
        params.append("location", location);
      }

      const url = `/api/filter-post?${params.toString()}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log("DATA", data);

      // Example: Navigate to another page with fetched data
   
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error state if needed
    }
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
            <option value="">Odaberite kategoriju</option>
            <option value="Pas">Pas</option>
            <option value="Macka">Mačka</option>
            <option value="Ostalo">Ostale životinje</option>
          </select>
        </div>
        <div className="flex flex-col flex-1">
          <label htmlFor="location" className="mb-1 text-black text-[12px]">
            Grad
          </label>
          <select
            id="location"
            name="location"
            value={location}
            onChange={handleInputChange}
            className="p-2 border rounded-[24px] bg-white text-[#A4A4A4] text-[12px]"
          >
            <option value="">Odaberite grad</option>
            <option value="Sarajevo">Sarajevo</option>
            <option value="Tuzla">Tuzla</option>
            <option value="Zenica">Zenica</option>
            <option value="Banja Luka">Banja Luka</option>
            <option value="Bihac">Bihac</option>
            <option value="Bijeljina">Bijeljina</option>
          </select>
        </div>

        <div className="mt-6 px-4">
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 text-[14px] text-white bg-[#A4A4A4] rounded-[24px] hover:bg-[#2F5382] mb-1.5"
          >
            Osvježi rezultate <br />
            {isPending && (
              <span className="loading loading-dots loading-lg bg-[#2F5382]"></span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterMenu;
