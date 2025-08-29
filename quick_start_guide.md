# 🚀 Quick Start Guide - Restaurant Analytics Dashboard

Get your restaurant analytics dashboard up and running in minutes!

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **PHP 8.1+** - [Download PHP](https://www.php.net/downloads)
- **Composer** - [Download Composer](https://getcomposer.org/download/)
- **Node.js 18+** - [Download Node.js](https://nodejs.org/)
- **npm** - Comes with Node.js

## 🎯 One-Command Setup (Recommended)

### Windows Users
```bash
setup.bat
```

### Unix/Linux/macOS Users
```bash
chmod +x setup.sh
./setup.sh
```

The setup script will:
- ✅ Check all prerequisites
- ✅ Install backend dependencies
- ✅ Configure Laravel environment
- ✅ Create necessary storage directories
- ✅ Install frontend dependencies
- ✅ Provide startup instructions

## 🔧 Manual Setup

If you prefer to set up manually or encounter issues with the automated script:

### 1. Backend Setup
```bash
cd restaurant-analytics-backend-new

# Install PHP dependencies
composer install

# Create environment file
cp .env.example .env
php artisan key:generate

# Create storage directories
mkdir -p storage/app/data
mkdir -p storage/framework/cache
mkdir -p storage/framework/sessions
mkdir -p storage/framework/views
mkdir -p storage/logs

# Set permissions (Unix/Linux/macOS only)
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

### 2. Frontend Setup
```bash
cd restaurant-analytics-frontend

# Install Node.js dependencies
npm install
```

## 🚀 Start the Application

### Step 1: Start Backend
```bash
cd restaurant-analytics-backend-new
php artisan serve
```

**Backend will be running at:** http://localhost:8000

### Step 2: Start Frontend (New Terminal)
```bash
cd restaurant-analytics-frontend
npm run dev
```

**Frontend will be running at:** http://localhost:5173

## 🧪 Test Your Setup

### 1. Check Backend Health
Visit: http://localhost:8000/api/v1/restaurants

You should see a JSON response with restaurant data.

### 2. Check Frontend
Visit: http://localhost:5173

You should see the dashboard with:
- Top restaurants chart
- Restaurant list with search/sort
- Navigation header

## 📊 Sample Data

The application comes with sample data:

- **4 Restaurants** with different cuisines and locations
- **200 Orders** over 7 days (June 22-28, 2025)
- **Realistic Data** for testing all features

### Data Files Location
- Restaurants: `restaurant-analytics-backend-new/storage/app/data/restaurants.json`
- Orders: `restaurant-analytics-backend-new/storage/app/data/orders.json`

## 🔌 API Testing Examples

### Test Restaurant List
```bash
curl "http://localhost:8000/api/v1/restaurants"
```

### Test Search
```bash
curl "http://localhost:8000/api/v1/restaurants?search=tandoori"
```

### Test Order Trends
```bash
curl "http://localhost:8000/api/v1/restaurants/101/order-trends?start_date=2025-06-22&end_date=2025-06-28"
```

### Test Top Restaurants
```bash
curl "http://localhost:8000/api/v1/top-restaurants?start_date=2025-06-22&end_date=2025-06-28"
```

## 🎨 Dashboard Features to Test

### 1. **Restaurant List**
- Search for "tandoori", "mumbai", "italian"
- Sort by name, location, cuisine
- Navigate through pages

### 2. **Restaurant Details**
- Click on any restaurant name
- View order trends charts
- Apply date range filters
- Use amount and hour filters

### 3. **Top Restaurants**
- Change date range in the top chart
- Observe how rankings change
- Hover over bars for details

### 4. **Responsive Design**
- Resize browser window
- Test on mobile/tablet view
- Check chart responsiveness

## 🔍 Troubleshooting

### Common Issues & Solutions

#### ❌ Backend Won't Start
**Problem:** `php artisan serve` fails
**Solutions:**
- Check PHP version: `php --version`
- Verify .env file exists
- Check storage permissions
- Run: `composer install`

#### ❌ Frontend Build Errors
**Problem:** `npm run dev` fails
**Solutions:**
- Check Node.js version: `node --version`
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

#### ❌ API Connection Issues
**Problem:** Frontend can't connect to backend
**Solutions:**
- Verify backend is running on port 8000
- Check CORS configuration in `config/cors.php`
- Ensure frontend uses correct API URL

#### ❌ Data Not Loading
**Problem:** Charts and tables are empty
**Solutions:**
- Verify JSON files exist in `storage/app/data/`
- Check file permissions
- Validate JSON syntax
- Check browser console for errors

#### ❌ Charts Not Rendering
**Problem:** Charts show loading or errors
**Solutions:**
- Check if data is being fetched (Network tab)
- Verify Recharts library is loaded
- Check for JavaScript errors in console

### Performance Tips

- **Date Ranges**: Use smaller date ranges for faster loading
- **Caching**: API responses are cached for 5 minutes
- **Pagination**: Large datasets are paginated for better performance

## 📱 Mobile Testing

### Test Responsive Design
1. Open browser dev tools
2. Toggle device toolbar
3. Test different screen sizes:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1024px+)

### Mobile-Specific Features
- Touch-friendly controls
- Single-column layout
- Optimized chart sizes
- Swipe-friendly navigation

## 🎯 Next Steps

Once your dashboard is running:

1. **Explore Features**: Try all the filtering and sorting options
2. **Customize Data**: Modify the JSON files to add your own restaurants/orders
3. **Extend Functionality**: Add new charts or metrics
4. **Deploy**: Follow the deployment guide in the main README

## 📞 Need Help?

If you encounter issues:

1. **Check this guide** for common solutions
2. **Review the main README** for detailed documentation
3. **Check browser console** for JavaScript errors
4. **Verify API responses** using the test endpoints above

---

**🎉 You're all set! Your restaurant analytics dashboard should now be running successfully.**

