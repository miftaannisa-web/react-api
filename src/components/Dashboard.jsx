// src/components/Dashboard.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterCard from './CharacterCard';
import LocationCard from './LocationCard';
import { LoadingSpinner, ErrorMessage } from './LoadingAndError';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('characters');
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = '';
        if (activeTab === 'characters') {
          url = `https://rickandmortyapi.com/api/character?page=${page}&name=${search}&status=${statusFilter}`;
        } else {
          url = `https://rickandmortyapi.com/api/location?page=${page}&name=${search}`;
        }

        const response = await axios.get(url);
        setDataList(response.data.results);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setDataList([]);
        } else {
          setError('Gagal memuat data semesta eksternal.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, page, search, statusFilter]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
    setSearch('');
    setStatusFilter('');
  };

  return (
    <div className="w-full">
      {/* Tab Switcher - Diubah menjadi skema warna pastel kusam [#503e4d] */}
      <div className="flex justify-start gap-3 mb-6">
        <button 
          onClick={() => handleTabChange('characters')}
          className={`px-5 py-2.5 font-bold rounded-xl text-sm transition-all ${activeTab === 'characters' ? 'bg-[#503e4d] text-[#f6f1eb] shadow-md' : 'bg-[#dfd5cc] text-[#503e4d] hover:bg-[#cbbdaf]'}`}
        >
          🛸 Endpoint 1: Karakter Semesta
        </button>
        <button 
          onClick={() => handleTabChange('locations')}
          className={`px-5 py-2.5 font-bold rounded-xl text-sm transition-all ${activeTab === 'locations' ? 'bg-[#503e4d] text-[#f6f1eb] shadow-md' : 'bg-[#dfd5cc] text-[#503e4d] hover:bg-[#cbbdaf]'}`}
        >
          📍 Endpoint 2: Lokasi Dimensi
        </button>
      </div>

      {/* Kontrol Pencarian Oval Elips Sesuai Desain Gambar */}
      <div className="flex flex-col md:flex-row gap-3 mb-6 bg-[#eae3db] p-4 rounded-2xl">
        <div className="flex-1 relative flex items-center">
          <span className="absolute left-4 text-gray-500">🔍</span>
          <input 
            type="text"
            placeholder={`Cari entitas ${activeTab === 'characters' ? 'karakter' : 'lokasi'}...`}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full bg-[#f6f1eb] text-[#503e4d] pl-10 pr-4 py-2.5 rounded-full outline-none text-sm placeholder-gray-400"
          />
        </div>

        {activeTab === 'characters' && (
          <div className="w-full md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="w-full bg-[#f6f1eb] text-[#503e4d] px-4 py-2.5 rounded-xl outline-none text-sm font-medium"
            >
              <option value="">Semua Status</option>
              <option value="alive">Alive (Hidup)</option>
              <option value="dead">Dead (Mati)</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
        )}
      </div>

      {error && <ErrorMessage message={error} />}

      {loading ? (
        <LoadingSpinner />
      ) : dataList.length === 0 ? (
        <div className="bg-[#eae3db] text-center text-gray-500 py-10 rounded-2xl">
          Data tidak ditemukan di dimensi ini.
        </div>
      ) : (
        <div>
          {/* Layout Grid Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {activeTab === 'characters' 
              ? dataList.map(item => <CharacterCard key={item.id} character={item} />)
              : dataList.map(item => <LocationCard key={item.id} location={item} />)
            }
          </div>

          {/* Navigasi Kontrol Halaman Minimalis */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage(prev => prev - 1)}
              className="px-4 py-2 bg-[#dfd5cc] text-[#503e4d] font-semibold text-xs rounded-xl disabled:opacity-40 hover:bg-[#cbbdaf]"
            >
              ◀ Sebelumnya
            </button>
            <span className="text-xs font-bold text-[#503e4d]">Halaman {page}</span>
            <button
              onClick={() => setPage(prev => prev + 1)}
              className="px-4 py-2 bg-[#dfd5cc] text-[#503e4d] font-semibold text-xs rounded-xl hover:bg-[#cbbdaf]"
            >
              Berikutnya ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
}