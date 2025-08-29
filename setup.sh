#!/bin/bash

echo "🚀 Setting up Restaurant Analytics Dashboard..."

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v php &> /dev/null; then
    echo "❌ PHP is not installed. Please install PHP 8.1+ first."
    exit 1
fi

if ! command -v composer &> /dev/null; then
    echo "❌ Composer is not installed. Please install Composer first."
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ All prerequisites are installed!"

# Backend Setup
echo "🔧 Setting up Laravel Backend..."
cd restaurant-analytics-backend-new

# Install dependencies
echo "📦 Installing PHP dependencies..."
composer install --no-interaction

# Create .env file
if [ ! -f .env ]; then
    echo "⚙️ Creating .env file..."
    cp .env.example .env
    php artisan key:generate
fi

# Create storage directories
echo "📁 Creating storage directories..."
mkdir -p storage/app/data
mkdir -p storage/framework/cache
mkdir -p storage/framework/sessions
mkdir -p storage/framework/views
mkdir -p storage/logs

# Set permissions
chmod -R 775 storage
chmod -R 775 bootstrap/cache

echo "✅ Backend setup complete!"

# Frontend Setup
echo "🎨 Setting up React Frontend..."
cd ../restaurant-analytics-frontend

# Install dependencies
echo "📦 Installing Node.js dependencies..."
npm install

echo "✅ Frontend setup complete!"

echo ""
echo "🎉 Setup complete! To start the application:"
echo ""
echo "1. Start the backend:"
echo "   cd restaurant-analytics-backend-new"
echo "   php artisan serve"
echo ""
echo "2. Start the frontend (in a new terminal):"
echo "   cd restaurant-analytics-frontend"
echo "   npm run dev"
echo ""
echo "3. Open http://localhost:5173 in your browser"
echo ""
echo "📊 The application will use JSON data files for restaurants and orders."
