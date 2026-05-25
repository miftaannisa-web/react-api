// src/components/UserList.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from './UserTable';
import LoadingSpinner from './LoadingSpinner';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (err) {
      setError('Gagal mengambil data dari server cloud.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  if (error) return (
    <div style={styles.errorContainer}>
      <p style={styles.errorText}>⚠️ {error}</p>
      <button onClick={fetchUsers} style={styles.retryButton}>Coba Lagi</button>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h2 style={styles.sectionTitle}>📋 Database Pengguna (GET API)</h2>
        <span style={styles.counterBadge}>{filteredUsers.length} Terfilter</span>
      </div>

      {/* Input Pencarian Berbentuk Kapsul Elips Sesuai Gambar */}
      <div style={styles.searchWrapper}>
        <span style={styles.searchIcon}>🔍</span>
        <input
          type="text"
          placeholder="Cari nama atau alamat email pengguna..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInputCapsule}
        />
      </div>

      {/* Mengirim data terfilter ke komponen UserTable */}
      <UserTable users={filteredUsers} />

      <div style={styles.footerAction}>
        <button onClick={fetchUsers} style={styles.refreshButton}>
          🔄 Sinkronisasi Data Ulang
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '0 2rem',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#503e4d',
  },
  counterBadge: {
    backgroundColor: '#dfd5cc',
    color: '#503e4d',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
  },
  searchWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  searchIcon: {
    position: 'absolute',
    left: '18px',
    fontSize: '14px',
    color: '#8b7a87',
  },
  searchInputCapsule: {
    width: '100%',
    padding: '12px 12px 12px 45px',
    backgroundColor: '#f6f1eb', // Latar input krem senada kontainer utama
    border: 'none',
    borderRadius: '9999px', // Bentuk Kapsul Elips Sempurna
    fontSize: '14px',
    color: '#503e4d',
    outline: 'none',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.02)',
  },
  errorContainer: {
    textAlign: 'center',
    padding: '3rem 2rem',
  },
  errorText: {
    color: '#b56565',
    margin: '0 0 1rem 0',
  },
  retryButton: {
    padding: '8px 18px',
    backgroundColor: '#503e4d',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  footerAction: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '1.5rem',
  },
  refreshButton: {
    padding: '10px 18px',
    backgroundColor: '#dfd5cc',
    color: '#503e4d',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'background-color 0.2s',
  }
};