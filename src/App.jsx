// src/App.jsx
import { useState } from 'react';
import UserList from './components/UserList';       // Praktikum 1 (GET)
import AddPostForm from './components/AddPostForm'; // Praktikum 2 (POST)
import Dashboard from './components/Dashboard';     // Tugas Mandiri (PjBL)

function App() {
  const [currentMenu, setCurrentMenu] = useState('praktikum');
  
  const handlePostSuccess = (newPostData) => {
    console.log('Data sukses dikirim ke API:', newPostData);
    alert(`Sukses! Post baru dengan judul "${newPostData.title}" berhasil disimulasikan ke backend.`);
  };

  return (
    <div style={styles.appContainer}>
      
      {/* ========================================================= */}
      {/* SIDEBAR KIRI (Mirip Desain Smartech)                     */}
      {/* ========================================================= */}
      <aside style={styles.sidebar}>
        <div style={styles.brandSection}>
          <div style={styles.logoIcon}>🚀</div>
          <div>
            <h1 style={styles.brandName}>Smartech</h1>
            <span style={styles.brandSubtitle}>API Portal</span>
          </div>
        </div>

        {/* Profil Singkat Mahasiswa di Sidebar */}
        <div style={styles.profileCard}>
          <div style={styles.avatar}>MA</div>
          <div style={styles.profileInfo}>
            <h3 style={styles.studentName}>Mifta Annisa R.</h3>
            <p style={styles.studentClass}>Kelas T2F</p>
            <span style={styles.groupBadge}>Kelompok 4</span>
          </div>
        </div>

        {/* Menu Navigasi */}
        <nav style={styles.navMenu}>
          <button 
            onClick={() => setCurrentMenu('praktikum')}
            style={{
              ...styles.navButton,
              backgroundColor: currentMenu === 'praktikum' ? '#ffffff' : 'transparent',
              color: currentMenu === 'praktikum' ? '#503e4d' : '#8b7a87',
              fontWeight: currentMenu === 'praktikum' ? 'bold' : 'normal',
              boxShadow: currentMenu === 'praktikum' ? '0 4px 12px rgba(0,0,0,0.04)' : 'none'
            }}
          >
            <span style={styles.menuIcon}>📋</span> Dashboard Praktikum
          </button>
          
          <button 
            onClick={() => setCurrentMenu('pjbl')}
            style={{
              ...styles.navButton,
              backgroundColor: currentMenu === 'pjbl' ? '#ffffff' : 'transparent',
              color: currentMenu === 'pjbl' ? '#503e4d' : '#8b7a87',
              fontWeight: currentMenu === 'pjbl' ? 'bold' : 'normal',
              boxShadow: currentMenu === 'pjbl' ? '0 4px 12px rgba(0,0,0,0.04)' : 'none'
            }}
          >
            <span style={styles.menuIcon}>🛸</span> Rick & Morty (PjBL)
          </button>
        </nav>

        <div style={styles.sidebarFooter}>
          <p style={styles.footerText}>v1.0.0 Proyek PjBL</p>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* AREA KONTEN UTAMA (SISI KANAN)                            */}
      {/* ========================================================= */}
      <main style={styles.mainContent}>
        {/* Top Header Bar */}
        <header style={styles.topBar}>
          <h2 style={styles.greetingTitle}>
            HELLO, MIFTA! 👋
          </h2>
          <div style={styles.topBarStatus}>
            <span style={styles.statusDot}></span> Sistem Terintegrasi
          </div>
        </header>

        {/* Kondisi Render Berdasarkan Menu Aktif */}
        <div style={styles.contentBody}>
          {currentMenu === 'praktikum' && (
            <div style={styles.praktikumLayout}>
              {/* Sektor Kiri: Form Input Tambah Post (Praktikum 2) */}
              <div style={styles.gridColumn}>
                <section style={styles.dashboardCard}>
                  <AddPostForm onSuccess={handlePostSuccess} />
                </section>
              </div>

              {/* Sektor Kanan/Bawah: Daftar Pengguna (Praktikum 1) */}
              <div style={styles.gridFullWidth}>
                <section style={styles.dashboardCardNoPadding}>
                  <UserList />
                </section>
              </div>
            </div>
          )}

          {currentMenu === 'pjbl' && (
            <div style={styles.pjblContainer}>
              {/* Dashboard Rick and Morty menggunakan Tailwind CSS */}
              <Dashboard />
            </div>
          )}
        </div>
      </main>

    </div>
  );
}

// Objek Gaya Desain Pastel Komprehensif (Berdasarkan Gambar Referensi)
const styles = {
  appContainer: {
    display: 'flex',
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: '#f6f1eb', // Latar krem lembut aplikasi utama
    minHeight: '100vh',
    color: '#503e4d', // Warna teks ungu gelap kusam
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  sidebar: {
    width: '280px',
    backgroundColor: '#eae3db', // Latar sidebar ungu-krem pastel kusam
    padding: '2rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid rgba(80, 62, 77, 0.05)',
  },
  brandSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '2.5rem',
  },
  logoIcon: {
    fontSize: '24px',
    backgroundColor: '#dfd5cc',
    padding: '8px',
    borderRadius: '12px',
  },
  brandName: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0,
    color: '#503e4d',
    letterSpacing: '-0.5px',
  },
  brandSubtitle: {
    fontSize: '12px',
    color: '#8b7a87',
    display: 'block',
  },
  profileCard: {
    backgroundColor: '#dfd5cc', // Card profil tumpul dalam sidebar
    padding: '1.2rem',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '2rem',
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#503e4d',
    color: '#f6f1eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  profileInfo: {
    flex: 1,
  },
  studentName: {
    margin: 0,
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#503e4d',
  },
  studentClass: {
    margin: '2px 0 6px 0',
    fontSize: '12px',
    color: '#8b7a87',
  },
  groupBadge: {
    fontSize: '11px',
    backgroundColor: '#cbbdaf',
    color: '#503e4d',
    padding: '2px 8px',
    borderRadius: '20px',
    fontWeight: '600',
  },
  navMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    padding: '12px 16px',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '14px',
    transition: 'all 0.2s ease',
  },
  menuIcon: {
    fontSize: '16px',
  },
  sidebarFooter: {
    marginTop: 'auto',
    paddingTop: '1rem',
    borderTop: '1px solid rgba(80, 62, 77, 0.05)',
  },
  footerText: {
    margin: 0,
    fontSize: '12px',
    color: '#8b7a87',
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
    padding: '2rem 2.5rem',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  greetingTitle: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#503e4d',
    letterSpacing: '-0.5px',
  },
  topBarStatus: {
    backgroundColor: '#eae3db',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#8fa89b', // Warna hijau pastel redup untuk indikator status
    borderRadius: '50%',
    display: 'inline-block',
  },
  contentBody: {
    flex: 1,
  },
  praktikumLayout: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  gridColumn: {
    width: '100%',
  },
  gridFullWidth: {
    width: '100%',
  },
  dashboardCard: {
    backgroundColor: '#eae3db',
    padding: '2rem',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(80, 62, 77, 0.02)',
  },
  dashboardCardNoPadding: {
    backgroundColor: '#eae3db',
    padding: '1.5rem 0 2rem 0',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(80, 62, 77, 0.02)',
  },
  pjblContainer: {
    width: '100%',
  }
};

export default App;