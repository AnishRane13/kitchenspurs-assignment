# Restaurant Analytics Dashboard

A full-stack analytics dashboard for restaurant platforms built with Laravel (Backend) and React (Frontend).

## 🚀 Features

- **Restaurant Management**: View, search, sort, and filter restaurants
- **Order Analytics**: Daily order counts, revenue, and average order values
- **Peak Hour Analysis**: Identify busiest hours for each restaurant
- **Top Performers**: View top 3 restaurants by revenue
- **Advanced Filtering**: Filter orders by date, amount, and time ranges
- **Responsive Design**: Modern UI with interactive charts and tables

## 🛠️ Tech Stack

### Backend
- **Laravel 12** - PHP framework
- **JSON Data Storage** - Uses mock data files for restaurants and orders
- **RESTful API** - Clean API endpoints with proper validation
- **Caching** - Laravel cache for performance optimization
- **CORS Support** - Configured for frontend communication

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Beautiful and responsive charts
- **React Router** - Client-side routing
- **Axios** - HTTP client for API communication

## 📊 Data Structure

The application uses JSON files for data storage:

### Restaurants (`storage/app/data/restaurants.json`)
```json
[
  {
    "id": 101,
    "name": "Tandoori Treats",
    "location": "Bangalore",
    "cuisine": "North Indian"
  }
]
```

### Orders (`storage/app/data/orders.json`)
```json
[
  {
    "id": 1,
    "restaurant_id": 102,
    "order_amount": 996,
    "order_time": "2025-06-24T15:00:00"
  }
]
```

## 📋 Prerequisites

- **PHP 8.1+**
- **Composer**
- **Node.js 18+**
- **npm**

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

#### Windows
```bash
setup.bat
```

#### Unix/Linux/macOS
```bash
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd restaurant-analytics-backend-new

# Install dependencies
composer install

# Create .env file
cp .env.example .env
php artisan key:generate

# Create storage directories
mkdir -p storage/app/data
mkdir -p storage/framework/cache
mkdir -p storage/framework/sessions
mkdir -p storage/framework/views
mkdir -p storage/logs

# Set permissions (Unix/Linux/macOS)
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

#### Frontend Setup
```bash
cd restaurant-analytics-frontend

# Install dependencies
npm install
```

## 🎯 Running the Application

### 1. Start Backend
```bash
cd restaurant-analytics-backend-new
php artisan serve
```
Backend will be available at: http://localhost:8000

### 2. Start Frontend (New Terminal)
```bash
cd restaurant-analytics-frontend
npm run dev
```
Frontend will be available at: http://localhost:5173

## 🔌 API Endpoints

### Base URL: `http://localhost:8000/api/v1`

| Endpoint | Method | Description | Query Parameters |
|----------|--------|-------------|------------------|
| `/restaurants` | GET | List restaurants with search/sort/pagination | `search`, `sort_by`, `sort_order`, `page` |
| `/restaurants/{id}/order-trends` | GET | Order trends for specific restaurant | `start_date`, `end_date` |
| `/top-restaurants` | GET | Top 3 restaurants by revenue | `start_date`, `end_date` |
| `/filtered-orders` | GET | Filtered orders with pagination | `restaurant_id`, `start_date`, `end_date`, `min_amount`, `max_amount`, `start_hour`, `end_hour`, `page` |

### Example API Calls

#### Get Restaurants with Search
```bash
curl "http://localhost:8000/api/v1/restaurants?search=tandoori&sort_by=name&sort_order=asc&page=1"
```

#### Get Order Trends
```bash
curl "http://localhost:8000/api/v1/restaurants/101/order-trends?start_date=2025-06-22&end_date=2025-06-28"
```

#### Get Top Restaurants
```bash
curl "http://localhost:8000/api/v1/top-restaurants?start_date=2025-06-22&end_date=2025-06-28"
```

## 📈 Dashboard Features

### 1. Restaurant List
- Search by name, location, or cuisine
- Sort by any field (ascending/descending)
- Pagination for large datasets

### 2. Order Trends Analysis
- **Daily Orders Count**: Line chart showing order volume over time
- **Daily Revenue**: Bar chart displaying revenue trends
- **Average Order Value**: Line chart for AOV analysis
- **Peak Order Hour**: Bar chart showing busiest hours per day

### 3. Top Restaurants
- Bar chart of top 3 restaurants by revenue
- Date range selection
- Revenue and order count metrics

### 4. Advanced Filtering
- Restaurant selection
- Date range picker
- Amount range filters
- Hour range filters
- Paginated results

## 🎨 UI Components

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Interactive Charts**: Recharts library for data visualization
- **Modern Styling**: Tailwind CSS for clean, professional appearance
- **Loading States**: Proper loading indicators and error handling
- **Navigation**: Intuitive routing between dashboard and restaurant details

## 🔧 Configuration

### Backend Configuration
- **CORS**: Configured for frontend communication
- **Caching**: 5-minute cache for API responses
- **Validation**: Input validation for all API endpoints
- **Error Handling**: Proper error responses and logging

### Frontend Configuration
- **API Base URL**: Configurable in components
- **Chart Options**: Customizable chart configurations
- **Responsive Breakpoints**: Mobile-first design approach

## 📱 Responsive Design

The dashboard is fully responsive with:
- **Mobile**: Single-column layout, touch-friendly controls
- **Tablet**: Optimized for medium screens
- **Desktop**: Full-width layout with side-by-side charts

## 🚀 Performance Features

- **Caching**: API responses cached for 5 minutes
- **Pagination**: Efficient data loading for large datasets
- **Lazy Loading**: Charts and data loaded on demand
- **Optimized Queries**: Efficient data filtering and aggregation

## 🧪 Testing

### Backend Testing
```bash
cd restaurant-analytics-backend-new
php artisan test
```

### Frontend Testing
```bash
cd restaurant-analytics-frontend
npm test
```

## 📦 Deployment

### Local Development
- Use the provided setup scripts
- Ensure all prerequisites are installed
- Follow the quick start guide

### Production Deployment
1. **Backend**: Deploy to Laravel Forge, Heroku, or VPS
2. **Frontend**: Build and deploy to Vercel, Netlify, or static hosting
3. **Data**: Replace JSON files with production data sources
4. **Environment**: Configure production environment variables

## 🔍 Troubleshooting

### Common Issues

#### Backend Won't Start
- Check PHP version (8.1+ required)
- Ensure Composer dependencies are installed
- Verify .env file exists and is configured

#### Frontend Build Errors
- Check Node.js version (18+ required)
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall

#### API Connection Issues
- Verify backend is running on port 8000
- Check CORS configuration
- Ensure frontend is using correct API URL

#### Data Not Loading
- Verify JSON files exist in `storage/app/data/`
- Check file permissions
- Validate JSON syntax

### Performance Tips
- Use appropriate date ranges for queries
- Implement client-side caching for frequently accessed data
- Consider pagination for large datasets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For questions or issues:
- Check the troubleshooting section
- Review the API documentation
- Open an issue on GitHub

---

**Built with ❤️ using Laravel and React**
