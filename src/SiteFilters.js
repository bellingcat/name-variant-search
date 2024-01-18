import React, { useState } from 'react';

const SiteFilters = (props) => {
  const SITES = [
    {name: "facebook", url: "facebook.com"},
    {name: "linkedin", url: "linkedin.com"},
    {name: "twitter", url: "twitter.com"},
  ];

  const [selected, setSelected] = useState([]);

  function onChangeHandler(e) {
    let value = e.currentTarget.value;
    let checked = e.currentTarget.checked;
    let newSelected = [...selected];
    if (checked) {
      if (selected.indexOf(value) == -1) {
        newSelected = [...selected, value];
      }
    } else {
      newSelected = selected.filter((site) => site != value);
    }
    setSelected(newSelected);
    props.onChange(newSelected);
  }

  const siteCheckbox = function(site) {
    return <div className="sitefilters_sites_site">
      <input name={site.name} type="checkbox" value={site.url} onChange={onChangeHandler} />
      <label for={site.name}>{site.name}</label>
    </div>;
  }

  return (
    <div className="sitefilters">
      <h3>Sites</h3>
      <p>Filter by website:</p>
      <div className="sitefilters_sites">
        {SITES.map(siteCheckbox)}
      </div>
    </div>
  );
};

export default SiteFilters;
