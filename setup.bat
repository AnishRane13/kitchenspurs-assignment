@echo off
echo 🚀 Setting up Restaurant Analytics Dashboard...

REM Check prerequisites
echo 📋 Checking prerequisites...

php --version >nul 2>&1
if errorlevel 1 (
    echo ❌ PHP is not installed. Please install PHP 8.1+ first.
    pause
    exit /b 1
)

composer --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Composer is not installed. Please install Composer first.
    pause
    exit /b 1
)

node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ All prerequisites are installed!

REM Backend Setup
echo 🔧 Setting up Laravel Backend...
cd restaurant-analytics-backend-new

REM Install dependencies
echo 📦 Installing PHP dependencies...
composer install --no-interaction

REM Create .env file
if not exist .env (
    echo ⚙️ Creating .env file...
    copy .env.example .env
    php artisan key:generate
)

REM Create storage directories
echo 📁 Creating storage directories...
if not exist storage\app\data mkdir storage\app\data
if not exist storage\framework\cache mkdir storage\framework\cache
if not exist storage\framework\sessions mkdir storage\framework\sessions
if not exist storage\framework\views mkdir storage\framework\views
if not exist storage\logs mkdir storage\logs

echo ✅ Backend setup complete!

REM Frontend Setup
echo 🎨 Setting up React Frontend...
cd ..\restaurant-analytics-frontend

REM Install dependencies
echo 📦 Installing Node.js dependencies...
npm install

echo ✅ Frontend setup complete!

echo.
echo 🎉 Setup complete! To start the application:
echo.
echo 1. Start the backend:
echo    cd restaurant-analytics-backend-new
echo    php artisan serve
echo.
echo 2. Start the frontend (in a new terminal):
echo    cd restaurant-analytics-frontend
echo    npm run dev
echo.
echo 3. Open http://localhost:5173 in your browser
echo.
echo 📊 The application will use JSON data files for restaurants and orders.
pause
