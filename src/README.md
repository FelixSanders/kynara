# Kynara

A modern e-commerce shopping app specializing in colorful tie-dye bedding products including pillow cases, body pillow covers, and bed sheet sets.

## 🚀 Live Demo

Once deployed, visit: **https://FelixSandeersHere.github.io/kynara/**

## ✨ Features

- 🛍️ **Product Browsing** - Browse beautiful tie-dye bedding products
- 🛒 **Shopping Cart** - Add items to cart with quantity management
- 👤 **User Authentication** - Login/Signup with form validation
- 📦 **Order Tracking** - View order history with delivery status updates
- 💳 **Multiple Payment Options** - BCA Transfer, GoPay, OVO, Dana, ShopeePay
- 💰 **Indonesian Rupiah** - All prices displayed in Rp
- 📱 **Responsive Design** - Works seamlessly on mobile and desktop
- 🔔 **Toast Notifications** - User-friendly feedback messages
- 💾 **Local Storage** - Cart and user data persistence

## 🛠️ Technology Stack

- **React** - UI framework
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Styling
- **Vite** - Build tool & dev server
- **Shadcn/ui** - UI components
- **Lucide React** - Icons
- **Sonner** - Toast notifications

## 📦 Deployment

This app is configured to deploy automatically to GitHub Pages.

### Quick Deployment Steps:

1. **Push code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Kynara shopping app"
   git remote add origin https://github.com/FelixSandeersHere/kynara.git
   git branch -M main
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Set Source to "GitHub Actions"

3. **Your site will be live at:**
   - https://FelixSandeersHere.github.io/kynara/

For detailed instructions, see [DEPLOY_STEPS.md](./DEPLOY_STEPS.md)

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Notes

- This is a demo app using localStorage for data persistence
- Not suitable for production use with real payments or sensitive data
- All user data is stored locally in the browser
- Currency conversion uses approximate rates (1 USD ≈ 15,000 IDR)

## 📄 License

This project is for demonstration purposes.

---

Made with ❤️ using React + Vite
