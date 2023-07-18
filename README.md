# Name Variant Search Tool

https://bellingcat.github.io/name-variant-search/

### Motivation

When researching an individual online, it is useful to search not only for their full legal name but also for many variants. This can become tedious and time consuming for the researcher and could be streamlined.

###Goal

Given a person's name, generate various plausible alternative forms of the name and streamline the work of researching each one.

###Flow

Enter a name in a form field and submit. Possible outcomes, (in order of increasing complexity of implementation):
1. Display a list of potential name variants (selectable/editable?)
2. Render a button to open a search for that name in a new tab 
3. Construct a compound search query to search all the selected variants at once.
4. Run a search query in the background, load and render the results in a usable way.

## Considerations

When generating name variants, many considerations apply and may be culturally specific. See https://en.wikipedia.org/wiki/Personal_name

**Initials** may be substituted for first or middle names, and middle names may be omitted.
Example: The name "Alfred Jodocus Kwak" may appear online as any of the following equivalents: 
 * Alfred Kwak
 * Alfred J. Kwak
 * AJ Kwak
 * A. J. Kwak
 * Kwak, Alfred J
 * Al Kwak

**Name order** is culturally specific: East Asian names are often written surname-givenname instead of the western style of givenname-surname, not to mention in a different character sets:
Example: Hayao Miyazaki
 * Miyazaki Hayao
 * 宮崎 駿

**Patronyms/matronyms** (names derived from the given name of a parent) may appear before, after, or in place of a surname.
Example: Abel Janszoon Tasman ("Abel, son of Jan Tasman")
 * Abel Tasman
 * Abel Janszoon

**Shortened or diminuitive** versions of a name may exist and are culturally specific.
Example: Mike for Michael, Bill for William, Bob for Robert in the West. Katya for Ekaterina in Eastern Europe.

**Marriage** may result in surname changes, hyphenation or combination of one's original name(s).


## Possibly Helpful Libraries
* https://nameparser.readthedocs.io/en/latest/ (python)
* https://github.com/theiconic/name-parser (php)
* https://github.com/berkmancenter/namae (ruby)
* https://github.com/carltonnorthern/nicknames (python)

TextGain's language ID api may be useful when deciding which culturally-specific variants to include: https://apiv2.textgain.com/redoc#tag/Identification/operation/language_identification_language_post
