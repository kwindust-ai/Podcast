import React, { useState } from 'react'
import { LayoutDashboard, Moon, Sun, LogOut } from 'lucide-react'
import CreatorDashboard from './components/CreatorDashboard'
import EpisodeUpload from './components/EpisodeUpload'
import Analytics from './components/Analytics'
import LiveStream from './components/LiveStream'
import EpisodeUpdates from './components/EpisodeUpdates'

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  const bgClass = isDarkTheme ? 'bg-gray-900' : 'bg-white'
  const textClass = isDarkTheme ? 'text-gray-100' : 'text-gray-900'
  const navBg = isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
  const navTextSecondary = isDarkTheme ? 'text-gray-400' : 'text-gray-600'

  const handleNavigate = (view) => {
    setCurrentView(view)
  }

  const handleBack = () => {
    setCurrentView('dashboard')
  }

  return (
    <div className={`${bgClass} min-h-screen transition-colors duration-300`}>
      {/* Top Navigation */}
      <nav className={`border-b ${navBg} sticky top-0 z-20 backdrop-blur-lg`}>
        <div className="max-w-full px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎙️</div>
            <div>
              <h1 className={`text-xl font-bold ${textClass}`}>Sona Creator Studio</h1>
              <p className={`text-xs ${navTextSecondary}`}>Podcast Management Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* View Indicator */}
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
              isDarkTheme ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              {currentView === 'dashboard' && '📊 Dashboard'}
              {currentView === 'upload' && '📤 Upload'}
              {currentView === 'analytics' && '📈 Analytics'}
              {currentView === 'live' && '🔴 Live'}
              {currentView === 'updates' && '✏️ Updates'}
            </span>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkTheme(!isDarkTheme)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkTheme ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {isDarkTheme ? <Sun size={20} className="text-gray-400" /> : <Moon size={20} className="text-gray-600" />}
            </button>

            {/* Logout */}
            <button className={`p-2 rounded-lg transition-colors ${
              isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}>
              <LogOut size={20} className={isDarkTheme ? 'text-gray-400' : 'text-gray-600'} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="transition-all duration-300">
        {currentView === 'dashboard' && (
          <CreatorDashboard isDarkTheme={isDarkTheme} onNavigate={handleNavigate} />
        )}

        {currentView === 'upload' && (
          <EpisodeUpload isDarkTheme={isDarkTheme} onBack={handleBack} />
        )}

        {currentView === 'analytics' && (
          <Analytics isDarkTheme={isDarkTheme} onBack={handleBack} />
        )}

        {currentView === 'live' && (
          <LiveStream isDarkTheme={isDarkTheme} onBack={handleBack} />
        )}

        {currentView === 'updates' && (
          <EpisodeUpdates isDarkTheme={isDarkTheme} onBack={handleBack} />
        )}
      </div>
    </div>
  )
}
