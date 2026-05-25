// src/components/LoadingAndError.jsx
export function LoadingSpinner() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem' }}>
      <div style={{
        width: '36px',
        height: '36px',
        border: '4px solid #dfd5cc',
        borderTop: '4px solid #503e4d',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <p style={{ marginTop: '12px', fontSize: '13px', color: '#8b7a87' }}>Mengamankan jalur data API...</p>
    </div>
  );
}

export function ErrorMessage({ message }) {
  return (
    <div style={{
      backgroundColor: '#f3dbdb',
      border: '1px solid #7e4242',
      color: '#7e4242',
      padding: '12px',
      borderRadius: '12px',
      textAlign: 'center',
      margin: '12px 0',
      fontSize: '14px'
    }}>
      ⚠️ Kesalahan Sistem: {message}
    </div>
  );
}