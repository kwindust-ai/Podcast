import React, { useState } from 'react'
import { LayoutDashboard, Moon, Sun, LogOut } from 'lucide-react'
import CreatorDashboard from './components/CreatorDashboard'
import EpisodeUpload from './components/EpisodeUpload'
import Analytics from './components/Analytics'
import EpisodeAnalytics from './components/EpisodeAnalytics'
import LiveStream from './components/LiveStream'
import EpisodeUpdates from './components/EpisodeUpdates'
import EpisodesList from './components/EpisodesList'
import EpisodeDetail from './components/EpisodeDetail'
import EpisodePlayer from './components/EpisodePlayer'

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(null)

  // Vibrant color scheme
  const bgClass = isDarkTheme 
    ? 'bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950' 
    : 'bg-gradient-to-br from-white via-purple-50 to-pink-50'
  const textClass = isDarkTheme ? 'text-white' : 'text-slate-900'
  const navBg = isDarkTheme ? 'bg-slate-950/50 backdrop-blur-xl border-purple-500/20' : 'bg-white/80 backdrop-blur-xl border-purple-200/50'
  const navTextSecondary = isDarkTheme ? 'text-purple-200' : 'text-purple-600'

  const handleNavigate = (view) => {
    setCurrentView(view)
  }

  const handleSelectEpisode = (episodeId) => {
    setSelectedEpisodeId(episodeId)
    setCurrentView('episode-player')
  }

  const handleViewAnalytics = (episodeId) => {
    setSelectedEpisodeId(episodeId)
    setCurrentView('episode-analytics')
  }

  const handleBack = () => {
    setCurrentView('dashboard')
  }

  return (
    <div className={`${bgClass} min-h-screen transition-colors duration-300`}>
      {/* Top Navigation */}
      <nav className={`border-b ${navBg} sticky top-0 z-20`}>
        <div className="max-w-full px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-4xl bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 p-2 rounded-xl">🎙️</div>
            <div>
              <h1 className={`text-2xl font-bold tracking-tight ${textClass}`}>Sona</h1>
              <p className={`text-xs font-medium ${navTextSecondary}`}>Creator Studio</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* View Indicator */}
            <span className={`text-xs font-semibold px-4 py-2 rounded-full transition-all ${
              isDarkTheme ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
            }`}>
              {currentView === 'dashboard' && '📊 Dashboard'}
              {currentView === 'episodes' && '📺 Episodes'}
              {currentView === 'episode-detail' && '📖 Details'}
              {currentView === 'episode-player' && '▶️ Playing'}
              {currentView === 'episode-analytics' && '📈 Analytics'}
              {currentView === 'upload' && '📤 Upload'}
              {currentView === 'analytics' && '📈 Analytics'}
              {currentView === 'live' && '🔴 Live'}
              {currentView === 'updates' && '✏️ Updates'}
            </span>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkTheme(!isDarkTheme)}
              className={`p-2 rounded-lg transition-all hover:scale-110 ${
                isDarkTheme ? 'bg-slate-800 hover:bg-slate-700 text-slate-400' : 'bg-slate-200 hover:bg-slate-300 text-slate-600'
              }`}
            >
              {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Logout */}
            <button className={`p-2 rounded-lg transition-all hover:scale-110 ${
              isDarkTheme ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-200 text-slate-600'
            }`}>
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="transition-all duration-300">
        {currentView === 'dashboard' && (
          <CreatorDashboard isDarkTheme={isDarkTheme} onNavigate={handleNavigate} onSelectEpisode={handleSelectEpisode} />
        )}

        {currentView === 'episodes' && (
          <EpisodesList isDarkTheme={isDarkTheme} onSelectEpisode={handleSelectEpisode} onBack={handleBack} />
        )}

        {currentView === 'episode-detail' && (
          <EpisodeDetail 
            isDarkTheme={isDarkTheme} 
            episodeId={selectedEpisodeId} 
            onBack={() => setCurrentView('episodes')}
            onOpenPlayer={(episodeId) => {
              setSelectedEpisodeId(episodeId)
              setCurrentView('episode-player')
            }}
          />
        )}

        {currentView === 'episode-player' && (
          <EpisodePlayer 
            isDarkTheme={isDarkTheme} 
            episodeId={selectedEpisodeId} 
            onBack={() => setCurrentView('episodes')}
            onViewAnalytics={handleViewAnalytics}
          />
        )}

        {currentView === 'episode-analytics' && (
          <EpisodeAnalytics
            isDarkTheme={isDarkTheme}
            episodeId={selectedEpisodeId}
            onBack={() => setCurrentView('episode-player')}
          />
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
