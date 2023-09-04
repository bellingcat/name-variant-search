import React, { useState } from 'react';
import { getAliases } from '@bellingcat/alias-generator';
import { TagsInput } from "react-tag-input-component";
import { Toaster, toast } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'

function copyToClipboard(name) {
  navigator.clipboard.writeText(name);
  toast.success("Copied to clipboard", {id: 'clipboard'});
}

function searchButtons(query) {
  return <span className="searchButtons">
    { button("", 'google', google(query)) }
    { button("", 'ddg', ddg(query)) }
    { button("", 'facebook', facebook(query)) }

    <a onClick={() => copyToClipboard(query)}>
      <FontAwesomeIcon icon={faCopy} className='logo'/>
    </a>
  </span>;
}

function button(text, className, href) {
  return <a target="_blank" href={href}>
    <span className={"logo " + className}>{text}</span>
  </a>;
}

function facebook(query) {
  if (Array.isArray(query)) {
    query = query.join("%20OR%20")
  }
  return `https://www.facebook.com/search/people/?q=${query}`;
}

function google(query) {
  if (Array.isArray(query)) {
    query = query.join(" OR ");
  }
  return `https://google.com/search?q=${query}`;
}
function ddg(query) {
  if (Array.isArray(query)) {
    query = query.join(" ");
  }
  return `https://duckduckgo.com/?q=${query}`;
}

const TagsEditor = () => {
  const [selected, setSelected] = useState([]);
  const [suggested, setSuggested] = useState(new Set());

  function constructGoogleQuery(names) {
      return names.map(function(name) {
        return `\"${name}\"` // make the name quoted search term
      }).join(" OR ");
  }

  function onChangeHandler(newSelected) {
    newSelected = newSelected.map(function(name) {
      return name.toLowerCase();
    })
    setSelected(newSelected);

    const searchInput = document.querySelector('input.gsc-input');
    if (searchInput)  {
      searchInput.value = constructGoogleQuery(newSelected);
      const searchButton = document.querySelector('button.gsc-search-button');
      searchButton.click();
    }

    newSelected.forEach(function(name) {
      let newSuggested = new Set(suggested);
      const results = getAliases(name).forEach(function(name) {
        newSuggested.add(name);
      });
      setSuggested(newSuggested);
    });
  }

  function addSuggestion(event) {
    console.log(arguments);
    let name = event.currentTarget.dataset.name;
    if (selected.indexOf(name) >= 0) {
      // dupe
    } else {
      setSelected([...selected, name]);
    }
  }

  const rightPane = document.querySelector('#right');
  if (selected.length <= 0) {
    rightPane.className = 'hide';
    suggested.clear();
  } else {
    rightPane.className = '';
  }

  return (
    <div className="results">
      <Toaster />
      <div>
          <div>
            <p>Search for exact matches on any of these names:</p>
            <TagsInput value={selected} onChange={onChangeHandler}
              name="names"
              placeHolder="enter names"
            />
            <em>Press Enter to add new name. Backspace to delete.</em>
          </div>
      </div>
    { (suggested.size) > 0 ? <h3>Suggestions</h3> : null}
      <ul>
      {
        Array.from(suggested).map(function(name) {
          if (selected.indexOf(name) >= 0) {
            return;
          }
          return <li className='result' key={name}>
            <button onClick={addSuggestion} data-name={name}>
              Add
            </button>
            <span className="name">{name}</span>
            { searchButtons(name) }
          </li>;
        })
      }
      </ul>
    </div>
  );
};

export default TagsEditor;
