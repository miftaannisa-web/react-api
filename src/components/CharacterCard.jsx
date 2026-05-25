// src/components/CharacterCard.jsx
export default function CharacterCard({ character }) {
  const statusColor = 
    character.status === 'Alive' ? 'bg-green-500' : 
    character.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500';

  return (
    <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:scale-105 transition-transform duration-200">
      <img src={character.image} alt={character.name} class="w-full h-48 object-cover" />
      <div class="p-4">
        <h3 class="text-xl font-bold text-white truncate">{character.name}</h3>
        <div class="flex items-center gap-2 mt-1">
          <span class={`w-3 h-3 rounded-full ${statusColor}`}></span>
          <span class="text-gray-300 text-sm">{character.status} - {character.species}</span>
        </div>
        <p class="text-gray-400 text-xs mt-3">Lokasi Terakhir:</p>
        <p class="text-gray-200 text-sm truncate">{character.location.name}</p>
      </div>
    </div>
  );
}