import React, { useState, useEffect } from 'react';

export function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Створюємо пульт (він уже вбудований у браузер)
    const controller = new AbortController();
    
    // Запускаємо стандартний запит і передаємо йому сигнал скасування
    fetch('https://typicode.com', { 
      signal: controller.signal 
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data); // Якщо встигли до закриття — записуємо дані
      })
      .catch((error) => {
        // Якщо ми самі скасували запит, браузер викличе цю помилку
        if (error.name === 'AbortError') {
          console.log('Користувач пішов, запит успішно перервано мережею.');
        } else {
          console.error('Сталася якась реальна помилка з інтернетом:', error);
        }
      });

    // Коли компонент зникає, React автоматично виконує цей return.
    // Тут ми тиснемо на кнопку скасування.
    return () => {
      controller.abort();
    };
  }, []); // Порожні дужки означають: запустити один раз при появі на екрані

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      {user ? (
        <h1>Привіт, я {user.name}!</h1>
      ) : (
        <h1>Завантаження профілю...</h1>
      )}
    </div>
  );
}