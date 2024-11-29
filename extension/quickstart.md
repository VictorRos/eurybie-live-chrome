# Welcome to your Chrome Extension

## What's in this directory

- `config/`: Webpack configuration for this project.
- `public/`: Popup files.
  - `manifest.json`: Extension [configuration][chrome-ext-configuration].
- `src/`: Source files for the popup, [background scripts][chrome-ext-background-script], and [content scripts][chrome-ext-content-script].
- `package.json`: Contains project configuration, scripts, and dependencies.

## Test the extension

1. `npm run watch`
2. Open [chrome://extensions](chrome://extensions).
3. Enable developer mode (top right of page).
4. Click "Load unpacked extension" (top left page).
5. Select this directory.

## Bundle the extension

To package the source code into static files for the Chrome WebStore, execute `npm run build`.

## Documentation

Refer to [the Chrome developer documentation][chrome-ext-developer-documentation] to get started.

<!-- Links -->

[chrome-ext-configuration]: https://developer.chrome.com/docs/extensions/mv2/manifest/
[chrome-ext-background-script]: https://developer.chrome.com/docs/extensions/mv3/service_workers/#manifest
[chrome-ext-content-script]: https://developer.chrome.com/docs/extensions/mv3/content_scripts/
[chrome-ext-developer-documentation]: https://developer.chrome.com/docs/extensions/mv3/getstarted/
