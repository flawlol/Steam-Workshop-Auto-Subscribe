# Steam Workshop Auto-Subscribe

## 🔧 Project Description
**Steam Workshop Auto-Subscribe** is a browser extension that automates subscribing and unsubscribing to items in a Steam Workshop collection. It interacts directly with the Steam Workshop page and provides a simple popup interface for bulk actions.

---

## ✨ Features
- ✅ **Subscribe All:** Subscribe to all items in a collection with one click.
- ❌ **Unsubscribe All:** Unsubscribe from all items in a collection.
- 🧪 **Test Button:** Verifies that you're on a valid Steam Collection page.
- 🐞 **Debug Mode:** Limits actions to the first 10 items for safe testing.

---

## ⚙️ Requirements
- [Node.js + npm](https://nodejs.org/)
- TypeScript (`npx tsc`)
- A modern browser (Chrome, Firefox, Edge)

---

## 🚀 Installation & Build

1. **Clone the repository:**
   ```bash
   git clone https://github.com/flawlol/Steam-Workshop-Auto-Subscribe.git
   cd Steam-Workshop-Auto-Subscribe
   ```


## ▶️ Usage

1. Open a **Steam Workshop Collection page**, for example:  
   [https://steamcommunity.com/sharedfiles/filedetails/?id=1508144524](https://steamcommunity.com/sharedfiles/filedetails/?id=1508144524)

2. Click the **extension icon** in your browser toolbar.

3. In the popup window, click the **Test** button:
   - This verifies that you're on a valid Steam Collection page.
   - If successful, the action buttons will become available.

4. Use the available action buttons:
   - 🟢 `Subscribe All` – Subscribes to **every item** in the collection.
   - 🔴 `Unsubscribe All` – Unsubscribes from **every item** in the collection.

5. *(Optional)* Check the **Debug Mode** checkbox to limit actions to **only the first 10 items**, useful for testing.
