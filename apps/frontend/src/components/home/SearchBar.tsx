import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function SearchBar({ searchTerm, setSearchTerm, onSubmit }: SearchBarProps) {
  return (
    <form onSubmit={onSubmit} className=" relative w-[100%]   justify-center">
      <div className=" flex flex-row-reverse  h-full  ">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher une pièce, une marque, une référence..."
          className="relative w-full  px-8 h-10  text-lg border-0
           focus:ring-4 focus:ring-blue-500/30 focus:outline-none shadow-2xl
           bg-white/95 backdrop-blur-sm text-left text-black "
        />
        <button
          type="submit"
          className="relative h-10  bg-gradient-to-r
           from-blue-600 to-cyan-500 hover:from-blue-700
           hover:to-cyan-600 text-white px-8 py-3 rounded-r-xl 
           text-lg font-semibold transition-all duration-300 
           hover:scale-105 shadow-lg flex items-center gap-3"
        >
          <Search className="h-5 w-5" />
          Rechercher
        </button>
      </div>
    </form>
  );
}