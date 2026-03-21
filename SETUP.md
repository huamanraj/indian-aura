# Indian Aura - Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret_here

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3. Create Admin User

Run the admin creation script:

```bash
node scripts/createAdmin.js
```

This will create an admin user with:
- Email: `admin@indianaura.com`
- Password: `admin123`

**⚠️ IMPORTANT: Change this password after first login!**

### 4. Start Backend Server

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start Frontend

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Admin Panel Setup

### 1. Install Dependencies

```bash
cd admin
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the `admin` directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Start Admin Panel

```bash
npm run dev
```

The admin panel will run on `http://localhost:3000` (different port from frontend)

## Admin Panel Usage

### Login

1. Navigate to `http://localhost:3000/login`
2. Use the credentials:
   - Email: `admin@indianaura.com`
   - Password: `admin123`

### Managing Products

#### Add Product
1. Click "Add Product" button
2. Fill in product details:
   - Name (required)
   - Description (required)
   - Price (required)
   - Category (required)
   - Tags (optional, comma-separated)
   - In Stock checkbox
3. Upload images (up to 5 images, 5MB each)
4. Click "Create"

#### Edit Product
1. Click the edit icon (pencil) next to a product
2. Modify the details
3. Add new images or remove existing ones
4. Click "Update"

#### Delete Product
1. Click the delete icon (trash) next to a product
2. Confirm deletion
3. Product and all its images will be deleted from Cloudinary

## Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get your credentials from the dashboard:
   - Cloud Name
   - API Key
   - API Secret
3. Add them to your backend `.env` file

## MongoDB Setup

### Option 1: MongoDB Atlas (Cloud)

1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string
4. Add it to your backend `.env` file

### Option 2: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/indian-aura`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register new user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/search?q=query` - Search products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

## Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify `.env` file exists and has correct values
- Check if port 5000 is available

### Admin can't login
- Make sure you ran the `createAdmin.js` script
- Check backend logs for errors
- Verify JWT_SECRET is set in `.env`

### Images won't upload
- Verify Cloudinary credentials in `.env`
- Check image file size (max 5MB)
- Check image format (must be image/*)

### Frontend search not working
- Make sure backend is running
- Check browser console for errors
- Verify API_URL in frontend if using custom backend URL

## Production Deployment

### Backend
1. Set environment variables on your hosting platform
2. Use a strong JWT_SECRET
3. Use MongoDB Atlas for database
4. Enable CORS for your frontend domain

### Frontend & Admin
1. Update `NEXT_PUBLIC_API_URL` to your production backend URL
2. Build: `npm run build`
3. Deploy to Vercel, Netlify, or your preferred platform

## Security Notes

- Change default admin password immediately after first login
- Use strong JWT_SECRET in production
- Enable HTTPS in production
- Restrict CORS to your frontend domain only
- Keep Cloudinary credentials secure
- Never commit `.env` files to version control
