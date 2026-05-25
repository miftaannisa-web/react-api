// src/components/LocationCard.jsx
export default function LocationCard({ location }) {
  return (
    <div className="bg-[#f6f1eb] p-4 rounded-2xl shadow-sm border border-black/5 flex flex-col justify-between min-h-[120px]">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8b7a87] bg-[#dfd5cc] px-2 py-0.5 rounded-md inline-block">
          {location.type || 'Dimension'}
        </span>
        <h3 className="text-sm font-bold text-[#503e4d] mt-2 truncate" title={location.name}>
          {location.name}
        </h3>
      </div>
      <p className="text-[#8b7a87] text-xs mt-3 truncate">
        Dimensi: <span className="text-[#503e4d] font-medium">{location.dimension}</span>
      </p>
    </div>
  );
}