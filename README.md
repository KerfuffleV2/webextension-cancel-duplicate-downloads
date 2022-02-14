# cancel-duplicate-downloads

## Description

Firefox WebExtension addon to automatically cancel duplicate downloads

## Usage

This addon will automatically cancel downloads that look like a duplicate based on the filename.
Auto-renamed duplicate downloads have a filename similar to `blah(1).txt`.

Clicking the extension icon will toggle whether the cancellation function is enabled. For example, if you actually need to download a file that looks like a duplicate.

The extension icon will show a badge with the number of cancelled downloads. You can SHIFT-click the badge to reset the count.

The badge will be red if the last download was cancelled, otherwise green. You can also hover the extension icon for some stats.

## Installation

The extension is listed on the Firefox addon store: https://addons.mozilla.org/en-US/firefox/addon/cancel-duplicate-downloads/

## Notes

1. The addon cannot actually check if the file exists, so duplicate "detection" is based solely on the filename.
2. The addon won't automatically cancel files without an extension, so `blah(1)` will always be allowed.
