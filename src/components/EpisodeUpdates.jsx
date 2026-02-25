import React, { useState } from 'react'
import { Plus, X, Send, AlertCircle, CheckCircle, Link2, FileText } from 'lucide-react'
import { creatorEpisodes, episodeUpdates, suggestedUpdates } from '../data/mockData'

export default function EpisodeUpdates({ isDarkTheme, onBack }) {
  const [selectedEpisode, setSelectedEpisode] = useState(creatorEpisodes[0])
  const [updates, setUpdates] = useState(episodeUpdates)
  const [isAddingUpdate, setIsAddingUpdate] = useState(false)
  const [updateType, setUpdateType] = useState('update')
  const [updateTitle, setUpdateTitle] = useState('')
  const [updateContent, setUpdateContent] = useState('')

  const textClass = isDarkTheme ? 'text-gray-100' : 'text-gray-900'
  const secondaryText = isDarkTheme ? 'text-gray-400' : 'text-gray-600'
  const bgClass = isDarkTheme ? 'bg-gray-900' : 'bg-white'
  const cardBg = isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'
  const borderClass = isDarkTheme ? 'border-gray-700' : 'border-gray-200'
  const inputBg = isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'

  const handleAddUpdate = () => {
    if (updateTitle.trim() && updateContent.trim()) {
      setUpdates([
        {
          id: updates.length + 1,
          type: updateType,
          title: updateTitle,
          content: updateContent,
          date: 'just now',
          icon: updateType === 'correction' ? '⚠️' : updateType === 'resource' ? '📄' : '📌'
        },
        ...updates
      ])
      setUpdateTitle('')
      setUpdateContent('')
      setUpdateType('update')
      setIsAddingUpdate(false)
    }
  }

  return (
    <div className={`min-h-screen ${bgClass}`}>
      {/* Header */}
      <div className={`border-b ${borderClass} sticky top-0 z-10 backdrop-blur-lg bg-opacity-90`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className={`text-2xl font-bold ${textClass}`}>Episode Updates</h1>
          <button
            onClick={onBack}
            className={`p-2 rounded-lg transition-colors ${
              isDarkTheme ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`}
          >
            <X size={24} className={secondaryText} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Episode Selector */}
            <div className="mb-8">
              <h2 className={`text-lg font-bold ${textClass} mb-3`}>Select Episode</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {creatorEpisodes
                  .filter(ep => ep.status === 'published')
                  .map(episode => (
                    <button
                      key={episode.id}
                      onClick={() => setSelectedEpisode(episode)}
                      className={`p-4 rounded-lg text-left transition-all border ${
                        selectedEpisode.id === episode.id
                          ? `border-purple-500 ${cardBg} ring-2 ring-purple-500`
                          : `border-gray-200 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'} hover:border-purple-300`
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{episode.thumbnail}</span>
                        <div className="min-w-0">
                          <h3 className={`font-bold ${textClass} line-clamp-1 text-sm`}>{episode.title}</h3>
                          <p className={`text-xs ${secondaryText}`}>{episode.publishedDate}</p>
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>

            {/* Updates List */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-bold ${textClass}`}>Update History</h2>
                <button
                  onClick={() => setIsAddingUpdate(!isAddingUpdate)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors"
                >
                  <Plus size={18} />
                  Add Update
                </button>
              </div>

              {isAddingUpdate && (
                <div className={`${cardBg} border ${borderClass} rounded-lg p-6 mb-6`}>
                  <div className="mb-4">
                    <label className={`block text-sm font-bold ${textClass} mb-2`}>Update Type</label>
                    <div className="flex gap-2">
                      {[
                        { value: 'update', label: 'Update', icon: '📌' },
                        { value: 'correction', label: 'Correction', icon: '⚠️' },
                        { value: 'resource', label: 'Resource', icon: '📄' }
                      ].map(type => (
                        <button
                          key={type.value}
                          onClick={() => setUpdateType(type.value)}
                          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${
                            updateType === type.value
                              ? 'bg-purple-500 text-white'
                              : isDarkTheme
                              ? 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                        >
                          <span>{type.icon}</span>
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className={`block text-sm font-bold ${textClass} mb-2`}>Title</label>
                    <input
                      type="text"
                      value={updateTitle}
                      onChange={(e) => setUpdateTitle(e.target.value)}
                      placeholder="e.g., New Resource Added"
                      className={`w-full px-4 py-2 rounded-lg border ${borderClass} outline-none transition-colors ${inputBg}`}
                    />
                  </div>

                  <div className="mb-4">
                    <label className={`block text-sm font-bold ${textClass} mb-2`}>Content</label>
                    <textarea
                      value={updateContent}
                      onChange={(e) => setUpdateContent(e.target.value)}
                      placeholder="Share details about this update..."
                      rows="4"
                      className={`w-full px-4 py-2 rounded-lg border ${borderClass} outline-none transition-colors resize-none ${inputBg}`}
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsAddingUpdate(false)}
                      className={`flex-1 px-4 py-2 rounded-lg font-bold transition-colors ${
                        isDarkTheme
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddUpdate}
                      disabled={!updateTitle.trim() || !updateContent.trim()}
                      className={`flex-1 px-4 py-2 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 ${
                        updateTitle.trim() && updateContent.trim()
                          ? 'bg-purple-500 text-white hover:bg-purple-600'
                          : isDarkTheme
                          ? 'bg-gray-700 text-gray-600'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      <Send size={16} />
                      Publish Update
                    </button>
                  </div>
                </div>
              )}

              {/* Updates */}
              <div className="space-y-4">
                {updates.map(update => (
                  <div
                    key={update.id}
                    className={`${cardBg} border ${borderClass} rounded-lg p-6 transition-all hover:shadow-lg`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl flex-shrink-0">{update.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-2">
                          <h3 className={`font-bold ${textClass}`}>{update.title}</h3>
                          <span className={`text-xs ${secondaryText}`}>{update.date}</span>
                        </div>
                        <p className={`${secondaryText} mb-3`}>{update.content}</p>
                        <div className="flex gap-4 text-sm">
                          <button className="text-purple-500 hover:text-purple-600 font-semibold">
                            👍 123 likes
                          </button>
                          <button className="text-purple-500 hover:text-purple-600 font-semibold">
                            💬 Reply
                          </button>
                        </div>
                      </div>
                      <button className={`p-2 rounded-lg transition-colors ${
                        isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}>
                        ⋮
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Suggested Updates */}
          <div>
            <h2 className={`text-lg font-bold ${textClass} mb-4`}>Suggested Updates</h2>
            <div className="space-y-3">
              {suggestedUpdates.map(suggestion => (
                <div
                  key={suggestion.id}
                  className={`${cardBg} border ${borderClass} rounded-lg p-4 cursor-pointer transition-all hover:border-purple-500 hover:scale-105`}
                  onClick={() => {
                    setUpdateTitle(suggestion.title)
                    setUpdateContent(suggestion.description)
                    setUpdateType(suggestion.type)
                    setIsAddingUpdate(true)
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg">
                      {suggestion.type === 'resource' && '📄'}
                      {suggestion.type === 'correction' && '⚠️'}
                      {suggestion.type === 'followup' && '📌'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className={`font-bold ${textClass} text-sm`}>{suggestion.title}</h3>
                      <p className={`text-xs ${secondaryText} line-clamp-2 mt-1`}>
                        {suggestion.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tips */}
            <div className={`${cardBg} border ${borderClass} rounded-lg p-4 mt-6`}>
              <h3 className={`font-bold ${textClass} flex items-center gap-2 mb-3`}>
                💡 Best Practices
              </h3>
              <ul className={`text-sm ${secondaryText} space-y-2`}>
                <li>• Post corrections within 24 hours</li>
                <li>• Share resources mentioned in the episode</li>
                <li>• Respond to listener feedback</li>
                <li>• Link to related episodes</li>
                <li>• Keep updates relevant and timely</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
