# Name Variant Search Tool

https://bellingcat.github.io/name-variant-search/

### Motivation

When researching an individual online, it is useful to search not only for their full legal name but also for many variants. This can become tedious and time consuming for the researcher and could be streamlined.

### Goal

Given a person's name, generate various plausible alternative forms of the name and streamline the work of researching each one.

### Flow

Enter a name in a form field and submit. Possible outcomes, (in order of increasing complexity of implementation):
1. Display a list of potential name variants (selectable/editable?)
2. Render a button to open a search for that name in a new tab 
3. Construct a compound search query to search all the selected variants at once.
4. Run a search query in the background, load and render the results in a usable way.

## Generating variants

Generating variants is handled by the node module [alias-generator](https://github.com/bellingcat/alias-generator)

TextGain's language ID api may be useful when deciding which culturally-specific variants to include: https://apiv2.textgain.com/redoc#tag/Identification/operation/language_identification_language_post
