import React, { useState } from 'react'
import { ArrowLeft, TrendingUp, Users, Eye, Heart, Share2, MessageCircle, Clock, Calendar } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { creatorEpisodes } from '../data/mockData'

export default function EpisodeAnalytics({ isDarkTheme, episodeId, onBack }) {
  const selectedEpisode = creatorEpisodes.find(ep => ep.id === episodeId) || creatorEpisodes[0]
  const analytics = selectedEpisode.analytics || {}

  const textClass = isDarkTheme ? 'text-gray-50' : 'text-slate-900'
  const secondaryText = isDarkTheme ? 'text-slate-400' : 'text-slate-600'
  const bgClass = isDarkTheme ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
  const cardBg = isDarkTheme ? 'bg-slate-800/50 backdrop-blur-xl' : 'bg-white/50 backdrop-blur-xl'
  const borderClass = isDarkTheme ? 'border-slate-700/50' : 'border-slate-200/50'

  // Mock data for detailed analytics
  const playsOverTime = [
    { day: 'Mon', plays: 120 },
    { day: 'Tue', plays: 180 },
    { day: 'Wed', plays: 150 },
    { day: 'Thu', plays: 220 },
    { day: 'Fri', plays: 280 },
    { day: 'Sat', plays: 200 },
    { day: 'Sun', plays: 150 }
  ]

  const completionData = [
    { name: '0-25%', value: 8, fill: '#ef4444' },
    { name: '25-50%', value: 12, fill: '#f97316' },
    { name: '50-75%', value: 25, fill: '#eab308' },
    { name: '75-100%', value: 55, fill: '#22c55e' }
  ]

  const engagementByTime = [
    { time: '00:00', comments: 5, likes: 12 },
    { time: '05:00', comments: 8, likes: 18 },
    { time: '10:00', comments: 14, likes: 28 },
    { time: '15:00', comments: 11, likes: 22 },
    { time: '20:00', comments: 16, likes: 35 },
    { time: '25:00', comments: 9, likes: 20 }
  ]

  const StatCard = ({ icon: Icon, label, value, trend, color }) => (
    <div className={`${cardBg} border ${borderClass} rounded-2xl p-6 backdrop-blur-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${secondaryText} mb-1`}>{label}</p>
          <p className={`text-3xl font-bold ${textClass}`}>{value}</p>
          {trend && (
            <p className={`text-xs mt-2 flex items-center gap-1 ${trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              <TrendingUp size={14} /> {Math.abs(trend)}% {trend > 0 ? 'up' : 'down'} from last episode
            </p>
          )}
        </div>
        <div className={`p-4 rounded-xl ${color} shadow-lg`}>
          <Icon size={28} className="text-white" />
        </div>
      </div>
    </div>
  )

  return (
    <div className={`${bgClass} min-h-screen transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className={`p-2 rounded-lg hover:${isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'} transition-colors`}
          >
            <ArrowLeft size={24} className={textClass} />
          </button>
          <div>
            <h1 className={`text-3xl font-bold ${textClass}`}>{selectedEpisode.title}</h1>
            <p className={`${secondaryText} mt-1 flex items-center gap-2`}>
              <Calendar size={16} />
              {selectedEpisode.publishDate}
            </p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Eye}
            label="Total Plays"
            value={analytics.plays?.toLocaleString() || '0'}
            trend={12}
            color="bg-blue-500"
          />
          <StatCard
            icon={Heart}
            label="Completion Rate"
            value={`${analytics.completionRate || 0}%`}
            trend={5}
            color="bg-green-500"
          />
          <StatCard
            icon={Users}
            label="New Subscribers"
            value={`+${analytics.newSubscribers?.toLocaleString() || 0}`}
            trend={8}
            color="bg-purple-500"
          />
          <StatCard
            icon={MessageCircle}
            label="Total Comments"
            value={analytics.comments?.toLocaleString() || '0'}
            trend={15}
            color="bg-orange-500"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Plays Over Time */}
          <div className={`${cardBg} border ${borderClass} rounded-2xl p-6 backdrop-blur-lg`}>
            <h2 className={`text-lg font-bold ${textClass} mb-4 flex items-center gap-2`}>
              <TrendingUp size={20} /> Plays Over Time
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={playsOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkTheme ? '#374151' : '#e5e7eb'} />
                <XAxis stroke={isDarkTheme ? '#9ca3af' : '#6b7280'} />
                <YAxis stroke={isDarkTheme ? '#9ca3af' : '#6b7280'} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkTheme ? '#1f2937' : '#ffffff',
                    border: `1px solid ${isDarkTheme ? '#374151' : '#e5e7eb'}`,
                    color: isDarkTheme ? '#f3f4f6' : '#111827'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="plays"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Completion Funnel */}
          <div className={`${cardBg} border ${borderClass} rounded-2xl p-6 backdrop-blur-lg`}>
            <h2 className={`text-lg font-bold ${textClass} mb-4 flex items-center gap-2`}>
              <Clock size={20} /> Listener Completion Breakdown
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={completionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {completionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkTheme ? '#1f2937' : '#ffffff',
                    border: `1px solid ${isDarkTheme ? '#374151' : '#e5e7eb'}`,
                    color: isDarkTheme ? '#f3f4f6' : '#111827'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Timeline */}
        <div className={`${cardBg} border ${borderClass} rounded-2xl p-6 mb-8 backdrop-blur-lg`}>
          <h2 className={`text-lg font-bold ${textClass} mb-4 flex items-center gap-2`}>
            <Share2 size={20} /> Engagement by Episode Timestamp
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={engagementByTime}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkTheme ? '#374151' : '#e5e7eb'} />
              <XAxis stroke={isDarkTheme ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={isDarkTheme ? '#9ca3af' : '#6b7280'} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkTheme ? '#1f2937' : '#ffffff',
                  border: `1px solid ${isDarkTheme ? '#374151' : '#e5e7eb'}`,
                  color: isDarkTheme ? '#f3f4f6' : '#111827'
                }}
              />
              <Legend />
              <Bar dataKey="comments" fill="#f97316" radius={[8, 8, 0, 0]} />
              <Bar dataKey="likes" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`${cardBg} border ${borderClass} rounded-2xl p-6 backdrop-blur-lg`}>
            <h3 className={`font-bold ${textClass} mb-4`}>📊 Average Session Duration</h3>
            <p className={`text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2`}>18:45</p>
            <p className={`${secondaryText} text-sm`}>Average minutes per listener</p>
          </div>

          <div className={`${cardBg} border ${borderClass} rounded-2xl p-6 backdrop-blur-lg`}>
            <h3 className={`font-bold ${textClass} mb-4`}>🌍 Top Devices</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${secondaryText}`}>Mobile</span>
                <span className={`font-bold ${textClass}`}>58%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${secondaryText}`}>Desktop</span>
                <span className={`font-bold ${textClass}`}>35%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${secondaryText}`}>Tablet</span>
                <span className={`font-bold ${textClass}`}>7%</span>
              </div>
            </div>
          </div>

          <div className={`${cardBg} border ${borderClass} rounded-2xl p-6 backdrop-blur-lg`}>
            <h3 className={`font-bold ${textClass} mb-4`}>👥 Audience Retention</h3>
            <p className={`text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-2`}>{analytics.completionRate || 0}%</p>
            <p className={`${secondaryText} text-sm`}>Of listeners completed the episode</p>
          </div>
        </div>
      </div>
    </div>
  )
}
