# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.






Створення проекту
npm create vite@7.0.3 -> react -> javascript
## після return дужки
## Return має тільки один елемент в корні
## jsx фрагмент <> замість <div>

##  <input type="email" required={true} /> - атрибут required може бути пустим якщо true
## class = className

## <label for='email'> Email:</label><input id='email' type="email"/> - for = htmlFor

<p style={{color:'red', fontWeight:70}}>H1, {username}!</p> - запис інлайн стилів

    {isLoggedIn && <p>H1, {username}!</p>} - Якщо isLoggedIn true то буде зроблене

    <p>{isLoggedIn ? `Hi, ${username}`: 'please Log in'}</p>

if не можна використовувати в  середені return, але можна винести нагору функції компонента

{tasks.map((task)=><li key={task}>{task}</li> )} - взяти масив, і для кожного елементу зробити li з ключем для кожного

Use state - хук
const [value, setValue] = use state(initialValue) - value це значення зараз, setValue це функція, яка впливає на value і оновлює її, initialValue це початкове значення, яке можна задати

Хуки ініціалізуються тільки в тілі функції, до return. Не можна використовувати в середині блоків if,for. Також не можна використовувати в інших функціях всередині, вродє onclick.

id:crypto?.randomUUID() ?? Date.now().toString - рандомний id
?? - якщо ліва частина не працює, то права працює

useRef - треба щоб не було перерендера сторінки. доступ до дом елемента

import {memo} from 'react'
Потрібен щоб не було ререндінгу. Запам'ятовує вхідні данні і рендерить, якщо змінились

useCallback(() =>{},[]) - перевіряє чи змінилось сме посилання. Для функцій, які передаються вродє onClick