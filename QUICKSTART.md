# Quick Start Guide

Get the Restaurant Analytics Dashboard running in 5 minutes! 🚀

## Prerequisites Check

Make sure you have these installed:
- ✅ PHP 8.2+ (`php --version`)
- ✅ Composer (`composer --version`)
- ✅ Node.js 18+ (`node --version`)
- ✅ npm (`npm --version`)

## One-Command Setup

### Windows
```cmd
setup.bat
```

### Mac/Linux
```bash
chmod +x setup.sh
./setup.sh
```

## Manual Setup (if scripts don't work)

### 1. Backend Setup
```bash
cd restaurant-analytics-backend-new

# Install dependencies
composer install

# Setup environment
cp .env.example .env
php artisan key:generate

# Configure SQLite
echo "DB_CONNECTION=sqlite" >> .env
echo "DB_DATABASE=$(pwd)/database/database.sqlite" >> .env

# Create database and run migrations
touch database/database.sqlite
php artisan migrate
php artisan db:seed
```

### 2. Frontend Setup
```bash
cd restaurant-analytics-frontend

# Install dependencies
npm install
```

## Start the Application

### Terminal 1 - Backend
```bash
cd restaurant-analytics-backend-new
php artisan serve
```
Backend will run at: http://localhost:8000

### Terminal 2 - Frontend
```bash
cd restaurant-analytics-frontend
npm run dev
```
Frontend will run at: http://localhost:5173

## Test the Application

1. **Open** http://localhost:5173 in your browser
2. **View** the dashboard with top 3 restaurants chart
3. **Search** and **sort** restaurants in the table
4. **Click** "View Analytics" on any restaurant
5. **Explore** the 4 analytics charts:
   - Daily Orders Count
   - Daily Revenue
   - Average Order Value
   - Peak Order Hour
6. **Apply filters** to analyze specific data

## Sample Data

The app comes with:
- **4 Restaurants**: Tandoori Treats, Sushi Bay, Pasta Palace, Burger Hub
- **200 Orders**: Realistic data from June 22-28, 2025
- **Amounts**: ₹200 - ₹1000 range

## API Testing

Test the backend directly:
```bash
# Get all restaurants
curl http://localhost:8000/api/v1/restaurants

# Get top restaurants
curl "http://localhost:8000/api/v1/top-restaurants?start_date=2025-06-22&end_date=2025-06-28"

# Get order trends for restaurant 101
curl "http://localhost:8000/api/v1/restaurants/101/order-trends?start_date=2025-06-22&end_date=2025-06-28"
```

## Troubleshooting

### Common Issues

1. **Port 8000 already in use**
   ```bash
   php artisan serve --port=8001
   # Then update API_BASE_URL in frontend components
   ```

2. **Port 5173 already in use**
   ```bash
   npm run dev -- --port 3000
   ```

3. **Database errors**
   ```bash
   php artisan migrate:fresh --seed
   ```

4. **CORS errors**
   - Ensure backend is running on port 8000
   - Check CORS configuration in `config/cors.php`

### Still having issues?

1. Check the full README.md for detailed instructions
2. Verify all prerequisites are installed
3. Try clearing caches: `php artisan cache:clear`
4. Check Laravel logs: `storage/logs/laravel.log`

## Next Steps

- **Customize** the dashboard for your needs
- **Add** more analytics and charts
- **Implement** user authentication
- **Deploy** to production server

---

**Need help?** Contact: anishrane178@gmail.com

Happy coding! 🎉
