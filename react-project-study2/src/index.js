import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import './css/style.css'
// Сюди підключаємо файл з компонентами зібраними і щось ще
// куди буде додан елемент
const app = ReactDOM.createRoot(document.getElementById('app'));
// рендер елементу в потрібне місце
app.render(<App />)


