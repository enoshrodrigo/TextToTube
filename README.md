
**YouTube Search Extension README**

---

**Overview**  
The YouTube Search extension adds a context menu item to Firefox. When a user selects text on a webpage and right-clicks, the extension displays an option “Search YouTube for '[selected text]'”. Choosing this option will open a new tab with YouTube search results for the selected text.

---

**Files Included**

1. **manifest.json**  
   Contains the extension metadata, permissions, background script reference, icons, and a unique extension ID for Firefox.

   ```json
   {
     "manifest_version": 3,
     "name": "YouTube Search",
     "version": "1.0",
     "description": "Search selected text on YouTube via context menu.",
     "permissions": ["contextMenus", "tabs"],
     "background": {
       "scripts": ["background.js"]
     },
     "icons": {
       "16": "./assets/icon16.png",
       "48": "./assets/icon48.png",
       "128": "./assets/icon128.png"
     },
     "browser_specific_settings": {
       "gecko": {
         "id": "{3e98ddb1-080f-47b3-bfba-73f7a1ab19a3}"
       }
     }
   }
   ```

2. **background.js**  
   This script creates the context menu item when the extension is installed and handles clicks on the menu to perform the YouTube search.

   ```javascript
   // Ensure compatibility across browsers
   if (typeof browser === "undefined") {
       var browser = chrome;
   }
   
   // Create a context menu item when the extension is installed
   browser.runtime.onInstalled.addListener(() => {
       browser.contextMenus.create({
           id: "searchOnYoutube",
           title: 'Search YouTube for "%s"',
           contexts: ["selection"] // This makes the option appear only when text is selected
       });
   });
   
   // Listen for clicks on the context menu item
   browser.contextMenus.onClicked.addListener((info, tab) => {
       if (info.menuItemId === "searchOnYoutube" && info.selectionText) {
           // Encode the selected text to be used in a URL
           const query = encodeURIComponent(info.selectionText);
           const youtubeURL = `https://www.youtube.com/results?search_query=${query}`;
   
           // Open a new tab with the YouTube search results
           browser.tabs.create({
               url: youtubeURL,
               index: tab.index + 1
           });
       }
   });
   ```

3. **Assets Folder**  
   This folder (named `assets`) should contain the icon files: `icon16.png`, `icon48.png`, and `icon128.png`.

---

**Step-by-Step Build and Test Instructions**

1. **Prepare Your Extension Directory**  
   - Place the `manifest.json` and `background.js` files in the same folder.
   - Create an `assets` subfolder within this directory and add your icon files (`icon16.png`, `icon48.png`, and `icon128.png`).

2. **Testing the Extension in Firefox**  
   You can test your extension without any additional tools using Firefox’s built-in temporary add-on loader:
   
   a. Open Firefox.  
   b. In the address bar, type `about:debugging` and press Enter.  
   c. Click on **"This Firefox"** in the left sidebar.  
   d. Click the **"Load Temporary Add-on…"** button.  
   e. In the file dialog that appears, navigate to your extension directory and select the `manifest.json` file.

   Once loaded, test the extension by selecting some text on a webpage, right-clicking, and choosing the “Search YouTube for 'selected text'” option. A new tab should open with YouTube search results.

3. **Packaging the Extension for Submission**  
   Once you are satisfied with the functionality:
   
   a. Ensure all files (including the manifest, background.js, and assets folder) are included in your extension directory.  
   b. Compress the entire extension directory into a `.zip` file. This `.zip` file is what you will submit to the Firefox Add-ons site.

4. **Submitting Your Add-on**  
   - Go to the [Firefox Add-ons Developer Hub](https://addons.mozilla.org/en-US/developers/).  
   - Follow the prompts to submit a new add-on and upload your `.zip` file.  
   - When prompted, include detailed version notes and any necessary test credentials in the "Notes to Reviewer" section (if your add-on required a specific account or login to test its functionality).

---

**Additional Notes**

- **No Node.js Required:**  
  This extension does not use Node.js or any external build tools. All you need is a text editor and Firefox to test the extension.

 

---

By following these instructions, you can successfully build, test, package, and submit your YouTube Search extension for Firefox.

<<<<<<< HEAD
---
=======
---
>>>>>>> 8492fdec3fb64b3f4d49410cf6d8625bd7b64b34
