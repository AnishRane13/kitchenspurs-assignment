import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import RestaurantDetails from './components/RestaurantDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
        {/* Modern Header with Gradient */}
        <header className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute top-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            </div>
          </div>
          
          {/* Header Content */}
          <div className="relative z-10 px-6 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Logo Icon */}
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  
                  {/* Title */}
                  <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                      Restaurant Analytics
                    </h1>
                    <p className="text-blue-100 text-sm mt-1">
                      Data-driven insights for your restaurant business
                    </p>
                  </div>
                </div>
                
                {/* Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                  <a href="/" className="text-white/80 hover:text-white transition-colors duration-200 font-medium">
                    Dashboard
                  </a>
                  <a href="/analytics" className="text-white/80 hover:text-white transition-colors duration-200 font-medium">
                    Analytics
                  </a>
                  <a href="/reports" className="text-white/80 hover:text-white transition-colors duration-200 font-medium">
                    Reports
                  </a>
                </nav>
              </div>
            </div>
          </div>
          
          {/* Decorative Bottom Wave */}
          <div className="absolute bottom-0 left-0 w-full">
            <svg className="w-full h-8 text-slate-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
              <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-28,127.61-28,47.13,0,89.12,11.6,130.5,26.47C571.77,111.81,639.83,108.18,707,96.58,780.47,83.81,852.34,76.1,923,69.32c72.26-7.25,144.54-12.76,216.82-15.42,69.54-2.57,138.54,1.93,206.84,12.81s136.52,28.65,203.72,46.33V0Z" opacity=".5" fill="currentColor"></path>
              <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
            </svg>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="relative z-10 mt-16 py-8 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-gray-600 text-sm">
              © 2024 Restaurant Analytics Dashboard. Built with React & Tailwind CSS.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
