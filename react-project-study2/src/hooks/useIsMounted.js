// Перевіряє чи існує ще об'єкт. Якщо не існує, то помилки предотвращає

import { useEffect, useRef, useCallback } from 'react';

export function useIsMounted() {
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true; // Компонент змонтовано

    return () => {
      isMountedRef.current = false; // Компонент розмонтовано
    };
  }, []);

  // Повертаємо функцію, яка завжди віддає актуальний статус
  return useCallback(() => isMountedRef.current, []);
}

// ////////////////////////////////////////////////////////

// import {useIsMounted } from './useIsMounted';

// function MyComponent() {
//     const [data, setData] = useState(null);
//     const isMounted = useIsMounted(); // Отримуємо функцію перевірки

//     useEffect(() => {
//     fetch('https://example.com')
//         .then(res => res.json())
//         .then(result => {
//         // ПЕРЕВІРКА: оновлюємо стейт, ТІЛЬКИ якщо компонент ще на екрані
//         if (isMounted()) {
//             setData(result);
//         }
//         });
//     }, [isMounted]);

//     return <div>{data ? data.name : "Завантаження..."}</div>;
// }
