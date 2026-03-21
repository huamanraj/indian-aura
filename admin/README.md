# Indian Aura Admin Panel

A modern, responsive admin panel for managing your Indian Aura e-commerce store.

## Features

### 🔐 Authentication
- Secure login system
- Demo credentials for testing
- Session management

### 📦 Product Management
- **Add Products**: Create new product listings with up to 4 images
- **Edit Products**: Update existing product information
- **Delete Products**: Remove products with confirmation
- **View Products**: Grid view with search and category filters

### 🖼️ Image Upload
- **Drag & Drop**: Easy image upload interface
- **1-4 Images**: Enforced limit with validation
- **Image Preview**: Grid layout showing uploaded images
- **Remove Images**: Click to remove unwanted images
- **Validation**: Error messages for invalid uploads

### ⚙️ Settings
- Update WhatsApp contact number
- Configure store contact information

### 🎨 Design System
- **Same Theme**: Matches the main Indian Aura website
- **Colors**: Orange (#E76F2E), Gold (#D4AF37), Burgundy (#8B1E3F)
- **Typography**: DM Sans font family
- **Rounded UI**: Modern rounded corners (rounded-2xl)
- **Soft Shadows**: Subtle shadows for depth
- **Smooth Animations**: 300ms transitions
- **Hover Effects**: Scale and glow effects
- **Fully Responsive**: Works on mobile, tablet, and desktop

## Pages

1. **Login** (`/login`)
   - Email: `admin@indianaura.com`
   - Password: `admin123`

2. **Dashboard** (`/admin`)
   - Overview statistics
   - Quick action cards
   - Getting started guide

3. **Products List** (`/admin/products`)
   - Product grid with thumbnails
   - Search functionality
   - Category filters
   - Edit/Delete actions

4. **Add Product** (`/admin/products/new`)
   - Multi-field form
   - Drag & drop image upload
   - Real-time validation

5. **Edit Product** (`/admin/products/[id]`)
   - Pre-filled form
   - Existing images display
   - Add/remove images

6. **Settings** (`/admin/settings`)
   - WhatsApp number configuration

## Tech Stack

- **Next.js 15** (App Router + SSR)
- **TypeScript**
- **Tailwind CSS**
- **LocalStorage** (temporary storage)

## Installation & Running

```bash
# Navigate to admin directory
cd admin

# Install dependencies (if needed)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Data Storage

Currently using **localStorage** for temporary data storage:
- Products are stored in `indian_aura_products`
- Settings stored in `indian_aura_settings`
- Authentication token stored in `indian_aura_admin_auth`

**Note**: In production, replace localStorage with a proper backend API.

## Product Schema

```typescript
{
  uuid: string;           // Auto-generated unique ID
  slug: string;           // Auto-generated URL-friendly name
  name: string;           // Product name
  price: number;          // Price in INR
  description: string;    // Product description
  category: string;       // Product category
  relatedProducts: string[]; // Related product UUIDs
  images: string[];       // Base64 encoded images (1-4)
  createdAt?: string;      // Creation timestamp
  updatedAt?: string;      // Update timestamp
}
```

## Categories

- Diyas
- Puja Thalis
- Toran
- Incense Holders
- Decorative Items
- Gift Sets
- Other

## Animations & Effects

- **Page Load**: Fade-in animation
- **Hover Effects**: Scale 1.05 with glow
- **Buttons**: Gradient backgrounds with hover scale
- **Images**: Zoom on hover
- **Transitions**: 300ms smooth transitions
- **Toasts**: Slide-in notifications

## Responsive Breakpoints

- **Mobile**: Single column layout, 2-image grid
- **Tablet**: Balanced spacing
- **Desktop**: 2-column forms, 4-image grid

## Future Enhancements

- [ ] Backend API integration
- [ ] User authentication system
- [ ] Order management
- [ ] Analytics dashboard
- [ ] Image upload to cloud storage
- [ ] Email notifications
- [ ] Multi-language support
