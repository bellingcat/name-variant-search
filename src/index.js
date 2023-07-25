import { getAliases } from '@bellingcat/alias-generator';
import { createRoot } from 'react-dom/client';
import React from 'react';
import ReactDOM from 'react-dom';


function getNames(e) {
  e.preventDefault();
  const name = event.target.elements.name.value;

  const results = getAliases(name);

  let output = document.querySelector("#output");
  output.textContent = "";
  for (const i in results) {
    let item = document.createElement('li');
    item.textContent = results[i];
    output.append(item);
  }
}

const form = document.querySelector("#form");
form.addEventListener('submit', getNames);

const app = document.querySelector("#app");
const root = createRoot(app);
root.render(<h1>Hello, world</h1>);
