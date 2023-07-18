import { getAliases } from '@bellingcat/alias-generator';

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
