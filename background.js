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
  