import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import TagsEditor from './TagsEditor';

let output = document.querySelector("#output");
const root = createRoot(output);
root.render( <TagsEditor />);

