import React, { useState, useEffect, useRef } from 'react'
import { Play, Pause, Volume2, SkipBack, SkipForward, X, Send, ThumbsUp, MessageCircle, Clock, Plus, CheckCircle } from 'lucide-react'
import { creatorEpisodes, episodeListenerComments, episodeTimestampedUpdates } from '../data/mockData'

export default function EpisodePlayer({ isDarkTheme, episodeId, onBack }) {
  const [selectedEpisode, setSelectedEpisode] = useState(() => 
    creatorEpisodes.find(ep => ep.id === episodeId) || creatorEpisodes[0]
  )
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(70)
  const [updates, setUpdates] = useState(episodeTimestampedUpdates[episodeId] || [])
  const [comments, setComments] = useState(episodeListenerComments[episodeId] || [])
  const [showCommentsList, setShowCommentsList] = useState(false)
  const [progressBarClickTime, setProgressBarClickTime] = useState(null)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [updateTitle, setUpdateTitle] = useState('')
  const [updateContent, setUpdateContent] = useState('')
  const [selectedUpdateType, setSelectedUpdateType] = useState('update')
  const [hoverTime, setHoverTime] = useState(null)
  const progressBarRef = useRef(null)

  // Auto-play and progress
  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= selectedEpisode.duration) {
          setIsPlaying(false)
          return selectedEpisode.duration
        }
        return prev + 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [isPlaying, selectedEpisode.duration])

  const textClass = isDarkTheme ? 'text-gray-100' : 'text-gray-900'
  const secondaryText = isDarkTheme ? 'text-gray-400' : 'text-gray-600'
  const bgClass = isDarkTheme ? 'bg-gray-900' : 'bg-white'
  const cardBg = isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'
  const borderClass = isDarkTheme ? 'border-gray-700' : 'border-gray-200'
  const inputBg = isDarkTheme ? 'bg-gray-700 text-white placeholder-gray-500' : 'bg-white text-gray-900 placeholder-gray-400'

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleProgressBarClick = (e) => {
    if (!progressBarRef.current) return
    const rect = progressBarRef.current.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = Math.floor(percent * selectedEpisode.duration)
    setProgressBarClickTime(newTime)
    setShowUpdateForm(true)
  }

  const handlePostUpdate = () => {
    if (updateTitle.trim() && updateContent.trim() && progressBarClickTime !== null) {
      const newUpdate = {
        id: updates.length + 1,
        timestamp: formatTime(progressBarClickTime),
        title: updateTitle,
        content: updateContent,
        postedAt: new Date().toLocaleString(),
        type: selectedUpdateType
      }
      setUpdates([...updates, newUpdate])
      setUpdateTitle('')
      setUpdateContent('')
      setSelectedUpdateType('update')
      setShowUpdateForm(false)
      setProgressBarClickTime(null)
    }
  }

  const handleCancelUpdate = () => {
    setShowUpdateForm(false)
    setUpdateTitle('')
    setUpdateContent('')
    setSelectedUpdateType('update')
    setProgressBarClickTime(null)
  }

  const handleTimelineHover = (e) => {
    if (!progressBarRef.current) return
    const rect = progressBarRef.current.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const hoverSeconds = Math.floor(percent * selectedEpisode.duration)
    setHoverTime(hoverSeconds)
  }

  const handleTimelineLeave = () => {
    setHoverTime(null)
  }

  // Get updates and comments that appear at current timestamp
  const getItemsAtCurrentTime = () => {
    const items = []
    
    // Add updates at current time
    updates.forEach(update => {
      const [updateMins, updateSecs] = update.timestamp.split(':').map(Number)
      const updateTimeSeconds = updateMins * 60 + updateSecs
      if (Math.abs(updateTimeSeconds - currentTime) < 2) {
        items.push({
          type: 'update',
          data: update,
          icon: '📌'
        })
      }
    })

    // Add comments at current time (if they had timestamps)
    comments.forEach(comment => {
      // Extract time from comment timestamp if available
      const match = comment.timestamp.match(/(\d+)([a-z])\s/i)
      if (match) {
        const value = parseInt(match[1])
        const unit = match[2].toLowerCase()
        let commentTimeSeconds = 0
        if (unit === 'm') commentTimeSeconds = value * 60
        else if (unit === 's') commentTimeSeconds = value
        
        if (Math.abs(commentTimeSeconds - currentTime) < 2) {
          items.push({
            type: 'comment',
            data: comment,
            icon: '💬'
          })
        }
      }
    })

    return items
  }

  const currentItems = getItemsAtCurrentTime()

  // Get all markers for timeline visualization
  const getTimelineMarkers = () => {
    const markers = []
    
    updates.forEach(update => {
      const [mins, secs] = update.timestamp.split(':').map(Number)
      const timeInSeconds = mins * 60 + secs
      const position = (timeInSeconds / selectedEpisode.duration) * 100
      markers.push({
        position,
        type: 'update',
        label: update.title,
        icon: update.type === 'breaking' ? '⚡' : update.type === 'major' ? '🚨' : '📢',
        color: update.type === 'breaking' ? 'bg-red-500' : update.type === 'major' ? 'bg-orange-500' : 'bg-blue-500'
      })
    })

    comments.forEach((comment, idx) => {
      const match = comment.timestamp.match(/(\d+)([a-z])\s/i)
      if (match) {
        const value = parseInt(match[1])
        const unit = match[2].toLowerCase()
        let commentTimeSeconds = 0
        if (unit === 'm') commentTimeSeconds = value * 60
        else if (unit === 's') commentTimeSeconds = value
        
        const position = (commentTimeSeconds / selectedEpisode.duration) * 100
        markers.push({
          position,
          type: 'comment',
          label: comment.author,
          icon: '💬',
          color: 'bg-purple-500'
        })
      }
    })

    return markers.sort((a, b) => a.position - b.position)
  }

  const timelineMarkers = getTimelineMarkers()

  const getUpdateTypeColor = (type) => {
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

  return (
    <div className={`min-h-screen ${bgClass}`}>
      {/* Header */}
      <div className={`border-b ${borderClass} sticky top-0 z-10 backdrop-blur-lg`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={onBack}
            className={`mb-4 flex items-center gap-2 ${isDarkTheme ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
          >
            ← Back
          </button>
          <div className="flex items-start gap-4">
            <div className="text-4xl">{selectedEpisode.thumbnail}</div>
            <div>
              <h1 className={`text-3xl font-bold ${textClass}`}>{selectedEpisode.title}</h1>
              <p className={`${secondaryText} mt-2`}>{selectedEpisode.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Player Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Player Area */}
            <div className={`${cardBg} border ${borderClass} rounded-xl p-8 space-y-6`}>
              {/* Big Play Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-24 h-24 rounded-full bg-purple-500 hover:bg-purple-600 transition-colors flex items-center justify-center shadow-2xl"
                >
                  {isPlaying ? (
                    <Pause size={48} className="text-white fill-white" />
                  ) : (
                    <Play size={48} className="text-white fill-white ml-2" />
                  )}
                </button>
              </div>

              {/* Progress Info */}
              <div className="text-center">
                <p className={`text-2xl font-bold ${textClass}`}>
                  {formatTime(currentTime)} / {formatTime(selectedEpisode.duration)}
                </p>
                <p className={`text-sm ${secondaryText} mt-1`}>
                  {isPlaying ? 'Playing' : 'Paused'}
                </p>
              </div>

              {/* Enhanced Timeline with Markers */}
              <div className="space-y-3">
                {/* Legend - Color codes */}
                <div className="flex flex-wrap gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className={secondaryText}>⚡ Breaking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className={secondaryText}>🚨 Major</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className={secondaryText}>📢 Standard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className={secondaryText}>💬 Comments</span>
                  </div>
                </div>

                {/* Timeline Container */}
                <div
                  ref={progressBarRef}
                  onClick={handleProgressBarClick}
                  onMouseMove={handleTimelineHover}
                  onMouseLeave={handleTimelineLeave}
                  className="relative group"
                >
                  {/* Relative position container for markers and progress */}
                  <div className="relative h-8 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />

                    {/* Progress fill */}
                    <div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all shadow-md"
                      style={{ width: `${(currentTime / selectedEpisode.duration) * 100}%` }}
                    />

                    {/* Update and comment markers - Color coded */}
                    {timelineMarkers.map((marker, idx) => (
                      <div
                        key={idx}
                        className="absolute top-0 h-full group/marker cursor-pointer transition-all hover:z-20"
                        style={{ left: `${marker.position}%`, width: '3px', transform: 'translateX(-50%)' }}
                        title={`${marker.label} at ${formatTime(Math.floor(marker.position / 100 * selectedEpisode.duration))}`}
                      >
                        {/* Marker line - thicker on hover */}
                        <div className={`w-full h-full ${marker.color} opacity-70 group-hover/marker:opacity-100 transition-all group-hover/marker:scale-x-150 group-hover/marker:shadow-lg`} />
                        
                        {/* Marker label on hover - enhanced */}
                        <div className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap ${
                          marker.type === 'comment' 
                            ? 'bg-purple-500 text-white' 
                            : marker.color === 'bg-red-500'
                            ? 'bg-red-500 text-white'
                            : marker.color === 'bg-orange-500'
                            ? 'bg-orange-500 text-white'
                            : 'bg-blue-500 text-white'
                        } opacity-0 group-hover/marker:opacity-100 transition-opacity pointer-events-none shadow-lg z-50`}>
                          {marker.icon} {marker.label}
                          <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 ${
                            marker.type === 'comment' 
                              ? 'bg-purple-500' 
                              : marker.color === 'bg-red-500'
                              ? 'bg-red-500'
                              : marker.color === 'bg-orange-500'
                              ? 'bg-orange-500'
                              : 'bg-blue-500'
                          } rotate-45`}></div>
                        </div>
                      </div>
                    ))}

                    {/* Current time indicator - Red line */}
                    <div
                      className="absolute top-0 h-full w-1 bg-red-600 shadow-2xl z-20"
                      style={{ left: `${(currentTime / selectedEpisode.duration) * 100}%`, transform: 'translateX(-50%)' }}
                    />

                    {/* Hover cursor line with timestamp */}
                    {hoverTime !== null && (
                      <div
                        className="absolute top-0 h-full w-1 bg-white shadow-lg z-30 pointer-events-none"
                        style={{ left: `${(hoverTime / selectedEpisode.duration) * 100}%`, transform: 'translateX(-50%)' }}
                      >
                        {/* Hover timestamp tooltip - Better visibility */}
                        <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-lg text-xs font-bold bg-purple-600 text-white whitespace-nowrap shadow-lg z-50 border border-purple-500">
                          {formatTime(hoverTime)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Time display under progress bar */}
                  <div className="flex justify-between text-xs mt-3">
                    <span className={secondaryText}>{formatTime(currentTime)}</span>
                    <span className={secondaryText}>{formatTime(selectedEpisode.duration)}</span>
                  </div>

                  {/* Hint text on hover */}
                  <div className="absolute -bottom-5 left-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold text-purple-500 pointer-events-none">
                    Click to add update
                  </div>
                </div>

                {/* Contextual Plus Button for Adding Updates */}
                {showUpdateForm && progressBarClickTime !== null && (
                  <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-600">
                    <div className={`${cardBg} border ${borderClass} rounded-xl p-6`}>
                      <h4 className={`font-bold ${textClass} mb-4 flex items-center gap-2`}>
                        <Plus size={20} className="text-purple-500" />
                        Add Update at {formatTime(progressBarClickTime)}
                      </h4>

                      <div className="space-y-4">
                        {/* Update Type Selection */}
                        <div>
                          <label className={`block text-sm font-semibold ${secondaryText} mb-2`}>
                            Update Type
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { value: 'breaking', label: '⚡ Breaking', desc: 'Breaking updates', color: 'border-red-500' },
                              { value: 'major', label: '🚨 Major', desc: 'Major updates', color: 'border-orange-500' },
                              { value: 'update', label: '📢 Standard', desc: 'Standard updates', color: 'border-blue-500' }
                            ].map((type) => (
                              <button
                                key={type.value}
                                onClick={() => setSelectedUpdateType(type.value)}
                                className={`p-3 rounded-lg border-2 transition-all text-center ${
                                  selectedUpdateType === type.value
                                    ? `${type.color} ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-100'}`
                                    : `border-gray-300 dark:border-gray-600 ${isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`
                                }`}
                              >
                                <div className="text-xl mb-1">{type.label.split(' ')[0]}</div>
                                <div className={`text-xs ${secondaryText}`}>{type.desc}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Title Input */}
                        <div>
                          <label className={`block text-sm font-semibold ${secondaryText} mb-2`}>
                            Title
                          </label>
                          <input
                            type="text"
                            value={updateTitle}
                            onChange={(e) => setUpdateTitle(e.target.value)}
                            placeholder="e.g., DNA Evidence Confirmed, New Witness Found..."
                            className={`w-full px-4 py-2 rounded-lg outline-none transition-colors ${inputBg}`}
                          />
                        </div>

                        {/* Content Input */}
                        <div>
                          <label className={`block text-sm font-semibold ${secondaryText} mb-2`}>
                            Description
                          </label>
                          <textarea
                            value={updateContent}
                            onChange={(e) => setUpdateContent(e.target.value)}
                            placeholder="Share details about this update with your listeners..."
                            rows="4"
                            className={`w-full px-4 py-3 rounded-lg outline-none transition-colors resize-none ${inputBg}`}
                          />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                          <button
                            onClick={handlePostUpdate}
                            disabled={!updateTitle.trim() || !updateContent.trim()}
                            className={`flex-1 px-4 py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 ${
                              updateTitle.trim() && updateContent.trim()
                                ? 'bg-purple-500 text-white hover:bg-purple-600 cursor-pointer'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            <CheckCircle size={18} />
                            Post Update at {formatTime(progressBarClickTime)}
                          </button>
                          <button
                            onClick={handleCancelUpdate}
                            className={`px-4 py-3 rounded-lg font-bold transition-colors ${
                              isDarkTheme ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                            } ${textClass}`}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setCurrentTime(Math.max(0, currentTime - 15))}
                    className={`p-3 rounded-lg transition-colors ${
                      isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <SkipBack size={24} className={textClass} />
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="px-6 py-3 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors flex items-center gap-2 font-bold"
                  >
                    {isPlaying ? (
                      <>
                        <Pause size={20} className="fill-current" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play size={20} className="fill-current ml-0.5" />
                        Play
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setCurrentTime(Math.min(selectedEpisode.duration, currentTime + 15))}
                    className={`p-3 rounded-lg transition-colors ${
                      isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <SkipForward size={24} className={textClass} />
                  </button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-3">
                  <Volume2 size={20} className={secondaryText} />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-24 h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className={`text-sm w-8 ${secondaryText}`}>{volume}%</span>
                </div>
              </div>
            </div>

            {/* Current Timestamp Items (Updates/Comments appearing NOW) */}
            {currentItems.length > 0 && (
              <div className={`${cardBg} border-l-4 border-purple-500 rounded-xl p-6 bg-purple-50 dark:bg-purple-900/20`}>
                <h3 className={`font-bold ${textClass} mb-4 flex items-center gap-2`}>
                  <Clock size={20} className="text-purple-500" />
                  Appearing Now ({formatTime(currentTime)})
                </h3>
                <div className="space-y-3">
                  {currentItems.map((item, idx) => (
                    <div
                      key={idx}
                      className={`${
                        item.type === 'update'
                          ? getUpdateTypeColor(item.data.type)
                          : 'border-l-4 border-purple-500 bg-purple-100 dark:bg-purple-900/30'
                      } rounded-lg p-4`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div className="flex-1">
                          {item.type === 'update' ? (
                            <>
                              <p className={`font-bold ${textClass}`}>{item.data.title}</p>
                              <p className={secondaryText}>{item.data.content}</p>
                            </>
                          ) : (
                            <>
                              <p className={`font-bold ${textClass}`}>{item.data.author}</p>
                              <p className={secondaryText}>{item.data.message}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Comments & Episode Overview */}
          <div className="space-y-6">
            {/* Comments Tab */}
            <div className={`${cardBg} border ${borderClass} rounded-xl p-6`}>
              <button
                onClick={() => setShowCommentsList(!showCommentsList)}
                className={`w-full flex items-center justify-between mb-4 pb-4 border-b ${borderClass}`}
              >
                <h3 className={`font-bold ${textClass} flex items-center gap-2`}>
                  <MessageCircle size={20} />
                  Comments ({comments.length})
                </h3>
                <span className={`text-sm ${secondaryText}`}>
                  {showCommentsList ? '−' : '+'}
                </span>
              </button>

              {showCommentsList && (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <div
                        key={comment.id}
                        className={`${isDarkTheme ? 'bg-gray-700/50' : 'bg-gray-100'} rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer group`}
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-lg">💬</span>
                          <div className="flex-1 min-w-0">
                            <p className={`font-bold text-sm ${textClass} group-hover:text-purple-500`}>
                              {comment.author}
                            </p>
                            <p className={`text-xs ${secondaryText} line-clamp-2`}>
                              {comment.message}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className={`text-xs ${secondaryText}`}>
                                {comment.timestamp}
                              </span>
                              <span className={`text-xs flex items-center gap-1 ${secondaryText}`}>
                                <ThumbsUp size={12} /> {comment.likes}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className={`text-center py-4 ${secondaryText}`}>
                      No comments yet
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Update Tips & Engagement Overview */}
            <div className={`${cardBg} border ${borderClass} rounded-xl p-6`}>
              <h3 className={`font-bold ${textClass} mb-4 flex items-center gap-2`}>
                💡 Update Tips & Strategy
              </h3>
              <div className="space-y-4">
                <div className={`${isDarkTheme ? 'bg-gray-700/50' : 'bg-blue-50'} rounded-lg p-4 border-l-4 border-blue-500`}>
                  <p className={`font-semibold ${textClass} text-sm mb-1`}>Breaking Updates</p>
                  <p className={`text-xs ${secondaryText}`}>Post major case developments and surprising evidence immediately. These get the most engagement.</p>
                </div>
                <div className={`${isDarkTheme ? 'bg-gray-700/50' : 'bg-orange-50'} rounded-lg p-4 border-l-4 border-orange-500`}>
                  <p className={`font-semibold ${textClass} text-sm mb-1`}>Major Updates</p>
                  <p className={`text-xs ${secondaryText}`}>Share expert analysis, witness statements, and case turning points throughout the episode.</p>
                </div>
                <div className={`${isDarkTheme ? 'bg-gray-700/50' : 'bg-purple-50'} rounded-lg p-4 border-l-4 border-purple-500`}>
                  <p className={`font-semibold ${textClass} text-sm mb-1`}>Best Practice</p>
                  <p className={`text-xs ${secondaryText}`}>Update regularly at key moments. Listeners scroll through updates, keep them interested and engaged.</p>
                </div>
              </div>
            </div>

            {/* Episode Updates Overview */}
            <div className={`${cardBg} border ${borderClass} rounded-xl p-6`}>
              <h3 className={`font-bold ${textClass} mb-4 flex items-center gap-2`}>
                <Clock size={20} />
                Episode Updates ({updates.length})
              </h3>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {updates.length > 0 ? (
                  [...updates].reverse().map((update) => (
                    <div
                      key={update.id}
                      className={`${getUpdateTypeColor(update.type)} rounded-lg p-3 cursor-pointer hover:shadow-md transition-all group`}
                      onClick={() => {
                        const [mins, secs] = update.timestamp.split(':').map(Number)
                        setCurrentTime(mins * 60 + secs)
                      }}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-lg">
                          {update.type === 'breaking' ? '⚡' : update.type === 'major' ? '🚨' : '📢'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className={`font-bold text-sm ${textClass}`}>
                            {update.timestamp}
                          </p>
                          <p className={`text-xs ${secondaryText} font-semibold mb-1`}>
                            {update.title}
                          </p>
                          <p className={`text-xs ${secondaryText} line-clamp-2`}>
                            {update.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={`text-center py-4 ${secondaryText}`}>
                    No updates posted for this episode yet.
                  </p>
                )}
              </div>
            </div>

            {/* Episode Stats */}
            {selectedEpisode.analytics && (
              <div className={`${cardBg} border ${borderClass} rounded-xl p-6`}>
                <h3 className={`font-bold ${textClass} mb-4`}>Episode Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={secondaryText}>Plays</span>
                    <span className={`font-bold ${textClass}`}>
                      {selectedEpisode.analytics.plays?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={secondaryText}>Completion</span>
                    <span className={`font-bold text-green-500`}>
                      {selectedEpisode.analytics.completionRate}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={secondaryText}>New Subs</span>
                    <span className={`font-bold text-blue-500`}>
                      +{selectedEpisode.analytics.newSubscribers}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={secondaryText}>Comments</span>
                    <span className={`font-bold ${textClass}`}>
                      {selectedEpisode.analytics.comments || 0}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
