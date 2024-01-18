import React, { useState } from 'react';
import TagsEditor from './TagsEditor';
import SiteFilters from './SiteFilters';

function constructGoogleQuery(names, sites) {
  const nameQuery = names.map((name) => `\"${name}\"`).join(" OR ");

  if (sites.length) {
    const siteFilter = sites.map((site) => `site:${site}`).join(" OR ");
    return `${nameQuery} (${siteFilter})`;
  } else {
    return nameQuery;
  }
}

const App = () => {
  const [names, setNames] = useState([]);
  const [sites, setSites] = useState([]);

  const searchInput = document.querySelector('input.gsc-input');
  if (searchInput)  {
    searchInput.value = constructGoogleQuery(names, sites);
    const searchButton = document.querySelector('button.gsc-search-button');
    searchButton.click();
  }

  const searchResults = document.querySelector('#searchResults');
  if (searchResults) {
    if (names.length > 0) {
      searchResults.className = '';
    } else {
      searchResults.className = 'hide';
    }
  }

  return (
    <>
      <div className='left'>
        <TagsEditor onChange={setNames} />
        { names.length > 0 ? <SiteFilters onChange={setSites} /> : null }
      </div>
    </>
  );
};

export default App;
