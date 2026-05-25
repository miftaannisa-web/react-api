// src/components/AddPostForm.jsx
import { useState } from 'react';
import axios from 'axios';

export default function AddPostForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/users',
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }
      );

      setMessage({ type: 'success', text: 'Data baru berhasil disimulasikan ke sistem!' });
      setFormData({ name: '', email: '', phone: '' });

      if (onSuccess) onSuccess(response.data);

    } catch (error) {
      setMessage({ type: 'error', text: 'Gagal mengirimkan formulir!' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.formContainer}>
      <h3 style={styles.formTitle}>📝 Tambah Anggota Baru (POST API)</h3>

      {message && (
        <div style={message.type === 'success' ? styles.successAlert : styles.errorAlert}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.formLayout}>
        <div style={styles.inputGroup}>
          <input
            type="text"
            name="name"
            placeholder="Nama Lengkap"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.pastelInput}
          />
          <input
            type="email"
            name="email"
            placeholder="Alamat Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.pastelInput}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Nomor Telepon Seluler"
            value={formData.phone}
            onChange={handleChange}
            required
            style={styles.pastelInput}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            ...styles.submitButton,
            backgroundColor: isSubmitting ? '#cbbdaf' : '#503e4d',
          }}
        >
          {isSubmitting ? 'Sedang Memproses...' : 'Simpan ke Cloud Backend'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  formContainer: {
    width: '100%',
  },
  formTitle: {
    margin: '0 0 1.2rem 0',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#503e4d',
  },
  formLayout: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  inputGroup: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '12px',
  },
  pastelInput: {
    padding: '12px 16px',
    backgroundColor: '#f6f1eb', // Input menggunakan warna cerah krem
    border: '1px solid rgba(80, 62, 77, 0.05)',
    borderRadius: '12px', // Sudut melengkung halus
    fontSize: '14px',
    color: '#503e4d',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  submitButton: {
    padding: '12px 24px',
    color: '#f6f1eb',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    boxShadow: '0 4px 12px rgba(80, 62, 77, 0.15)',
    transition: 'all 0.2s',
  },
  successAlert: {
    backgroundColor: '#dfebd5', // Hijau pastel kusam lembut
    color: '#496036',
    padding: '10px 14px',
    borderRadius: '10px',
    fontSize: '13px',
    marginBottom: '1rem',
    fontWeight: '500',
  },
  errorAlert: {
    backgroundColor: '#f3dbdb', // Merah pastel kusam lembut
    color: '#7e4242',
    padding: '10px 14px',
    borderRadius: '10px',
    fontSize: '13px',
    marginBottom: '1rem',
    fontWeight: '500',
  }
};