import React, { useState } from 'react'
import { Search, Filter, MessageCircle, Play, Clock } from 'lucide-react'
import { creatorEpisodes } from '../data/mockData'

export default function EpisodesList({ isDarkTheme, onSelectEpisode, onBack }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const textClass = isDarkTheme ? 'text-gray-100' : 'text-gray-900'
  const secondaryText = isDarkTheme ? 'text-gray-400' : 'text-gray-600'
  const bgClass = isDarkTheme ? 'bg-gray-900' : 'bg-white'
  const cardBg = isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'
  const borderClass = isDarkTheme ? 'border-gray-700' : 'border-gray-200'
  const inputBg = isDarkTheme ? 'bg-gray-700 text-white placeholder-gray-500' : 'bg-white text-gray-900 placeholder-gray-400'

  const filteredEpisodes = creatorEpisodes.filter(ep => {
    const matchesSearch = ep.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ep.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || ep.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', label: '✓ Published' }
      case 'draft':
        return { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', label: '✎ Draft' }
      case 'scheduled':
        return { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', label: '📅 Scheduled' }
      default:
        return { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-700 dark:text-gray-300', label: status }
    }
  }

  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className={`min-h-screen ${bgClass}`}>
      {/* Header */}
      <div className={`border-b ${borderClass} sticky top-0 z-10 backdrop-blur-lg`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={onBack}
            className={`mb-4 flex items-center gap-2 ${isDarkTheme ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
          >
            ← Back to Dashboard
          </button>
          <h1 className={`text-3xl font-bold ${textClass}`}>All Episodes</h1>
          <p className={`${secondaryText} mt-1`}>Manage and review all your published, draft, and scheduled episodes</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Filter Bar */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search size={20} className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${secondaryText}`} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search episodes by title or description..."
              className={`w-full pl-12 pr-4 py-3 rounded-lg outline-none transition-colors ${inputBg}`}
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 flex-wrap">
            {['all', 'published', 'draft', 'scheduled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filterStatus === status
                    ? 'bg-purple-500 text-white'
                    : `${cardBg} border ${borderClass} ${textClass} hover:border-purple-500`
                }`}
              >
                {status === 'all' && 'All Episodes'}
                {status === 'published' && '✓ Published'}
                {status === 'draft' && '✎ Drafts'}
                {status === 'scheduled' && '📅 Scheduled'}
              </button>
            ))}
          </div>
        </div>

        {/* Episodes Grid */}
        {filteredEpisodes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {filteredEpisodes.map((episode) => {
              const statusBadge = getStatusBadge(episode.status)
              return (
                <button
                  key={episode.id}
                  onClick={() => onSelectEpisode(episode.id)}
                  className={`${cardBg} border ${borderClass} rounded-xl p-6 transition-all hover:shadow-lg hover:border-purple-500 text-left`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                    {/* Thumbnail */}
                    <div className="text-5xl">{episode.thumbnail}</div>

                    {/* Episode Info */}
                    <div className="md:col-span-2">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="flex-1">
                          <h3 className={`text-lg font-bold ${textClass} line-clamp-2`}>
                            {episode.title}
                          </h3>
                          <p className={`text-sm ${secondaryText} line-clamp-2 mt-1`}>
                            {episode.description}
                          </p>
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className={`flex flex-wrap gap-3 text-sm ${secondaryText} mt-3`}>
                        {episode.duration && (
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {formatDuration(episode.duration)}
                          </span>
                        )}
                        <span>
                          {episode.publishedDate || episode.createdDate || episode.scheduledFor}
                        </span>
                      </div>
                    </div>

                    {/* Stats & Status */}
                    <div className="space-y-3">
                      {/* Status Badge */}
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusBadge.bg} ${statusBadge.text}`}>
                        {statusBadge.label}
                      </div>

                      {/* Episode Stats */}
                      {episode.analytics && (
                        <div className={`space-y-2 text-sm ${secondaryText}`}>
                          <div className="flex items-center gap-2">
                            <Play size={14} className="text-purple-500" />
                            <span className={`font-semibold ${textClass}`}>
                              {episode.analytics.plays?.toLocaleString()}
                            </span>
                            <span>plays</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MessageCircle size={14} className="text-blue-500" />
                            <span className={`font-semibold ${textClass}`}>
                              {episode.analytics.comments || 0}
                            </span>
                            <span>comments</span>
                          </div>
                        </div>
                      )}

                      {episode.progress && (
                        <div>
                          <p className="text-xs font-semibold mb-1">Upload Progress</p>
                          <div className={`w-full h-2 rounded-full ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <div
                              className="h-full bg-purple-500 rounded-full transition-all"
                              style={{ width: `${episode.progress}%` }}
                            />
                          </div>
                          <p className="text-xs mt-1">{episode.progress}%</p>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        ) : (
          <div className={`text-center py-16 ${secondaryText}`}>
            <div className="text-5xl mb-4">🔍</div>
            <p className={`text-lg ${textClass}`}>No episodes found</p>
            <p className="mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
