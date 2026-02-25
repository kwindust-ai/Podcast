import React, { useState } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Download, Share2, MessageCircle, Filter, X } from 'lucide-react'
import { creatorEpisodes, analyticsData } from '../data/mockData'

export default function Analytics({ isDarkTheme, onBack }) {
  const [selectedEpisode, setSelectedEpisode] = useState(creatorEpisodes[0])
  const [timeRange, setTimeRange] = useState('7d')

  const textClass = isDarkTheme ? 'text-gray-100' : 'text-gray-900'
  const secondaryText = isDarkTheme ? 'text-gray-400' : 'text-gray-600'
  const bgClass = isDarkTheme ? 'bg-gray-900' : 'bg-white'
  const cardBg = isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'
  const borderClass = isDarkTheme ? 'border-gray-700' : 'border-gray-200'
  const gridColor = isDarkTheme ? '#374151' : '#e5e7eb'
  const textColorChart = isDarkTheme ? '#d1d5db' : '#111827'

  const chartColors = ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981']
  const pieData = [
    { name: 'Played to Completion', value: 84 },
    { name: 'Partial Plays', value: 12 },
    { name: 'Skipped', value: 4 }
  ]

  return (
    <div className={`min-h-screen ${bgClass}`}>
      {/* Header */}
      <div className={`border-b ${borderClass} sticky top-0 z-10 backdrop-blur-lg bg-opacity-90`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className={`text-2xl font-bold ${textClass}`}>Episode Analytics</h1>
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
        {/* Episode Selector */}
        <div className="mb-8">
          <h2 className={`text-lg font-bold ${textClass} mb-3`}>Select Episode</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{episode.thumbnail}</span>
                    <span className="text-xs font-semibold text-green-500">Published</span>
                  </div>
                  <h3 className={`font-bold ${textClass} line-clamp-2 text-sm`}>{episode.title}</h3>
                  <p className={`text-xs ${secondaryText} mt-1`}>{episode.publishedDate}</p>
                </button>
              ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: '▶️', label: 'Total Plays', value: selectedEpisode.analytics?.plays, color: 'purple' },
            { icon: '⬇️', label: 'Downloads', value: selectedEpisode.analytics?.downloads, color: 'blue' },
            { icon: '⏱️', label: 'Avg Listen Time', value: selectedEpisode.analytics?.avgListenTime, color: 'green' },
            { icon: '💬', label: 'Comments', value: selectedEpisode.analytics?.comments, color: 'pink' },
          ].map((metric, idx) => (
            <div
              key={idx}
              className={`${cardBg} border ${borderClass} rounded-lg p-6`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{metric.icon}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  metric.color === 'purple' ? 'bg-purple-500/20 text-purple-500' :
                  metric.color === 'blue' ? 'bg-blue-500/20 text-blue-500' :
                  metric.color === 'green' ? 'bg-green-500/20 text-green-500' :
                  'bg-pink-500/20 text-pink-500'
                }`}>+5%</span>
              </div>
              <p className={secondaryText}>{metric.label}</p>
              <p className={`text-2xl font-bold ${textClass} mt-1`}>{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Time Range Filter */}
        <div className="flex gap-2 mb-8">
          {['7d', '30d', '90d', 'all'].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                timeRange === range
                  ? 'bg-purple-500 text-white'
                  : isDarkTheme
                  ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range === '7d' && '7 Days'}
              {range === '30d' && '30 Days'}
              {range === '90d' && '90 Days'}
              {range === 'all' && 'All Time'}
            </button>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Plays Over Time */}
          <div className={`${cardBg} border ${borderClass} rounded-lg p-6`}>
            <h3 className={`font-bold ${textClass} mb-6 flex items-center gap-2`}>
              <TrendingUp size={20} className="text-purple-500" />
              Plays Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="day" stroke={textColorChart} />
                <YAxis stroke={textColorChart} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkTheme ? '#1f2937' : '#ffffff',
                    border: `1px solid ${isDarkTheme ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: textColorChart }}
                />
                <Line
                  type="monotone"
                  dataKey="plays"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Completion Rate */}
          <div className={`${cardBg} border ${borderClass} rounded-lg p-6`}>
            <h3 className={`font-bold ${textClass} mb-6`}>Listener Behavior</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} (${value}%)`}
                  outerRadius={100}
                  fill="#8b5cf6"
                  dataKey="value"
                >
                  {chartColors.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkTheme ? '#1f2937' : '#ffffff',
                    border: `1px solid ${isDarkTheme ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: textColorChart }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Downloads & Engagement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Downloads Over Time */}
          <div className={`${cardBg} border ${borderClass} rounded-lg p-6`}>
            <h3 className={`font-bold ${textClass} mb-6 flex items-center gap-2`}>
              <Download size={20} className="text-blue-500" />
              Downloads
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="day" stroke={textColorChart} />
                <YAxis stroke={textColorChart} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkTheme ? '#1f2937' : '#ffffff',
                    border: `1px solid ${isDarkTheme ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: textColorChart }}
                />
                <Bar dataKey="downloads" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* New Subscribers */}
          <div className={`${cardBg} border ${borderClass} rounded-lg p-6`}>
            <h3 className={`font-bold ${textClass} mb-6 flex items-center gap-2`}>
              👥 New Subscribers from This Episode
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="day" stroke={textColorChart} />
                <YAxis stroke={textColorChart} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkTheme ? '#1f2937' : '#ffffff',
                    border: `1px solid ${isDarkTheme ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: textColorChart }}
                />
                <Line
                  type="monotone"
                  dataKey="newSubs"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className={`${cardBg} border ${borderClass} rounded-lg p-6`}>
          <h2 className={`font-bold ${textClass} mb-6`}>Engagement</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Share2, label: 'Shares', value: selectedEpisode.analytics?.shares },
              { icon: MessageCircle, label: 'Comments', value: selectedEpisode.analytics?.comments },
              { icon: '📈', label: 'Completion %', value: `${selectedEpisode.analytics?.completionRate}%` },
              { icon: '💰', label: 'Revenue', value: `$${selectedEpisode.analytics?.revenue.toFixed(2)}` },
            ].map((item, idx) => {
              const IconComponent = typeof item.icon === 'string' ? null : item.icon
              return (
                <div key={idx} className="text-center">
                  <div className="text-2xl mb-2">
                    {IconComponent ? <IconComponent size={24} className="mx-auto text-purple-500" /> : item.icon}
                  </div>
                  <p className={secondaryText}>{item.label}</p>
                  <p className={`font-bold ${textClass} mt-1`}>{item.value}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
