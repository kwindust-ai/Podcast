import React, { useState } from 'react'
import { ArrowLeft, MessageCircle, Clock, Send, ThumbsUp, Zap, Play } from 'lucide-react'
import { creatorEpisodes, episodeListenerComments, episodeTimestampedUpdates } from '../data/mockData'

export default function EpisodeDetail({ isDarkTheme, episodeId, onBack, onOpenPlayer }) {
  const [newUpdate, setNewUpdate] = useState('')
  const [updateTimestamp, setUpdateTimestamp] = useState('00:00')
  const [newComment, setNewComment] = useState('')
  const [updates, setUpdates] = useState(episodeTimestampedUpdates[episodeId] || [])
  const [selectedTab, setSelectedTab] = useState('updates')

  const episode = creatorEpisodes.find(ep => ep.id === episodeId)
  const comments = episodeListenerComments[episodeId] || []

  if (!episode) {
    return (
      <div className={`min-h-screen ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`}>
        <div className={`text-center py-12 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
          Episode not found
        </div>
      </div>
    )
  }

  const textClass = isDarkTheme ? 'text-gray-100' : 'text-gray-900'
  const secondaryText = isDarkTheme ? 'text-gray-400' : 'text-gray-600'
  const bgClass = isDarkTheme ? 'bg-gray-900' : 'bg-white'
  const cardBg = isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'
  const borderClass = isDarkTheme ? 'border-gray-700' : 'border-gray-200'
  const inputBg = isDarkTheme ? 'bg-gray-700 text-white placeholder-gray-500' : 'bg-white text-gray-900 placeholder-gray-400'

  const handlePostUpdate = () => {
    if (newUpdate.trim()) {
      const newUpdateObj = {
        id: updates.length + 1,
        timestamp: updateTimestamp,
        title: `Update at ${updateTimestamp}`,
        content: newUpdate,
        postedAt: new Date().toLocaleString(),
        type: 'creator'
      }
      setUpdates([...updates, newUpdateObj])
      setNewUpdate('')
      setUpdateTimestamp('00:00')
    }
  }

  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'breaking':
        return 'border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20'
      case 'major':
        return 'border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20'
      case 'update':
        return 'border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20'
      case 'creator':
        return 'border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20'
      default:
        return 'border-l-4 border-gray-500'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'breaking':
        return '⚡'
      case 'major':
        return '🚨'
      case 'update':
        return '📢'
      case 'creator':
        return '✍️'
      default:
        return '📝'
    }
  }

  return (
    <div className={`min-h-screen ${bgClass}`}>
      {/* Header */}
      <div className={`border-b ${borderClass} sticky top-0 z-10 backdrop-blur-lg`}>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 ${isDarkTheme ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'} mb-4 transition-colors`}
          >
            <ArrowLeft size={20} />
            Back to Episodes
          </button>
          <div className="flex items-start gap-4">
            <div className="text-4xl">{episode.thumbnail}</div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className={`text-3xl font-bold ${textClass}`}>{episode.title}</h1>
                  <p className={`${secondaryText} mt-2`}>{episode.description}</p>
                  <div className={`flex gap-4 mt-3 text-sm ${secondaryText}`}>
                    <span>📅 {episode.publishedDate || episode.createdDate}</span>
                    <span>⏱️ {formatDuration(episode.duration)}</span>
                    <span>📊 {episode.analytics?.plays?.toLocaleString() || '0'} plays</span>
                  </div>
                </div>
                {onOpenPlayer && (
                  <button
                    onClick={() => onOpenPlayer(episode.id)}
                    className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-semibold whitespace-nowrap"
                  >
                    <Play size={20} />
                    Play Episode
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Updates & Comments */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-gray-300 dark:border-gray-700">
              <button
                onClick={() => setSelectedTab('updates')}
                className={`pb-3 px-4 font-semibold transition-colors ${
                  selectedTab === 'updates'
                    ? 'text-purple-500 border-b-2 border-purple-500'
                    : `${secondaryText} hover:${textClass}`
                }`}
              >
                <Clock size={18} className="inline mr-2" />
                Timestamped Updates ({updates.length})
              </button>
              <button
                onClick={() => setSelectedTab('comments')}
                className={`pb-3 px-4 font-semibold transition-colors ${
                  selectedTab === 'comments'
                    ? 'text-purple-500 border-b-2 border-purple-500'
                    : `${secondaryText} hover:${textClass}`
                }`}
              >
                <MessageCircle size={18} className="inline mr-2" />
                Listener Comments ({comments.length})
              </button>
            </div>

            {/* UPDATES TAB */}
            {selectedTab === 'updates' && (
              <div className="space-y-6">
                {/* Post New Update Form */}
                <div className={`${cardBg} border ${borderClass} rounded-xl p-6`}>
                  <h3 className={`text-lg font-bold ${textClass} mb-4`}>Post Timestamped Update</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-semibold ${secondaryText} mb-2`}>
                          Timestamp (MM:SS)
                        </label>
                        <input
                          type="text"
                          value={updateTimestamp}
                          onChange={(e) => setUpdateTimestamp(e.target.value)}
                          placeholder="12:45"
                          className={`w-full px-3 py-2 rounded-lg outline-none transition-colors ${inputBg}`}
                        />
                        <p className={`text-xs ${secondaryText} mt-1`}>Example: 12:45 (12 minutes, 45 seconds)</p>
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-semibold ${secondaryText} mb-2`}>
                        Update Content
                      </label>
                      <textarea
                        value={newUpdate}
                        onChange={(e) => setNewUpdate(e.target.value)}
                        placeholder="What recent legal development or case update happened? Be specific..."
                        rows="4"
                        className={`w-full px-4 py-3 rounded-lg outline-none transition-colors resize-none ${inputBg}`}
                      />
                      <p className={`text-xs ${secondaryText} mt-1`}>
                        {newUpdate.length}/500 characters
                      </p>
                    </div>
                    <button
                      onClick={handlePostUpdate}
                      disabled={!newUpdate.trim()}
                      className={`w-full px-6 py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 ${
                        newUpdate.trim()
                          ? 'bg-purple-500 text-white hover:bg-purple-600'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Send size={18} />
                      Post Update at {updateTimestamp}
                    </button>
                  </div>
                </div>

                {/* Existing Updates */}
                <div className="space-y-4">
                  <h3 className={`text-lg font-bold ${textClass}`}>Episode Updates</h3>
                  {updates && updates.length > 0 ? (
                    <div className="space-y-3">
                      {[...updates].reverse().map((update) => (
                        <div
                          key={update.id}
                          className={`rounded-lg p-4 ${getTypeColor(update.type)} ${isDarkTheme ? 'dark' : ''}`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">{getTypeIcon(update.type)}</span>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`font-bold ${textClass}`}>
                                  {update.timestamp}
                                </span>
                                <span className={`text-xs ${secondaryText} px-2 py-1 rounded ${
                                  isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'
                                }`}>
                                  {update.type}
                                </span>
                              </div>
                              <p className={textClass}>{update.content}</p>
                              <p className={`text-xs ${secondaryText} mt-2`}>
                                Posted {update.postedAt}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={`text-center py-8 ${secondaryText}`}>
                      No updates posted yet. Add one when major case developments happen!
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* COMMENTS TAB */}
            {selectedTab === 'comments' && (
              <div className="space-y-6">
                {/* Listener Comments */}
                <div>
                  <h3 className={`text-lg font-bold ${textClass} mb-4`}>Listener Comments ({comments.length})</h3>
                  <div className="space-y-4">
                    {comments && comments.length > 0 ? (
                      comments.map((comment) => (
                        <div
                          key={comment.id}
                          className={`${cardBg} border ${borderClass} rounded-lg p-4 hover:shadow-md transition-shadow`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className={`font-bold ${textClass}`}>{comment.author}</p>
                              <p className={`text-xs ${secondaryText}`}>{comment.timestamp}</p>
                            </div>
                          </div>
                          <p className={`${secondaryText} mb-3`}>{comment.text}</p>
                          <button className={`flex items-center gap-1 text-sm transition-colors ${
                            isDarkTheme ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                          }`}>
                            <ThumbsUp size={16} />
                            {comment.likes}
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className={`text-center py-8 ${secondaryText}`}>
                        No comments yet. Share this episode to get listener feedback!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Episode Stats */}
          <div className="space-y-6">
            {episode.analytics && (
              <>
                <div className={`${cardBg} border ${borderClass} rounded-xl p-6`}>
                  <h3 className={`text-lg font-bold ${textClass} mb-4`}>Episode Analytics</h3>
                  <div className="space-y-4">
                    <div>
                      <p className={`text-sm ${secondaryText}`}>Total Plays</p>
                      <p className={`text-3xl font-bold text-purple-500`}>
                        {episode.analytics.plays?.toLocaleString()}
                      </p>
                    </div>
                    <div className="border-t border-gray-300 dark:border-gray-700 pt-4">
                      <p className={`text-sm ${secondaryText}`}>Downloads</p>
                      <p className={`text-2xl font-bold ${textClass}`}>
                        {episode.analytics.downloads?.toLocaleString()}
                      </p>
                    </div>
                    <div className="border-t border-gray-300 dark:border-gray-700 pt-4">
                      <p className={`text-sm ${secondaryText}`}>Completion Rate</p>
                      <p className={`text-2xl font-bold text-green-500`}>
                        {episode.analytics.completionRate}%
                      </p>
                    </div>
                    <div className="border-t border-gray-300 dark:border-gray-700 pt-4">
                      <p className={`text-sm ${secondaryText}`}>New Subscribers</p>
                      <p className={`text-2xl font-bold text-blue-500`}>
                        +{episode.analytics.newSubscribers}
                      </p>
                    </div>
                    <div className="border-t border-gray-300 dark:border-gray-700 pt-4">
                      <p className={`text-sm ${secondaryText}`}>Avg Listen Time</p>
                      <p className={`text-2xl font-bold ${textClass}`}>
                        {episode.analytics.avgListenTime}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`${cardBg} border ${borderClass} rounded-xl p-6`}>
                  <h3 className={`text-lg font-bold ${textClass} mb-4`}>Engagement</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className={secondaryText}>Shares</span>
                      <span className={`font-bold ${textClass}`}>{episode.analytics.shares || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={secondaryText}>Comments</span>
                      <span className={`font-bold ${textClass}`}>{episode.analytics.comments || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={secondaryText}>Revenue</span>
                      <span className={`font-bold text-green-500`}>
                        ${episode.analytics.revenue?.toFixed(2) || '0.00'}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Update Tips */}
            <div className={`${cardBg} border border-blue-300 dark:border-blue-700 rounded-xl p-6 bg-blue-50 dark:bg-blue-900/20`}>
              <h4 className={`font-bold ${textClass} mb-3 flex items-center gap-2`}>
                <Zap size={18} className="text-blue-500" />
                Update Tips
              </h4>
              <ul className={`space-y-2 text-sm ${secondaryText}`}>
                <li>• Post updates when major case developments occur</li>
                <li>• Use exact timestamps from the episode</li>
                <li>• Keep updates factual and sourced</li>
                <li>• Updates appear in podcast show notes</li>
                <li>• Listeners see them on replay</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
