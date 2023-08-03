import { getAliases } from '@bellingcat/alias-generator';
import { createRoot } from 'react-dom/client';
import React from 'react';
import ReactDOM from 'react-dom';

let output = document.querySelector("#output");
const root = createRoot(output);

function searchButtons(query) {
  return <span class="buttons">
    { button("G", google(query)) }
    { button("D", ddg(query)) }
    { button("F", facebook(query)) }
  </span>;
}

function button(text, href) {
  return <a target="_blank" href={href}><button>{text}</button></a>;
}

function facebook(query) {
  if (Array.isArray(query)) {
    query = query.join("%20OR%20")
  }
  return `https://www.facebook.com/search/people/?q=${query}`;
}

function constructGoogleQuery(query) {
  return query.join(" OR ");
}

function google(query) {
  if (Array.isArray(query)) {
    query = constructGoogleQuery(query);
  }
  return `https://google.com/search?q=${query}`;
}
function ddg(query) {
  if (Array.isArray(query)) {
    query = query.join(" ");
  }
  return `https://duckduckgo.com/?q=${query}`;
}

function getNames(e) {
  e.preventDefault();
  const name = event.target.elements.name.value;

  const results = getAliases(name).map(function(name) {
    return `\"${name}\"` // make the name quoted search term
  });

  const searchInput = document.querySelector('input.gsc-input');
  searchInput.value = constructGoogleQuery(results);
  const searchButton = document.querySelector('button.gsc-search-button');
  searchButton.click();

  root.render(
    <div class="results">
      <h3>Suggestions</h3>
      <div>
      </div>
      <ul>
      {
        results.map(function(name) {
          return <li class='result'>
            <span class="name">{name}</span>
            { searchButtons(name) }
          </li>;
        })
      }
      </ul>
    </div>
  );
}

const form = document.querySelector("#form");
form.addEventListener('submit', getNames);
