# Name Variant Search Tool

https://bellingcat.github.io/name-variant-search/

### Motivation

When researching an individual online, it is useful to search not only for their full legal name but also for many variants. This can become tedious and time consuming for the researcher and could be streamlined.

### Goal

Given a person's name, generate various plausible alternative forms of the name and streamline the work of researching each one.

## Generating variants

Generating variants is handled by the node module [alias-generator](https://github.com/bellingcat/alias-generator)

TextGain's language ID api may be useful when deciding which culturally-specific variants to include: https://apiv2.textgain.com/redoc#tag/Identification/operation/language_identification_language_post
