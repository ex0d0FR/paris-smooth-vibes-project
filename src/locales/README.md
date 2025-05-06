
# Localization Structure

This directory contains translations for the Paris 2025 website.

## Structure

Each language has its own subdirectory (e.g., `en`, `es`, `fr`) containing multiple JSON files organized by feature:

- `common.json` - Common translations (like language names)
- `nav.json` - Navigation menu items
- `hero.json` - Hero section content
- `about.json` - About section content
- `speakers.json` - Speakers section content
- `schedule.json` - Schedule section content
- `venue.json` - Venue information
- `register.json` - Registration section content
- `footer.json` - Footer content
- `visa.json` - Visa requirements section
- `faq.json` - Frequently asked questions
- `registration.json` - Registration form content

## Adding a new language

1. Create a new directory for the language (e.g., `de` for German)
2. Copy all JSON files from the `en` directory
3. Translate the content
4. Update the language selector component to include the new language
