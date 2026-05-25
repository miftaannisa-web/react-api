// src/components/UserTable.jsx
export default function UserTable({ users }) {
  if (users.length === 0) {
    return <p style={{ textAlign: 'center', color: '#8b7a87', padding: '2rem 0' }}>Data pengguna tidak ditemukan.</p>;
  }

  return (
    // Mengubah sistem layout dari table element menjadi Grid Card Responsif
    <div style={styles.gridContainer}>
      {users.map((user) => (
        <div key={user.id} style={styles.userCard}>
          <div style={styles.cardHeader}>
            <div style={styles.badgeId}>ID: {user.id}</div>
            <div style={styles.userAvatarSquare}>{user.name.charAt(0)}</div>
          </div>
          
          <h3 style={styles.userName}>{user.name}</h3>
          
          <div style={styles.infoDivider}></div>
          
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>✉️ Email:</span>
            <span style={styles.infoValue} title={user.email}>{user.email}</span>
          </div>
          
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>📞 Telepon:</span>
            <span style={styles.infoValue}>{user.phone}</span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>🌐 Web:</span>
            <span style={styles.infoValue}>{user.website}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '16px',
    width: '100%',
    marginTop: '1rem',
  },
  userCard: {
    backgroundColor: '#f6f1eb', // Card dalam berwarna cerah kontras dengan latar pembungkusnya
    padding: '1.2rem',
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.01)',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid rgba(80, 62, 77, 0.02)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  badgeId: {
    fontSize: '11px',
    backgroundColor: '#eae3db',
    color: '#8b7a87',
    padding: '2px 8px',
    borderRadius: '8px',
    fontWeight: 'bold',
  },
  userAvatarSquare: {
    width: '28px',
    height: '28px',
    backgroundColor: '#dfd5cc',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#503e4d',
  },
  userName: {
    margin: '4px 0 10px 0',
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#503e4d',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  infoDivider: {
    height: '1px',
    backgroundColor: 'rgba(80, 62, 77, 0.06)',
    marginBottom: '10px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    marginBottom: '6px',
  },
  infoLabel: {
    color: '#8b7a87',
  },
  infoValue: {
    color: '#503e4d',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '150px',
    textAlign: 'right',
  }
};