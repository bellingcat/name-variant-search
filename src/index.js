import { getAliases } from '@bellingcat/alias-generator';
import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';
import { TagsInput } from "react-tag-input-component";

const TagsEditor = () => {
  const [selected, setSelected] = useState([]);
  const [suggested, setSuggested] = useState(new Set());

  function onChangeHandler(newSelected) {
    setSelected(newSelected);

    const searchInput = document.querySelector('input.gsc-input');
    searchInput.value = constructGoogleQuery(newSelected);
    const searchButton = document.querySelector('button.gsc-search-button');
    searchButton.click();

    newSelected.forEach(function(name) {
      const results = getAliases(name).map(function(name) {
        return `\"${name}\"` // make the name quoted search term
      }).forEach(function(name) {
        suggested.add(name);
      });
      setSuggested(suggested);
      console.log('suggested', results);
    });
  }

  return (
    <div className="results">

      <div>
          <div>
            <TagsInput value={selected} onChange={onChangeHandler}
              name="names"
              placeHolder="enter names"
            />
            <em>press enter or comma to add new name</em>
          </div>
      </div>
      <h3>Suggestions</h3>
      <ul>
      {
        Array.from(suggested).map(function(name) {
          return <li className='result' key={name}>
            <span className="name">{name}</span>
            { searchButtons(name) }
          </li>;
        })
      }
      </ul>
    </div>
  );
};

let output = document.querySelector("#output");
const root = createRoot(output);
root.render( <TagsEditor />);

function searchButtons(query) {
  return <span className="buttons">
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

