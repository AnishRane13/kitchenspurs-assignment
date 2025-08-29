import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import RestaurantDetails from './components/RestaurantDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen w-full">
        {/* Elegant Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50 shadow-sm w-full">
          <div className="w-full px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Modern Logo */}
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                
                {/* Brand */}
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    Restaurant Analytics
                  </h1>
                  <p className="text-sm text-slate-600 font-medium">
                    Smart insights for smarter decisions
                  </p>
                </div>
              </div>
              
              {/* Clean Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <a href="/" className="text-slate-600 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105">
                  Dashboard
                </a>
                <a href="/analytics" className="text-slate-600 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105">
                  Analytics
                </a>
                <a href="/reports" className="text-slate-600 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105">
                  Reports
                </a>
              </nav>
            </div>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="w-full px-6 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          </Routes>
        </main>
        
        {/* Minimal Footer */}
        <footer className="mt-16 py-8 border-t border-slate-200/60 bg-white/60 backdrop-blur-sm w-full">
          <div className="w-full px-6 text-center">
            <p className="text-slate-500 text-sm font-medium">
              © 2024 Restaurant Analytics. Built with React & Tailwind CSS.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;