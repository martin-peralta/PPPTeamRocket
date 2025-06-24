import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import styles from './MyCollections.module.css';
import { useNavigate } from 'react-router-dom';
import Loading from '../pages/Loading';

const MyCollections = () => {
  const { auth } = useAuth();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getCardImage = async (cardId) => {
    try {
      const response = await axios.get(`https://api.pokemontcg.io/v2/cards/${cardId}`, {
        headers: {
          'X-Api-Key': process.env.REACT_APP_POKEMON_API_KEY
        }
      });
      return response.data.data.images.small;
    } catch {
      return 'https://via.placeholder.com/100';
    }
  };

  const fetchCollections = async () => {
    if (!auth?.user?._id) return;

    try {
      const response = await fetch(`http://localhost:5000/api/cards/collections/user/${auth.user._id}`);
      const data = await response.json();

      if (response.ok) {
        const collectionsWithImages = await Promise.all(
          data.collections.map(async (col) => {
            const images = await Promise.all(
              (col.cards || []).slice(0, 2).map(async (c) => await getCardImage(c.cardId))
            );

            return { ...col, previewImages: images };
          })
        );
        setCollections(collectionsWithImages);
      } else {
        toast.error(data.message || 'Error loading collections');
      }
    } catch (err) {
      console.error('Error loading collections:', err);
      toast.error('Error loading collections');
    } finally {
      setTimeout(() => setLoading(false), 1200);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [auth?.user?._id]);

  const handleDelete = async (collectionId) => {
    if (!auth?.user?._id) return;
    if (!window.confirm('¿Estás seguro que deseas eliminar esta colección?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/cards/collections/${auth.user._id}/${collectionId}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Collection deleted.');
        fetchCollections();
      } else {
        toast.error(data.message || 'Error al eliminar.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error eliminando la colección.');
    }
  };

  const handleEdit = (collectionId) => {
    navigate(`/collections/detail/${collectionId}`);
  };

  if (loading) return <Loading />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Collections</h1>
      {collections.length === 0 ? (
        <p className={styles.empty}>You haven't created any collections yet.</p>
      ) : (
        <div className={styles.grid}>
          {collections.map((col) => (
            <div key={col._id} className={styles.card}>
              <h3 className={styles.cardTitle}>{col.name || col.collectionName}</h3>
              <p className={styles.description}>{col.description || 'No description provided.'}</p>
              <p className={styles.cardCount}><strong>Cards:</strong> {col.cards.length}</p>
              <p className={styles.price}><strong>Total Price:</strong> ${col.totalPrice?.toFixed(2) ?? '0.00'}</p>
              <div className={styles.preview}>
                {col.previewImages.map((img, idx) => (
                  <img key={idx} src={img} alt="preview" />
                ))}
              </div>
              <div className={styles.buttonRow}>
                <button onClick={() => handleEdit(col._id)} className={styles.editButton}>Edit</button>
                <button onClick={() => handleDelete(col._id)} className={styles.deleteButton}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCollections;
