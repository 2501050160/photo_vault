
# PhotoVault Secure Access Guide (v4.5)

## 📁 Standardized Image Protocol
To ensure the cinematic UI renders correctly, follow these file placements:

1.  **User Portraits**:
    - Place in `./PICS/[id].jpg`
    - Newest users: `./PICS/bharath.jpg` and `./PICS/naresh.jpg`
2.  **Footer Background**:
    - Rename your group photo to `footer_bg.jpg`
    - Place in `./PICS/footer_bg.jpg`
    - *The system automatically applies grayscale and depth-blur to this image for aesthetics.*

## 🔐 Authentication
-   **PIN Access**: No username required. Select a profile and enter the unique PIN.
-   **Admin Access**: The `admin` account (PIN: `0000`) has root visibility over the registry structure.

## 🛠️ Modifying the Vault
Open `constants.ts` to:
- Update **Drive Links** when you upload new photos.
- Change **PINs** for specific users.
- Update **Taglines** (the text that appears under the name in the directory).

---
*Authorized Personnel Only. Version 4.5.0-STABLE*
