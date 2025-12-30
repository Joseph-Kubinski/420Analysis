import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Line, Legend, ComposedChart, Area } from 'recharts';
import { Calendar, Users, Plane, Package, Clock, Database, Settings, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Upload, AlertTriangle, TrendingUp, Filter, Activity, GripVertical } from 'lucide-react';

// ============================================================================
// COLOR THEMES
// ============================================================================

const THEMES = {
  // Digital Display Themes
  darkOps: {
    name: 'Dark Ops',
    type: 'digital',
    bg: 'from-slate-950 via-slate-900 to-slate-950',
    headerBg: 'bg-slate-900/90',
    cardBg: 'bg-slate-800/80',
    cardBgAlt: 'bg-slate-800/40',
    border: 'border-slate-700/50',
    borderAccent: 'border-amber-500/30',
    text: 'text-slate-100',
    textMuted: 'text-slate-400',
    textDim: 'text-slate-500',
    accent: 'amber',
    accentColor: '#f59e0b',
    actualLine: '#f59e0b',
    desiredLine: '#22c55e',
    eventBarPast: 'rgba(217, 70, 239, 0.7)',
    eventBarFuture: 'rgba(139, 92, 246, 0.7)',
    deficitFill: 'rgba(239, 68, 68, 0.15)',
    chartBg: '#1e293b',
    chartGrid: '#334155',
    chartText: '#94a3b8',
  },
  cyberBlue: {
    name: 'Cyber Blue',
    type: 'digital',
    bg: 'from-gray-950 via-blue-950 to-gray-950',
    headerBg: 'bg-blue-950/90',
    cardBg: 'bg-blue-900/40',
    cardBgAlt: 'bg-blue-900/20',
    border: 'border-blue-700/40',
    borderAccent: 'border-cyan-500/40',
    text: 'text-blue-50',
    textMuted: 'text-blue-300',
    textDim: 'text-blue-400',
    accent: 'cyan',
    accentColor: '#06b6d4',
    actualLine: '#06b6d4',
    desiredLine: '#34d399',
    eventBarPast: 'rgba(56, 189, 248, 0.7)',
    eventBarFuture: 'rgba(99, 102, 241, 0.7)',
    deficitFill: 'rgba(239, 68, 68, 0.2)',
    chartBg: '#172554',
    chartGrid: '#1e3a5f',
    chartText: '#93c5fd',
  },
  militaryGreen: {
    name: 'Military Green',
    type: 'digital',
    bg: 'from-gray-950 via-emerald-950 to-gray-950',
    headerBg: 'bg-emerald-950/90',
    cardBg: 'bg-emerald-900/40',
    cardBgAlt: 'bg-emerald-900/20',
    border: 'border-emerald-700/40',
    borderAccent: 'border-lime-500/40',
    text: 'text-emerald-50',
    textMuted: 'text-emerald-300',
    textDim: 'text-emerald-400',
    accent: 'lime',
    accentColor: '#84cc16',
    actualLine: '#84cc16',
    desiredLine: '#fbbf24',
    eventBarPast: 'rgba(34, 197, 94, 0.7)',
    eventBarFuture: 'rgba(132, 204, 22, 0.5)',
    deficitFill: 'rgba(239, 68, 68, 0.2)',
    chartBg: '#022c22',
    chartGrid: '#064e3b',
    chartText: '#6ee7b7',
  },
  // Print-Friendly Themes
  printLight: {
    name: 'Print Light',
    type: 'print',
    bg: 'from-gray-100 via-white to-gray-100',
    headerBg: 'bg-white/95',
    cardBg: 'bg-white',
    cardBgAlt: 'bg-gray-50',
    border: 'border-gray-300',
    borderAccent: 'border-blue-500',
    text: 'text-gray-900',
    textMuted: 'text-gray-600',
    textDim: 'text-gray-500',
    accent: 'blue',
    accentColor: '#2563eb',
    actualLine: '#2563eb',
    desiredLine: '#16a34a',
    eventBarPast: 'rgba(37, 99, 235, 0.8)',
    eventBarFuture: 'rgba(147, 51, 234, 0.6)',
    deficitFill: 'rgba(239, 68, 68, 0.15)',
    chartBg: '#ffffff',
    chartGrid: '#e5e7eb',
    chartText: '#374151',
  },
  printSepia: {
    name: 'Print Sepia',
    type: 'print',
    bg: 'from-orange-50 via-amber-50 to-orange-50',
    headerBg: 'bg-amber-50/95',
    cardBg: 'bg-white',
    cardBgAlt: 'bg-orange-50',
    border: 'border-amber-300',
    borderAccent: 'border-orange-500',
    text: 'text-amber-950',
    textMuted: 'text-amber-800',
    textDim: 'text-amber-600',
    accent: 'orange',
    accentColor: '#ea580c',
    actualLine: '#ea580c',
    desiredLine: '#15803d',
    eventBarPast: 'rgba(180, 83, 9, 0.7)',
    eventBarFuture: 'rgba(217, 119, 6, 0.5)',
    deficitFill: 'rgba(220, 38, 38, 0.12)',
    chartBg: '#fffbeb',
    chartGrid: '#fde68a',
    chartText: '#78350f',
  },
  printHighContrast: {
    name: 'High Contrast',
    type: 'print',
    bg: 'from-white via-white to-gray-50',
    headerBg: 'bg-gray-900',
    cardBg: 'bg-white',
    cardBgAlt: 'bg-gray-100',
    border: 'border-gray-900',
    borderAccent: 'border-black',
    text: 'text-black',
    textMuted: 'text-gray-700',
    textDim: 'text-gray-600',
    accent: 'gray',
    accentColor: '#000000',
    actualLine: '#000000',
    desiredLine: '#166534',
    eventBarPast: 'rgba(0, 0, 0, 0.8)',
    eventBarFuture: 'rgba(75, 85, 99, 0.6)',
    deficitFill: 'rgba(127, 29, 29, 0.2)',
    chartBg: '#ffffff',
    chartGrid: '#d1d5db',
    chartText: '#111827',
    headerText: 'text-white',
  },
};

// Theme selector component
const ThemeSelector = ({ currentTheme, onThemeChange }) => {
  const digitalThemes = Object.entries(THEMES).filter(([_, t]) => t.type === 'digital');
  const printThemes = Object.entries(THEMES).filter(([_, t]) => t.type === 'print');
  
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-slate-400 mr-1">Digital:</span>
        {digitalThemes.map(([key, theme]) => (
          <button
            key={key}
            onClick={() => onThemeChange(key)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              currentTheme === key
                ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25'
                : 'bg-slate-700/60 text-slate-300 hover:bg-slate-600/60 hover:text-white'
            }`}
            title={theme.name}
          >
            {theme.name}
          </button>
        ))}
      </div>
      <div className="w-px h-6 bg-slate-600" />
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-slate-400 mr-1">Print:</span>
        {printThemes.map(([key, theme]) => (
          <button
            key={key}
            onClick={() => onThemeChange(key)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              currentTheme === key
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                : 'bg-slate-700/60 text-slate-300 hover:bg-slate-600/60 hover:text-white'
            }`}
            title={theme.name}
          >
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// DATA FROM EXCEL SPREADSHEET: MsnWorkload_Test_Data.xlsx
// ============================================================================

// Sheet 1: Tasks - Mission events data
const TASKS_DATA = [
  { id: 1, name: 'POTUS visit – Air Force One 2014 NATO Summit', startDate: '2014-09-03', endDate: '2014-09-03', pax: null, sorties: null, shortTons: null },
  { id: 2, name: 'BTF 19 – B-52 Stratofortress deployment', startDate: '2019-03-14', endDate: '2019-04-06', pax: 205, sorties: 46, shortTons: 11.5 },
  { id: 3, name: 'Royal International Air Tattoo 2019', startDate: '2019-07-19', endDate: '2019-07-21', pax: null, sorties: null, shortTons: null },
  { id: 4, name: 'BTF 19 – B-2 Spirit deployment', startDate: '2019-08-27', endDate: '2019-09-19', pax: 246, sorties: 46, shortTons: 11.5 },
  { id: 5, name: 'BTF 20-1 – B-52 deployment', startDate: '2019-10-10', endDate: '2019-11-12', pax: 268, sorties: 66, shortTons: 16.5 },
  { id: 6, name: 'BTF 20-2 – B-2 Spirit deployment', startDate: '2020-03-12', endDate: '2020-03-20', pax: 179, sorties: 16, shortTons: 4 },
  { id: 7, name: 'BTF 20-4 – B-52 deployment', startDate: '2020-08-22', endDate: '2020-09-26', pax: 252, sorties: 70, shortTons: 17.5 },
  { id: 8, name: 'Exercise Baltic Trident (ACE)', startDate: '2021-03-15', endDate: '2021-03-19', pax: 196, sorties: 8, shortTons: 2 },
  { id: 9, name: 'Exercise High Life (ACE)', startDate: '2021-09-13', endDate: '2021-09-16', pax: 254, sorties: 6, shortTons: 1.5 },
  { id: 10, name: 'BTF 22-1 – B-1 Lancer deployment', startDate: '2021-10-06', endDate: '2021-11-15', pax: 257, sorties: 80, shortTons: 20 },
  { id: 11, name: '352nd SOW ACE exercise', startDate: '2022-01-08', endDate: '2022-01-12', pax: null, sorties: null, shortTons: null },
  { id: 12, name: 'BTF 22-2 – B-52 deployment', startDate: '2022-02-10', endDate: '2022-04-19', pax: 239, sorties: 138, shortTons: 34.5 },
  { id: 13, name: 'RIAT 2022 – E-4B NAOC', startDate: '2022-07-15', endDate: '2022-07-17', pax: null, sorties: null, shortTons: null },
  { id: 14, name: 'BTF 22-3 – B-52 deployment', startDate: '2022-08-18', endDate: '2022-09-21', pax: 278, sorties: 68, shortTons: 17 },
  { id: 15, name: 'BTF 23-3 – B-1 Lancer deployment', startDate: '2023-05-23', endDate: '2023-06-27', pax: 235, sorties: 70, shortTons: 17.5 },
  { id: 16, name: 'Royal International Air Tattoo 2023', startDate: '2023-07-14', endDate: '2023-07-16', pax: null, sorties: null, shortTons: null },
  { id: 17, name: 'BTF 23-4 – B-2 Spirit to Keflavik', startDate: '2023-08-13', endDate: '2023-09-14', pax: 208, sorties: 64, shortTons: 16 },
  { id: 18, name: 'B-2 hot-pit refuel Norway', startDate: '2023-08-29', endDate: '2023-08-29', pax: null, sorties: null, shortTons: null },
  { id: 19, name: 'BTF 24-1 – B-1 Lancer deployment', startDate: '2023-10-12', endDate: '2023-11-15', pax: 237, sorties: 70, shortTons: 17.5 },
  { id: 20, name: 'BTF 24-2 – B-1 to Sweden', startDate: '2024-02-23', endDate: '2024-03-01', pax: 150, sorties: 14, shortTons: 3.5 },
  { id: 21, name: 'BTF 24-3 – B-52 deployment', startDate: '2024-05-20', endDate: '2024-06-20', pax: 281, sorties: 64, shortTons: 16 },
  { id: 22, name: 'B-52 Farnborough Air Show', startDate: '2024-06-13', endDate: '2024-06-13', pax: null, sorties: null, shortTons: null },
  { id: 23, name: 'Royal International Air Tattoo 2024', startDate: '2024-07-19', endDate: '2024-07-21', pax: null, sorties: null, shortTons: null },
  { id: 24, name: 'BTF 24-4 – B-52 to Romania', startDate: '2024-07-21', endDate: '2024-07-27', pax: 175, sorties: 14, shortTons: 3.5 },
  { id: 25, name: 'RQ-4B Global Hawk deployment', startDate: '2024-08-22', endDate: '2024-08-24', pax: null, sorties: null, shortTons: null },
  { id: 26, name: 'BTF 25-1 – B-52 deployment', startDate: '2024-11-04', endDate: '2024-12-12', pax: 243, sorties: 76, shortTons: 19 },
  { id: 27, name: 'BTF 25-2 – B-52 deployment', startDate: '2025-02-11', endDate: '2025-02-17', pax: 159, sorties: 14, shortTons: 3.5 },
  { id: 28, name: 'Ramstein Flag 2025', startDate: '2025-03-26', endDate: '2025-04-11', pax: 89, sorties: 34, shortTons: 8.5 },
  { id: 29, name: '352nd SOW training', startDate: '2025-05-07', endDate: '2025-05-07', pax: null, sorties: null, shortTons: null },
  { id: 30, name: 'Royal International Air Tattoo 2025', startDate: '2025-07-18', endDate: '2025-07-20', pax: null, sorties: null, shortTons: null },
  { id: 31, name: 'VP JD Vance troop engagement', startDate: '2025-08-13', endDate: '2025-08-13', pax: null, sorties: null, shortTons: null },
  { id: 32, name: 'Exercise Cobra Warrior 25.2 – C-5M', startDate: '2025-09-10', endDate: '2025-09-10', pax: null, sorties: null, shortTons: null },
  { id: 33, name: 'Exercise Cobra Warrior 25-2', startDate: '2025-09-12', endDate: '2025-10-02', pax: 118, sorties: 42, shortTons: 10.5 },
  { id: 34, name: 'C-32 Presidential visit (Trump)', startDate: '2025-09-16', endDate: '2025-09-16', pax: null, sorties: null, shortTons: null },
];

// Sheet 2: Manpower over time (Actual = current, SATAF = desired)
const MANPOWER_DATA = [
  { date: '2019-01-01', actual: 10, sataf: 10, event: 'Year Start' },
  { date: '2019-06-01', actual: 10, sataf: 58, event: 'Summer VML' },
  { date: '2020-01-01', actual: 10, sataf: 58, event: 'Year Start' },
  { date: '2021-01-01', actual: 10, sataf: 58, event: 'Year Start' },
  { date: '2021-09-13', actual: 12, sataf: 58, event: 'High Life' },
  { date: '2022-01-01', actual: 12, sataf: 58, event: 'Year Start' },
  { date: '2022-08-18', actual: 20, sataf: 58, event: 'BTF 22-3' },
  { date: '2022-10-01', actual: 37, sataf: 58, event: 'EABS Rotation' },
  { date: '2023-01-01', actual: 37, sataf: 58, event: 'Year Start' },
  { date: '2023-08-13', actual: 50, sataf: 58, event: 'BTF 23-4' },
  { date: '2024-01-01', actual: 75, sataf: 120, event: 'Year Start' },
  { date: '2025-01-01', actual: 75, sataf: 120, event: 'Year Start' },
  { date: '2025-10-01', actual: 37, sataf: 120, event: 'EABS Rotation' },
];

// Sheet 3: Teams (summarized)
const TEAMS_DATA = [
  { team: 'Leadership', filled: 15, total: 15 },
  { team: 'Operations', filled: 12, total: 13 },
  { team: 'Weather Flight', filled: 5, total: 6 },
  { team: 'Logistics Readiness', filled: 54, total: 55 },
  { team: 'Expeditionary ABS', filled: 38, total: 38 },
];

const DATABASE_CONFIG = {
  connections: [
    { id: 'excel', name: 'MsnWorkload_Test_Data.xlsx', type: 'file', status: 'active', icon: '📊' },
    { id: 'sql', name: 'SQL Server', type: 'database', status: 'disconnected', icon: '🗄️' },
    { id: 'api', name: 'REST API', type: 'api', status: 'disconnected', icon: '🔌' },
  ]
};

// Utility functions
const daysBetween = (start, end) => {
  const diff = Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24));
  return Math.max(diff, 1);
};

const parseDate = (dateStr) => new Date(dateStr);
const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });

const getManpowerAtDate = (date, manpowerData) => {
  const targetDate = new Date(date);
  let result = { actual: 10, sataf: 58 };
  for (const record of manpowerData) {
    if (new Date(record.date) <= targetDate) {
      result = { actual: record.actual, sataf: record.sataf };
    } else break;
  }
  return result;
};

const calculateConcurrentDays = (event, allEvents) => {
  const eventStart = new Date(event.startDate);
  const eventEnd = new Date(event.endDate);
  let totalConcurrentDays = 0;
  
  for (const other of allEvents) {
    if (other.id === event.id) continue;
    const otherStart = new Date(other.startDate);
    const otherEnd = new Date(other.endDate);
    const overlapStart = new Date(Math.max(eventStart, otherStart));
    const overlapEnd = new Date(Math.min(eventEnd, otherEnd));
    if (overlapStart <= overlapEnd) {
      totalConcurrentDays += Math.ceil((overlapEnd - overlapStart) / (1000 * 60 * 60 * 24)) + 1;
    }
  }
  return totalConcurrentDays;
};

// Components
const ManpowerCard = ({ title, actual, desired, isAggregate = false, subtitle = null, theme }) => {
  const deficit = desired - actual;
  const percentage = Math.round((actual / desired) * 100);
  const isWarning = percentage < 70;
  const isCritical = percentage < 50;
  
  return (
    <div className={`relative overflow-hidden rounded-lg p-3 h-full ${isAggregate ? `bg-gradient-to-br ${theme?.bg || 'from-slate-800 via-slate-900 to-black'} border-2 ${theme?.borderAccent || 'border-amber-500/50'}` : `${theme?.cardBg || 'bg-slate-800/80'} border ${theme?.border || 'border-slate-700/50'}`} ${isCritical ? 'ring-2 ring-red-500/50' : isWarning ? 'ring-1 ring-amber-500/30' : ''}`}>
      <div className="flex items-center gap-1.5 mb-2">
        <Users className={`w-3 h-3 ${isCritical ? 'text-red-400' : isWarning ? 'text-amber-400' : 'text-emerald-400'}`} />
        <span className={`text-[10px] uppercase tracking-wider ${theme?.textMuted || 'text-slate-400'} font-medium truncate`}>{title}</span>
      </div>
      {subtitle && <div className={`text-[10px] ${theme?.textDim || 'text-slate-500'} mb-1`}>{subtitle}</div>}
      <div className="flex items-baseline gap-0.5">
        <span className={`text-2xl font-bold tracking-tight ${isCritical ? 'text-red-400' : isWarning ? 'text-amber-400' : theme?.text || 'text-slate-100'}`}>{actual}</span>
        <span className={`${theme?.textDim || 'text-slate-500'} text-lg`}>/</span>
        <span className={`text-lg ${theme?.textMuted || 'text-slate-400'}`}>{desired}</span>
      </div>
      <div className={`mt-2 h-1 ${theme?.type === 'print' ? 'bg-gray-300' : 'bg-slate-700'} rounded-full overflow-hidden`}>
        <div className={`h-full rounded-full transition-all duration-500 ${isCritical ? 'bg-gradient-to-r from-red-600 to-red-400' : isWarning ? 'bg-gradient-to-r from-amber-600 to-amber-400' : 'bg-gradient-to-r from-emerald-600 to-emerald-400'}`} style={{ width: `${Math.min(percentage, 100)}%` }} />
      </div>
      <div className="flex justify-between items-center mt-1">
        <span className={`text-[10px] ${theme?.textDim || 'text-slate-500'}`}>{percentage}%</span>
        <span className={`text-[10px] font-medium ${isCritical ? 'text-red-400' : isWarning ? 'text-amber-400' : theme?.textDim || 'text-slate-500'}`}>{deficit > 0 ? `-${deficit}` : 'Full'}</span>
      </div>
    </div>
  );
};

// Compact stats card for event counts
const StatsCard = ({ title, value, subtitle, icon: Icon, iconColor, theme }) => {
  return (
    <div className={`relative overflow-hidden rounded-lg p-3 h-full ${theme?.cardBg || 'bg-slate-800/80'} border ${theme?.border || 'border-slate-700/50'}`}>
      <div className="flex items-center gap-1.5 mb-2">
        <Icon className="w-3 h-3" style={{ color: iconColor }} />
        <span className={`text-[10px] uppercase tracking-wider ${theme?.textMuted || 'text-slate-400'} font-medium truncate`}>{title}</span>
      </div>
      <div className="flex items-baseline gap-0.5">
        <span className={`text-2xl font-bold tracking-tight ${theme?.text || 'text-slate-100'}`}>{value}</span>
      </div>
      {subtitle && <div className={`text-[10px] ${theme?.textDim || 'text-slate-500'} mt-1`}>{subtitle}</div>}
    </div>
  );
};

// Draggable wrapper for stats cards
const DraggableStatsCard = ({ id, children, onMoveLeft, onMoveRight, isFirst, isLast, theme }) => {
  const [showControls, setShowControls] = useState(false);
  
  return (
    <div 
      className="relative group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {children}
      {showControls && (
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex gap-0.5 z-10">
          <button 
            onClick={onMoveLeft}
            disabled={isFirst}
            className={`p-0.5 rounded ${isFirst ? 'opacity-30 cursor-not-allowed' : 'bg-slate-700/90 hover:bg-slate-600'}`}
            title="Move left"
          >
            <ChevronLeft className="w-3 h-3 text-white" />
          </button>
          <button 
            onClick={onMoveRight}
            disabled={isLast}
            className={`p-0.5 rounded ${isLast ? 'opacity-30 cursor-not-allowed' : 'bg-slate-700/90 hover:bg-slate-600'}`}
            title="Move right"
          >
            <ChevronRight className="w-3 h-3 text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

// Cargo Unload Input Card
const CargoUnloadCard = ({ values, onChange, theme }) => {
  return (
    <div className={`relative overflow-hidden rounded-lg p-3 h-full ${theme?.cardBg || 'bg-slate-800/80'} border ${theme?.borderAccent || 'border-amber-500/50'}`}>
      <div className="flex items-center gap-1.5 mb-2">
        <Package className="w-3 h-3 text-amber-500" />
        <span className={`text-[10px] uppercase tracking-wider ${theme?.textMuted || 'text-slate-400'} font-bold`}>Cargo Unload</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        <div>
          <label className={`text-[8px] ${theme?.textDim || 'text-slate-500'} uppercase block mb-0.5`}>2T2</label>
          <input 
            type="number" 
            value={values.t2t2} 
            onChange={(e) => onChange('t2t2', e.target.value)}
            className={`w-full px-1.5 py-1 text-xs ${theme?.cardBgAlt || 'bg-slate-900'} border ${theme?.border || 'border-slate-600'} rounded ${theme?.text || 'text-white'} focus:outline-none focus:ring-1 focus:ring-amber-500/50`}
            placeholder="0"
          />
        </div>
        <div>
          <label className={`text-[8px] ${theme?.textDim || 'text-slate-500'} uppercase block mb-0.5`}>Gnd Trans</label>
          <input 
            type="number" 
            value={values.groundTrans} 
            onChange={(e) => onChange('groundTrans', e.target.value)}
            className={`w-full px-1.5 py-1 text-xs ${theme?.cardBgAlt || 'bg-slate-900'} border ${theme?.border || 'border-slate-600'} rounded ${theme?.text || 'text-white'} focus:outline-none focus:ring-1 focus:ring-amber-500/50`}
            placeholder="0"
          />
        </div>
        <div>
          <label className={`text-[8px] ${theme?.textDim || 'text-slate-500'} uppercase block mb-0.5`}>Log Plan</label>
          <input 
            type="number" 
            value={values.logPlanner} 
            onChange={(e) => onChange('logPlanner', e.target.value)}
            className={`w-full px-1.5 py-1 text-xs ${theme?.cardBgAlt || 'bg-slate-900'} border ${theme?.border || 'border-slate-600'} rounded ${theme?.text || 'text-white'} focus:outline-none focus:ring-1 focus:ring-amber-500/50`}
            placeholder="0"
          />
        </div>
        <div>
          <label className={`text-[8px] ${theme?.textDim || 'text-slate-500'} uppercase block mb-0.5`}>Log Sup</label>
          <input 
            type="number" 
            value={values.logSup} 
            onChange={(e) => onChange('logSup', e.target.value)}
            className={`w-full px-1.5 py-1 text-xs ${theme?.cardBgAlt || 'bg-slate-900'} border ${theme?.border || 'border-slate-600'} rounded ${theme?.text || 'text-white'} focus:outline-none focus:ring-1 focus:ring-amber-500/50`}
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
};

const DatePresets = ({ onSelect, activePreset, theme }) => {
  const presets = [
    { id: '1m', label: '1M', months: 1 }, { id: '3m', label: '3M', months: 3 },
    { id: '6m', label: '6M', months: 6 }, { id: '1y', label: '1Y', months: 12 },
    { id: '2y', label: '2Y', months: 24 }, { id: '3y', label: '3Y', months: 36 },
    { id: '4y', label: '4Y', months: 48 }, { id: '5y', label: '5Y', months: 60 },
    { id: '6y', label: '6Y', months: 72 }, { id: 'all', label: 'ALL', months: 120 },
  ];
  return (
    <div className="flex gap-1 flex-wrap">
      {presets.map(preset => (
        <button key={preset.id} onClick={() => onSelect(preset)}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${activePreset === preset.id 
            ? `bg-${theme?.accent || 'amber'}-500 text-${theme?.type === 'print' ? 'white' : 'black'}` 
            : `${theme?.cardBg || 'bg-slate-700/50'} ${theme?.textMuted || 'text-slate-400'} hover:opacity-80`}`}
          style={activePreset === preset.id ? { backgroundColor: theme?.accentColor } : {}}>
          {preset.label}
        </button>
      ))}
    </div>
  );
};

const FormulaModule = ({ formula, onFormulaChange, variables, theme }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');

  const handleChange = (e) => {
    onFormulaChange(e.target.value);
    setSaveStatus('Saving...');
    setTimeout(() => setSaveStatus('✓ Saved'), 300);
    setTimeout(() => setSaveStatus(''), 2000);
  };

  return (
    <div className={`${theme?.cardBg || 'bg-slate-800/60'} rounded-xl border ${theme?.border || 'border-slate-700/50'} overflow-hidden`}>
      <button onClick={() => setIsExpanded(!isExpanded)} className={`w-full flex items-center justify-between p-4 hover:opacity-80 transition-colors`}>
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4" style={{ color: theme?.accentColor || '#f59e0b' }} />
          <span className={`text-sm font-medium ${theme?.text || 'text-slate-200'}`}>Y-Axis Formula</span>
          {saveStatus && <span className="text-xs text-emerald-400 ml-2">{saveStatus}</span>}
        </div>
        <ChevronDown className={`w-4 h-4 ${theme?.textMuted || 'text-slate-400'} transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4">
          <input type="text" value={formula} onChange={handleChange}
            className={`w-full ${theme?.cardBgAlt || 'bg-slate-900/80'} border ${theme?.border || 'border-slate-600'} rounded-lg px-4 py-3 text-sm ${theme?.text || 'text-slate-200'} font-mono focus:outline-none focus:ring-2`}
            style={{ '--tw-ring-color': theme?.accentColor }} />
          <div className="space-y-2">
            <span className={`text-xs ${theme?.textDim || 'text-slate-500'} uppercase tracking-wider`}>Variables</span>
            <div className="grid grid-cols-1 gap-1">
              {variables.map(v => (
                <div key={v.name} className={`flex items-center gap-2 px-2 py-1 ${theme?.cardBgAlt || 'bg-slate-900/50'} rounded text-xs`}>
                  <code style={{ color: theme?.accentColor || '#f59e0b' }} className="font-mono">{v.name}</code>
                  <span className={theme?.textDim || 'text-slate-500'}>- {v.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DatabasePanel = ({ connections, theme }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className={`${theme?.cardBg || 'bg-slate-800/60'} rounded-xl border ${theme?.border || 'border-slate-700/50'} overflow-hidden`}>
      <button onClick={() => setIsExpanded(!isExpanded)} className="w-full flex items-center justify-between p-4 hover:opacity-80 transition-colors">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-cyan-500" />
          <span className={`text-sm font-medium ${theme?.text || 'text-slate-200'}`}>Data Sources</span>
        </div>
        <ChevronDown className={`w-4 h-4 ${theme?.textMuted || 'text-slate-400'} transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 space-y-3">
          {connections.map(conn => (
            <div key={conn.id} className={`flex items-center justify-between p-3 ${theme?.cardBgAlt || 'bg-slate-900/50'} rounded-lg border ${theme?.border || 'border-slate-700/30'}`}>
              <div className="flex items-center gap-3">
                <span className="text-lg">{conn.icon}</span>
                <div><div className={`text-sm ${theme?.text || 'text-slate-200'}`}>{conn.name}</div><div className={`text-xs ${theme?.textDim || 'text-slate-500'}`}>{conn.type}</div></div>
              </div>
              <div className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs ${conn.status === 'active' ? 'bg-emerald-500/20 text-emerald-500' : `${theme?.cardBgAlt || 'bg-slate-700/50'} ${theme?.textDim || 'text-slate-500'}`}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${conn.status === 'active' ? 'bg-emerald-500' : 'bg-gray-500'}`} />
                {conn.status}
              </div>
            </div>
          ))}
          <button className={`w-full flex items-center justify-center gap-2 py-2 border-2 border-dashed ${theme?.border || 'border-slate-600'} rounded-lg ${theme?.textMuted || 'text-slate-400'} hover:opacity-80 transition-colors text-sm`}>
            <Upload className="w-4 h-4" />Import Excel Data
          </button>
        </div>
      )}
    </div>
  );
};

// Chart Card wrapper with reorder controls
const ChartCard = ({ id, title, subtitle, icon: Icon, iconColor, children, theme, onMoveUp, onMoveDown, isFirst, isLast, borderAccent }) => {
  return (
    <div className={`${theme?.cardBgAlt || 'bg-slate-800/40'} rounded-xl border ${borderAccent ? theme?.borderAccent : theme?.border} overflow-hidden`}>
      <div className={`p-4 border-b ${theme?.border} flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5" style={{ color: iconColor || theme?.accentColor }} />
          <h3 className={`font-semibold ${theme?.text}`}>{title}</h3>
          {subtitle && <span className={`text-xs ${theme?.textDim} ml-2`}>{subtitle}</span>}
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={onMoveUp} 
            disabled={isFirst}
            className={`p-1.5 rounded-md transition-colors ${isFirst ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-700/50'}`}
            title="Move up"
          >
            <ChevronUp className={`w-4 h-4 ${theme?.textMuted}`} />
          </button>
          <button 
            onClick={onMoveDown}
            disabled={isLast}
            className={`p-1.5 rounded-md transition-colors ${isLast ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-700/50'}`}
            title="Move down"
          >
            <ChevronDown className={`w-4 h-4 ${theme?.textMuted}`} />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};

// Custom dot renderers for quarterly markers
const QuarterlyCircleDot = (props) => {
  const { cx, cy, payload, stroke } = props;
  if (!cx || !cy || !payload?.showMarker) return null;
  return <circle cx={cx} cy={cy} r={5} fill={stroke} stroke="#fff" strokeWidth={1.5} />;
};

const QuarterlyDiamondDot = (props) => {
  const { cx, cy, payload, stroke } = props;
  if (!cx || !cy || !payload?.showMarker) return null;
  const size = 6;
  return (
    <polygon 
      points={`${cx},${cy - size} ${cx + size},${cy} ${cx},${cy + size} ${cx - size},${cy}`}
      fill={stroke}
      stroke="#fff"
      strokeWidth={1.5}
    />
  );
};

const EventBar = ({ event, startDate, endDate, yValue, maxYValue, theme }) => {
  const eventStart = parseDate(event.startDate);
  const eventEnd = parseDate(event.endDate);
  const rangeStart = parseDate(startDate);
  const rangeEnd = parseDate(endDate);
  const leftPercent = Math.max(0, ((eventStart - rangeStart) / (rangeEnd - rangeStart)) * 100);
  const rightPercent = Math.min(100, ((eventEnd - rangeStart) / (rangeEnd - rangeStart)) * 100);
  const width = rightPercent - leftPercent;
  if (width <= 0) return null;
  const duration = daysBetween(event.startDate, event.endDate);
  const isFuture = eventStart > new Date();
  const barColor = isFuture ? (theme?.eventBarFuture || 'rgba(139,92,246,0.7)') : (theme?.eventBarPast || 'rgba(217,70,239,0.7)');
  
  return (
    <div className="absolute h-full rounded-sm group cursor-pointer transition-all hover:z-50 hover:brightness-125 hover:shadow-lg"
      style={{ left: `${leftPercent}%`, width: `${Math.max(width, 0.5)}%`, backgroundColor: barColor, border: `1px solid ${theme?.type === 'print' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.2)'}` }}>
      <div className="absolute inset-0 flex items-center px-1 overflow-hidden">
        <span className={`text-[10px] font-medium text-white truncate whitespace-nowrap`}>{event.name}</span>
      </div>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        <div className="rounded-lg p-3 shadow-xl min-w-[240px]" style={{ backgroundColor: '#fefdf8', border: '1px solid #d4d0c4', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          <div className="text-sm font-semibold mb-2" style={{ color: '#1f2937' }}>{event.name}</div>
          <div className="grid grid-cols-2 gap-2 text-xs" style={{ color: '#374151' }}>
            <div className="font-medium">Duration:</div><div>{duration} days</div>
            {event.pax && <><div className="font-medium">PAX:</div><div>{event.pax}</div></>}
            {event.sorties && <><div className="font-medium">Sorties:</div><div>{event.sorties}</div></>}
            {event.shortTons && <><div className="font-medium">Short Tons:</div><div>{event.shortTons}</div></>}
            <div className="font-medium">Concurrent Days:</div><div>{event.concurrentDays || 0}</div>
            <div className="font-medium">Y-Value:</div><div style={{ color: '#b45309', fontWeight: 600 }}>{yValue.toFixed(1)}</div>
          </div>
          {isFuture && <div className="mt-2 text-xs font-medium" style={{ color: '#6366f1' }}>📅 Future Event</div>}
        </div>
      </div>
    </div>
  );
};

// Main Component
const MissionWorkloadAnalysisTool = () => {
  const [events] = useState(TASKS_DATA);
  const [manpowerHistory] = useState(MANPOWER_DATA);
  const [teams] = useState(TEAMS_DATA);
  const [formula, setFormula] = useState('(Duration)*(ConcurrentDays)*(Deficit)');
  const [includeFuture, setIncludeFuture] = useState(true);
  const [activePreset, setActivePreset] = useState('all');
  const [customDateRange, setCustomDateRange] = useState({ start: '2019-01-01', end: '2025-12-31' });
  const [currentTheme, setCurrentTheme] = useState('darkOps');
  const [chartOrder, setChartOrder] = useState(['unified', 'manpower', 'gantt']);
  const [statsOrder, setStatsOrder] = useState(['total', 'leadership', 'operations', 'weather', 'logistics', 'eabs', 'last12mo', 'filtered']);
  const [cargoInputs, setCargoInputs] = useState({ t2t2: '', groundTrans: '', logPlanner: '', logSup: '' });
  
  const theme = THEMES[currentTheme];

  // Load saved settings from persistent storage on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const formulaResult = await window.storage.get('workload-formula');
        if (formulaResult && formulaResult.value) {
          setFormula(formulaResult.value);
        }
      } catch (error) {
        console.log('No saved formula found, using default');
      }
      try {
        const themeResult = await window.storage.get('workload-theme');
        if (themeResult && themeResult.value && THEMES[themeResult.value]) {
          setCurrentTheme(themeResult.value);
        }
      } catch (error) {
        console.log('No saved theme found, using default');
      }
      try {
        const orderResult = await window.storage.get('workload-chart-order');
        if (orderResult && orderResult.value) {
          const savedOrder = JSON.parse(orderResult.value).filter(id => id !== 'workload');
          if (savedOrder.length > 0) setChartOrder(savedOrder);
        }
      } catch (error) {
        console.log('No saved chart order found, using default');
      }
      try {
        const statsOrderResult = await window.storage.get('workload-stats-order');
        if (statsOrderResult && statsOrderResult.value) {
          setStatsOrder(JSON.parse(statsOrderResult.value));
        }
      } catch (error) {
        console.log('No saved stats order found, using default');
      }
      try {
        const cargoResult = await window.storage.get('workload-cargo-inputs');
        if (cargoResult && cargoResult.value) {
          setCargoInputs(JSON.parse(cargoResult.value));
        }
      } catch (error) {
        console.log('No saved cargo inputs found, using default');
      }
    };
    loadSettings();
  }, []);

  // Save formula to persistent storage when it changes
  const handleFormulaChange = useCallback(async (newFormula) => {
    setFormula(newFormula);
    try {
      await window.storage.set('workload-formula', newFormula);
    } catch (error) {
      console.log('Could not save formula to storage');
    }
  }, []);

  // Save theme to persistent storage when it changes
  const handleThemeChange = useCallback(async (newTheme) => {
    setCurrentTheme(newTheme);
    try {
      await window.storage.set('workload-theme', newTheme);
    } catch (error) {
      console.log('Could not save theme to storage');
    }
  }, []);

  // Move chart up or down in order
  const moveChart = useCallback(async (chartId, direction) => {
    setChartOrder(prev => {
      const index = prev.indexOf(chartId);
      if (index === -1) return prev;
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      const newOrder = [...prev];
      [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
      // Save to storage
      window.storage.set('workload-chart-order', JSON.stringify(newOrder)).catch(() => {});
      return newOrder;
    });
  }, []);

  // Move stats card left or right in order
  const moveStats = useCallback(async (statsId, direction) => {
    setStatsOrder(prev => {
      const index = prev.indexOf(statsId);
      if (index === -1) return prev;
      const newIndex = direction === 'left' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      const newOrder = [...prev];
      [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
      // Save to storage
      window.storage.set('workload-stats-order', JSON.stringify(newOrder)).catch(() => {});
      return newOrder;
    });
  }, []);

  // Handle cargo input changes
  const handleCargoChange = useCallback(async (field, value) => {
    setCargoInputs(prev => {
      const updated = { ...prev, [field]: value };
      window.storage.set('workload-cargo-inputs', JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  }, []);
  
  const currentManpower = useMemo(() => {
    const latest = manpowerHistory[manpowerHistory.length - 1];
    return { actual: latest.actual, desired: latest.sataf };
  }, [manpowerHistory]);
  
  const currentDeficit = currentManpower.desired - currentManpower.actual;
  
  const formulaVariables = [
    { name: 'Duration', desc: 'Event days' },
    { name: 'ConcurrentDays', desc: 'Overlap days' },
    { name: 'Deficit', desc: 'Personnel gap' },
    { name: 'PAX', desc: 'Personnel received' },
    { name: 'Sorties', desc: 'Flights flown' },
    { name: 'ShortTons', desc: 'Cargo weight' },
  ];
  
  const handlePresetSelect = (preset) => {
    setActivePreset(preset.id);
    const end = new Date('2025-12-31');
    const start = new Date(end);
    start.setMonth(start.getMonth() - preset.months);
    setCustomDateRange({ start: start.toISOString().split('T')[0], end: end.toISOString().split('T')[0] });
  };
  
  const filteredEvents = useMemo(() => {
    const start = parseDate(customDateRange.start);
    const end = parseDate(customDateRange.end);
    const today = new Date();
    return events.filter(event => {
      const eventStart = parseDate(event.startDate);
      const eventEnd = parseDate(event.endDate);
      const overlaps = eventStart <= end && eventEnd >= start;
      if (!includeFuture && eventStart > today) return false;
      return overlaps;
    });
  }, [events, customDateRange, includeFuture]);
  
  const calculateYValue = useCallback((event, allEvents) => {
    const duration = daysBetween(event.startDate, event.endDate);
    const concurrentDays = calculateConcurrentDays(event, allEvents);
    const manpower = getManpowerAtDate(event.startDate, manpowerHistory);
    const deficit = manpower.sataf - manpower.actual;
    const vars = { Duration: duration, ConcurrentDays: Math.max(concurrentDays, 1), Deficit: Math.max(deficit, 1),
      PAX: event.pax || 0, Sorties: event.sorties || 0, ShortTons: event.shortTons || 0 };
    try {
      let evalFormula = formula;
      Object.entries(vars).forEach(([key, value]) => { evalFormula = evalFormula.replace(new RegExp(key, 'gi'), value); });
      const result = Function('"use strict";return (' + evalFormula + ')')();
      return isNaN(result) ? 0 : result;
    } catch { return duration * Math.max(concurrentDays, 1) * Math.max(deficit, 1); }
  }, [formula, manpowerHistory]);
  
  const chartData = useMemo(() => {
    return filteredEvents.map(event => {
      const duration = daysBetween(event.startDate, event.endDate);
      const concurrentDays = calculateConcurrentDays(event, filteredEvents);
      const yValue = calculateYValue(event, filteredEvents);
      return { ...event, duration, concurrentDays, yValue };
    }).sort((a, b) => parseDate(a.startDate) - parseDate(b.startDate));
  }, [filteredEvents, calculateYValue]);
  
  const maxYValue = Math.max(...chartData.map(d => d.yValue), 1);

  // Calculate Gantt rows for stacking non-overlapping events
  const ganttRows = useMemo(() => {
    const rows = [];
    const sorted = [...chartData].sort((a, b) => parseDate(a.startDate) - parseDate(b.startDate));
    sorted.forEach(event => {
      const eventStart = parseDate(event.startDate);
      const eventEnd = parseDate(event.endDate);
      let placed = false;
      for (let i = 0; i < rows.length; i++) {
        const canFit = rows[i].every(r => parseDate(r.endDate) < eventStart || parseDate(r.startDate) > eventEnd);
        if (canFit) { rows[i].push(event); placed = true; break; }
      }
      if (!placed) rows.push([event]);
    });
    return rows;
  }, [chartData]);
  
  const manpowerChartData = useMemo(() => {
    const filtered = manpowerHistory.filter(d => {
      const date = parseDate(d.date);
      return date >= parseDate(customDateRange.start) && date <= parseDate(customDateRange.end);
    }).map(d => ({ ...d, displayDate: formatDate(d.date), deficit: d.sataf - d.actual }));
    
    // Add showMarker flag for quarterly markers
    const markedQuarters = new Set();
    return filtered.map(d => {
      const date = parseDate(d.date);
      const quarterKey = `${date.getFullYear()}-Q${Math.floor(date.getMonth() / 3)}`;
      const showMarker = !markedQuarters.has(quarterKey);
      if (showMarker) markedQuarters.add(quarterKey);
      return { ...d, showMarker };
    });
  }, [manpowerHistory, customDateRange]);

  // Unified chart data: merge manpower timeline with event data points
  const unifiedChartData = useMemo(() => {
    const dataPoints = [];
    const startRange = parseDate(customDateRange.start);
    const endRange = parseDate(customDateRange.end);
    
    // Create a set of all relevant dates (manpower changes + event start dates)
    const allDates = new Set();
    
    // Add manpower change dates
    manpowerHistory.forEach(m => {
      const d = parseDate(m.date);
      if (d >= startRange && d <= endRange) {
        allDates.add(m.date);
      }
    });
    
    // Add event start dates
    chartData.forEach(event => {
      const d = parseDate(event.startDate);
      if (d >= startRange && d <= endRange) {
        allDates.add(event.startDate);
      }
    });
    
    // Sort dates chronologically
    const sortedDates = Array.from(allDates).sort((a, b) => parseDate(a) - parseDate(b));
    
    // Track quarters for marker placement
    const markedQuarters = new Set();
    
    // Build unified data points
    sortedDates.forEach(date => {
      const manpower = getManpowerAtDate(date, manpowerHistory);
      const event = chartData.find(e => e.startDate === date);
      
      // Calculate quarter and determine if we should show marker
      const d = parseDate(date);
      const quarterKey = `${d.getFullYear()}-Q${Math.floor(d.getMonth() / 3)}`;
      const showMarker = !markedQuarters.has(quarterKey);
      if (showMarker) markedQuarters.add(quarterKey);
      
      dataPoints.push({
        date,
        actual: manpower.actual,
        sataf: manpower.sataf,
        deficit: manpower.sataf - manpower.actual,
        eventWorkload: event ? event.yValue : null,
        eventName: event ? event.name : null,
        eventDuration: event ? event.duration : null,
        eventConcurrentDays: event ? event.concurrentDays : null,
        showMarker,
      });
    });
    
    return dataPoints;
  }, [manpowerHistory, chartData, customDateRange]);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.bg} ${theme.text}`}>
      {/* SVG Pattern Definitions for Cross-Hatch */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <pattern id="deficitCrossHatch" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#ef4444" strokeWidth="2" strokeOpacity="0.6" />
          </pattern>
          <pattern id="deficitCrossHatchDense" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="#ef4444" strokeWidth="1.5" strokeOpacity="0.7" />
            <line x1="3" y1="0" x2="3" y2="6" stroke="#ef4444" strokeWidth="1.5" strokeOpacity="0.4" />
          </pattern>
        </defs>
      </svg>
      <header className={`fixed top-0 left-0 right-0 border-b ${theme.border} ${theme.headerBg} backdrop-blur-sm z-50`}>
        <div className="max-w-[1800px] mx-auto px-6 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 bg-gradient-to-br from-${theme.accent}-500 to-orange-600 rounded-lg flex items-center justify-center`}>
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className={`text-lg font-bold tracking-tight ${theme.headerText || theme.text}`}>Mission Workload Analysis</h1>
                <p className={`text-[10px] ${theme.textDim}`}>501st CSW / 420th ABS Operations Dashboard</p>
              </div>
            </div>
            
            {/* Theme Selector - Center */}
            <ThemeSelector currentTheme={currentTheme} onThemeChange={handleThemeChange} />
            
            <div className="flex items-center gap-4">
              <div className={`px-3 py-1.5 bg-red-500/10 border border-red-500/30 rounded-lg`}>
                <div className="text-[10px] text-red-400 uppercase tracking-wider">Overwork Factor</div>
                <div className="text-base font-bold text-red-400">1.5x Normal</div>
              </div>
              <div className="text-right">
                <div className={`text-[10px] ${theme.textDim}`}>Current Schedule</div>
                <div className={`text-xs font-medium ${theme.textMuted}`}>10hr days • 6-7 days/week</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Frozen Stats Row - Fixed below header */}
      <div className={`fixed top-[120px] left-0 right-0 z-40 ${theme.headerBg} backdrop-blur-sm py-1 border-b ${theme.border}`}>
        <div className="max-w-[1800px] mx-auto px-6">
          <div className="flex gap-0.5 items-stretch">
            {/* Reorderable Stats Cards */}
            <div className="flex gap-0.5 overflow-x-auto flex-1">
              {statsOrder.map((statsId, index) => {
                const isFirst = index === 0;
                const isLast = index === statsOrder.length - 1;
                
                if (statsId === 'total') {
                  return (
                    <DraggableStatsCard key="total" id="total" onMoveLeft={() => moveStats('total', 'left')} onMoveRight={() => moveStats('total', 'right')} isFirst={isFirst} isLast={isLast} theme={theme}>
                      <div className="flex-shrink-0 w-40">
                        <ManpowerCard title="Current Total" actual={currentManpower.actual} desired={currentManpower.desired} subtitle="As of Oct 2025" isAggregate theme={theme} />
                      </div>
                    </DraggableStatsCard>
                  );
                }
                if (statsId === 'leadership') {
                  const team = teams.find(t => t.team === 'Leadership');
                  return team ? (
                    <DraggableStatsCard key="leadership" id="leadership" onMoveLeft={() => moveStats('leadership', 'left')} onMoveRight={() => moveStats('leadership', 'right')} isFirst={isFirst} isLast={isLast} theme={theme}>
                      <div className="flex-shrink-0 w-28">
                        <ManpowerCard title={team.team} actual={team.filled} desired={team.total} theme={theme} />
                      </div>
                    </DraggableStatsCard>
                  ) : null;
                }
                if (statsId === 'operations') {
                  const team = teams.find(t => t.team === 'Operations');
                  return team ? (
                    <DraggableStatsCard key="operations" id="operations" onMoveLeft={() => moveStats('operations', 'left')} onMoveRight={() => moveStats('operations', 'right')} isFirst={isFirst} isLast={isLast} theme={theme}>
                      <div className="flex-shrink-0 w-28">
                        <ManpowerCard title={team.team} actual={team.filled} desired={team.total} theme={theme} />
                      </div>
                    </DraggableStatsCard>
                  ) : null;
                }
                if (statsId === 'weather') {
                  const team = teams.find(t => t.team === 'Weather Flight');
                  return team ? (
                    <DraggableStatsCard key="weather" id="weather" onMoveLeft={() => moveStats('weather', 'left')} onMoveRight={() => moveStats('weather', 'right')} isFirst={isFirst} isLast={isLast} theme={theme}>
                      <div className="flex-shrink-0 w-28">
                        <ManpowerCard title="Weather" actual={team.filled} desired={team.total} theme={theme} />
                      </div>
                    </DraggableStatsCard>
                  ) : null;
                }
                if (statsId === 'logistics') {
                  const team = teams.find(t => t.team === 'Logistics Readiness');
                  return team ? (
                    <DraggableStatsCard key="logistics" id="logistics" onMoveLeft={() => moveStats('logistics', 'left')} onMoveRight={() => moveStats('logistics', 'right')} isFirst={isFirst} isLast={isLast} theme={theme}>
                      <div className="flex-shrink-0 w-28">
                        <ManpowerCard title="Logistics" actual={team.filled} desired={team.total} theme={theme} />
                      </div>
                    </DraggableStatsCard>
                  ) : null;
                }
                if (statsId === 'eabs') {
                  const team = teams.find(t => t.team === 'Expeditionary ABS');
                  return team ? (
                    <DraggableStatsCard key="eabs" id="eabs" onMoveLeft={() => moveStats('eabs', 'left')} onMoveRight={() => moveStats('eabs', 'right')} isFirst={isFirst} isLast={isLast} theme={theme}>
                      <div className="flex-shrink-0 w-28">
                        <ManpowerCard title="EABS" actual={team.filled} desired={team.total} theme={theme} />
                      </div>
                    </DraggableStatsCard>
                  ) : null;
                }
                if (statsId === 'last12mo') {
                  return (
                    <DraggableStatsCard key="last12mo" id="last12mo" onMoveLeft={() => moveStats('last12mo', 'left')} onMoveRight={() => moveStats('last12mo', 'right')} isFirst={isFirst} isLast={isLast} theme={theme}>
                      <div className="flex-shrink-0 w-28">
                        <StatsCard 
                          title="Last 12 Mo" 
                          value={events.filter(e => {
                            const eventDate = parseDate(e.startDate);
                            const today = new Date();
                            const twelveMonthsAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
                            return eventDate >= twelveMonthsAgo && eventDate <= today;
                          }).length}
                          subtitle="Events"
                          icon={Calendar}
                          iconColor="#3b82f6"
                          theme={theme}
                        />
                      </div>
                    </DraggableStatsCard>
                  );
                }
                if (statsId === 'filtered') {
                  return (
                    <DraggableStatsCard key="filtered" id="filtered" onMoveLeft={() => moveStats('filtered', 'left')} onMoveRight={() => moveStats('filtered', 'right')} isFirst={isFirst} isLast={isLast} theme={theme}>
                      <div className="flex-shrink-0 w-28">
                        <StatsCard 
                          title="Filtered" 
                          value={filteredEvents.length}
                          subtitle="In range"
                          icon={Clock}
                          iconColor={theme.accentColor}
                          theme={theme}
                        />
                      </div>
                    </DraggableStatsCard>
                  );
                }
                return null;
              })}
            </div>
            
            {/* Event Resources Card - Right Justified */}
            <div className="flex-shrink-0 w-64 ml-2">
              <CargoUnloadCard values={cargoInputs} onChange={handleCargoChange} theme={theme} />
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1800px] mx-auto px-6 pt-[220px] pb-6 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className={`flex flex-wrap items-center justify-between gap-4 ${theme.cardBgAlt} rounded-xl p-4 border ${theme.border}`}>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className={`w-4 h-4 ${theme.textMuted}`} />
                  <input type="date" value={customDateRange.start} onChange={(e) => { setActivePreset('custom'); setCustomDateRange(prev => ({ ...prev, start: e.target.value })); }}
                    className={`${theme.cardBg} border ${theme.border} rounded-lg px-3 py-2 text-sm ${theme.text} focus:outline-none focus:ring-2 focus:ring-${theme.accent}-500/50`} />
                  <span className={theme.textDim}>to</span>
                  <input type="date" value={customDateRange.end} onChange={(e) => { setActivePreset('custom'); setCustomDateRange(prev => ({ ...prev, end: e.target.value })); }}
                    className={`${theme.cardBg} border ${theme.border} rounded-lg px-3 py-2 text-sm ${theme.text} focus:outline-none focus:ring-2 focus:ring-${theme.accent}-500/50`} />
                </div>
                <DatePresets onSelect={handlePresetSelect} activePreset={activePreset} theme={theme} />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={includeFuture} onChange={(e) => setIncludeFuture(e.target.checked)}
                  className={`w-4 h-4 rounded border-${theme.accent}-500 ${theme.cardBg} text-${theme.accent}-500 focus:ring-${theme.accent}-500/50`} />
                <span className={`text-sm ${theme.textMuted}`}>Include Future Planned Events</span>
              </label>
            </div>

            {/* Reorderable Charts */}
            {chartOrder.map((chartId, index) => {
              const isFirst = index === 0;
              const isLast = index === chartOrder.length - 1;
              
              if (chartId === 'manpower') {
                return (
                  <ChartCard
                    key="manpower"
                    id="manpower"
                    title="Manpower Over Time"
                    subtitle="Actual vs Desired (SATAF)"
                    icon={Activity}
                    theme={theme}
                    onMoveUp={() => moveChart('manpower', 'up')}
                    onMoveDown={() => moveChart('manpower', 'down')}
                    isFirst={isFirst}
                    isLast={isLast}
                  >
                    <div className="p-4" style={{ height: '300px', backgroundColor: theme.chartBg }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={manpowerChartData} margin={{ left: 20, right: 20, top: 20, bottom: 40 }}>
                          <XAxis dataKey="displayDate" stroke={theme.chartText} fontSize={10} tick={{ fill: theme.chartText }} angle={-45} textAnchor="end" height={60} />
                          <YAxis stroke={theme.chartText} fontSize={12} tick={{ fill: theme.chartText }} label={{ value: 'Personnel', angle: -90, position: 'insideLeft', fill: theme.chartText, fontSize: 12 }} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#fefdf8', border: '1px solid #d4d0c4', borderRadius: '8px', fontSize: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                            itemStyle={{ color: '#1f2937' }}
                            labelStyle={{ color: '#1f2937', fontWeight: 600, marginBottom: '4px' }}
                            formatter={(value, name) => {
                              if (name === 'Actual Base') return null;
                              if (name === 'Actual') return [value, 'Actual'];
                              if (name === 'Desired (SATAF)') return [value, 'Desired (SATAF)'];
                              if (name === 'Deficit Area') return [value, 'Deficit'];
                              return [value, name];
                            }}
                            filterNull={true} />
                          <Legend />
                          {/* Stacked areas: actual (transparent) + deficit on top = shows band between lines */}
                          <Area type="stepAfter" dataKey="actual" stackId="manpower" fill="transparent" stroke="transparent" name="Actual Base" legendType="none" tooltipType="none" />
                          <Area type="stepAfter" dataKey="deficit" stackId="manpower" fill="url(#deficitCrossHatchDense)" stroke="#ef4444" strokeWidth={0.5} strokeOpacity={0.5} name="Deficit Area" />
                          <Line type="stepAfter" dataKey="sataf" stroke={theme.desiredLine} strokeWidth={2} dot={<QuarterlyDiamondDot stroke={theme.desiredLine} />} name="Desired (SATAF)" />
                          <Line type="stepAfter" dataKey="actual" stroke={theme.actualLine} strokeWidth={2} dot={<QuarterlyCircleDot stroke={theme.actualLine} />} name="Actual" />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </ChartCard>
                );
              }
              
              if (chartId === 'unified') {
                return (
                  <ChartCard
                    key="unified"
                    id="unified"
                    title="Unified View: Manpower & Event Workload"
                    subtitle="X = Date | Y = Formula Value & Personnel"
                    icon={TrendingUp}
                    theme={theme}
                    onMoveUp={() => moveChart('unified', 'up')}
                    onMoveDown={() => moveChart('unified', 'down')}
                    isFirst={isFirst}
                    isLast={isLast}
                    borderAccent={true}
                  >
                    <div className="px-4 py-2 flex items-center gap-4 text-xs border-b" style={{ borderColor: theme.chartGrid }}>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.desiredLine }} /><span className={theme.textMuted}>SATAF</span></div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.actualLine }} /><span className={theme.textMuted}>Actual</span></div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded" style={{ backgroundColor: theme.eventBarPast }} /><span className={theme.textMuted}>Event Workload</span></div>
                    </div>
                    <div className="p-4" style={{ height: '450px', backgroundColor: theme.chartBg }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={unifiedChartData} margin={{ left: 20, right: 20, top: 20, bottom: 60 }}>
                          <XAxis 
                            dataKey="date" 
                            stroke={theme.chartText}
                            fontSize={10} 
                            tick={{ fill: theme.chartText }} 
                            angle={-45} 
                            textAnchor="end" 
                            height={60}
                            tickFormatter={(val) => formatDate(val)}
                          />
                          <YAxis 
                            stroke={theme.chartText}
                            fontSize={12} 
                            tick={{ fill: theme.chartText }} 
                            label={{ value: 'Value (Personnel / Workload Score)', angle: -90, position: 'insideLeft', fill: theme.chartText, fontSize: 11, dx: -5 }}
                            domain={[0, 'auto']}
                          />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#fefdf8', border: '1px solid #d4d0c4', borderRadius: '8px', fontSize: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                            itemStyle={{ color: '#1f2937' }}
                            labelStyle={{ color: '#1f2937', fontWeight: 600, marginBottom: '4px' }}
                            formatter={(value, name, props) => {
                              if (name === 'Actual Base') return null;
                              if (name === 'Actual') return [value, 'Actual Personnel'];
                              if (name === 'Desired (SATAF)') return [value, 'Desired (SATAF)'];
                              if (name === 'Event Workload') return [value?.toFixed(1), 'Event Workload'];
                              if (name === 'Deficit') return [value, 'Deficit'];
                              return [value, name];
                            }}
                            labelFormatter={(label) => {
                              const item = unifiedChartData.find(d => d.date === label);
                              return item?.eventName ? `${formatDate(label)} - ${item.eventName}` : formatDate(label);
                            }}
                            filterNull={true}
                          />
                          <Legend />
                          {/* Stacked areas: actual (transparent) + deficit on top = shows band between lines */}
                          <Area type="stepAfter" dataKey="actual" stackId="unified" fill="transparent" stroke="transparent" name="Actual Base" legendType="none" tooltipType="none" />
                          <Area type="stepAfter" dataKey="deficit" stackId="unified" fill="url(#deficitCrossHatchDense)" stroke="#ef4444" strokeWidth={0.5} strokeOpacity={0.5} name="Deficit" />
                          <Bar dataKey="eventWorkload" name="Event Workload" radius={[4, 4, 0, 0]} maxBarSize={40}>
                            {unifiedChartData.map((entry, index) => {
                              const isFuture = entry.date && new Date(entry.date) > new Date();
                              return (
                                <Cell 
                                  key={`cell-${index}`}
                                  fill={entry.eventWorkload ? (isFuture ? theme.eventBarFuture : theme.eventBarPast) : 'transparent'}
                                />
                              );
                            })}
                          </Bar>
                          <Line type="stepAfter" dataKey="sataf" stroke={theme.desiredLine} strokeWidth={3} dot={<QuarterlyDiamondDot stroke={theme.desiredLine} />} name="Desired (SATAF)" />
                          <Line type="stepAfter" dataKey="actual" stroke={theme.actualLine} strokeWidth={3} dot={<QuarterlyCircleDot stroke={theme.actualLine} />} name="Actual" />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </ChartCard>
                );
              }
              
              if (chartId === 'gantt') {
                return (
                  <ChartCard
                    key="gantt"
                    id="gantt"
                    title="Event Timeline (Gantt View)"
                    icon={Clock}
                    theme={theme}
                    onMoveUp={() => moveChart('gantt', 'up')}
                    onMoveDown={() => moveChart('gantt', 'down')}
                    isFirst={isFirst}
                    isLast={isLast}
                  >
                    <div className="px-4 py-2 flex items-center gap-4 text-xs border-b" style={{ borderColor: theme.chartGrid }}>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded" style={{ backgroundColor: theme.eventBarPast }} /><span className={theme.textMuted}>Past/Current</span></div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded" style={{ backgroundColor: theme.eventBarFuture }} /><span className={theme.textMuted}>Future</span></div>
                      <span className={`${theme.textDim} ml-auto`}>{ganttRows.length} row{ganttRows.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="p-4 overflow-x-auto" style={{ backgroundColor: theme.chartBg }}>
                      <div className="relative min-w-[800px]" style={{ height: `${Math.max(ganttRows.length * 36 + 32, 100)}px` }}>
                        <div className={`absolute top-0 left-0 right-0 h-6 border-b`} style={{ borderColor: theme.chartGrid }}>
                          {Array.from({ length: 12 }).map((_, i) => {
                            const start = parseDate(customDateRange.start);
                            const end = parseDate(customDateRange.end);
                            const tickDate = new Date(start.getTime() + ((end - start) / 12) * i);
                            return <div key={i} className="inline-block text-xs px-1" style={{ width: '8.33%', color: theme.chartText }}>{tickDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}</div>;
                          })}
                        </div>
                        {/* Multi-row layout for stacking events */}
                        {ganttRows.map((row, rowIndex) => (
                          <div key={rowIndex} className="absolute left-0 right-0" style={{ top: `${28 + rowIndex * 36}px`, height: '32px' }}>
                            {row.map(event => <EventBar key={event.id} event={event} startDate={customDateRange.start} endDate={customDateRange.end} yValue={event.yValue} maxYValue={maxYValue} theme={theme} />)}
                          </div>
                        ))}
                        {filteredEvents.length === 0 && <div className={`absolute inset-0 flex items-center justify-center ${theme.textDim}`}>No events in selected date range</div>}
                      </div>
                    </div>
                  </ChartCard>
                );
              }
              
              return null;
            })}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`${theme.cardBgAlt} rounded-xl p-4 border ${theme.border}`}>
                <div className="flex items-center gap-2 mb-2"><Plane className="w-4 h-4 text-cyan-500" /><span className={`text-xs ${theme.textDim} uppercase tracking-wider`}>Total Sorties</span></div>
                <div className={`text-2xl font-bold ${theme.text}`}>{filteredEvents.reduce((sum, e) => sum + (e.sorties || 0), 0)}</div>
                <div className={`text-xs ${theme.textDim} mt-1`}>In filtered range</div>
              </div>
              <div className={`${theme.cardBgAlt} rounded-xl p-4 border ${theme.border}`}>
                <div className="flex items-center gap-2 mb-2"><Package className="w-4 h-4 text-emerald-500" /><span className={`text-xs ${theme.textDim} uppercase tracking-wider`}>Short Tons</span></div>
                <div className={`text-2xl font-bold ${theme.text}`}>{filteredEvents.reduce((sum, e) => sum + (e.shortTons || 0), 0).toFixed(1)}</div>
                <div className={`text-xs ${theme.textDim} mt-1`}>Cargo moved</div>
              </div>
              <div className={`${theme.cardBgAlt} rounded-xl p-4 border ${theme.border}`}>
                <div className="flex items-center gap-2 mb-2"><Users className="w-4 h-4 text-violet-500" /><span className={`text-xs ${theme.textDim} uppercase tracking-wider`}>Total PAX</span></div>
                <div className={`text-2xl font-bold ${theme.text}`}>{filteredEvents.reduce((sum, e) => sum + (e.pax || 0), 0).toLocaleString()}</div>
                <div className={`text-xs ${theme.textDim} mt-1`}>Personnel moved</div>
              </div>
              <div className={`${theme.cardBgAlt} rounded-xl p-4 border ${theme.border}`}>
                <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-4 h-4" style={{ color: theme.accentColor }} /><span className={`text-xs ${theme.textDim} uppercase tracking-wider`}>Max Workload</span></div>
                <div className={`text-2xl font-bold ${theme.text}`}>{maxYValue.toFixed(0)}</div>
                <div className={`text-xs ${theme.textDim} mt-1`}>Peak score</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <FormulaModule formula={formula} onFormulaChange={handleFormulaChange} variables={formulaVariables} theme={theme} />
            <DatabasePanel connections={DATABASE_CONFIG.connections} theme={theme} />
            <div className={`${theme.cardBg} rounded-xl border ${theme.border} p-4`}>
              <div className="flex items-center gap-2 mb-4"><Filter className="w-4 h-4" style={{ color: theme.accentColor }} /><span className={`text-sm font-medium ${theme.text}`}>Analysis Stats</span></div>
              <div className="space-y-3">
                <div className="flex justify-between items-center"><span className={`text-xs ${theme.textMuted}`}>Events Shown</span><span className={`text-sm font-medium ${theme.text}`}>{filteredEvents.length}</span></div>
                <div className="flex justify-between items-center"><span className={`text-xs ${theme.textMuted}`}>Date Range</span><span className={`text-sm font-medium ${theme.text}`}>{daysBetween(customDateRange.start, customDateRange.end)} days</span></div>
                <div className="flex justify-between items-center"><span className={`text-xs ${theme.textMuted}`}>Avg Duration</span><span className={`text-sm font-medium ${theme.text}`}>{chartData.length > 0 ? Math.round(chartData.reduce((sum, e) => sum + e.duration, 0) / chartData.length) : 0} days</span></div>
                <div className="flex justify-between items-center"><span className={`text-xs ${theme.textMuted}`}>Max Concurrent</span><span className="text-sm font-medium" style={{ color: theme.accentColor }}>{Math.max(...chartData.map(e => e.concurrentDays), 0)} days</span></div>
                <div className="flex justify-between items-center"><span className={`text-xs ${theme.textMuted}`}>Max Workload</span><span className="text-sm font-medium text-red-500">{maxYValue.toFixed(0)}</span></div>
              </div>
            </div>
            <div className={`${theme.cardBgAlt} rounded-xl border ${theme.border} p-4`}>
              <h4 className={`text-sm font-medium ${theme.text} mb-3`}>Formula Guide</h4>
              <div className={`space-y-2 text-xs ${theme.textMuted}`}>
                <p><strong className={theme.text}>Default:</strong> Duration × Concurrent Days × Deficit</p>
                <p>Higher values = greater strain</p>
                <p className="text-red-500">Red line = 50% threshold</p>
              </div>
            </div>
            <div className={`${theme.cardBgAlt} rounded-xl border border-dashed ${theme.border} p-4`}>
              <h4 className={`text-sm font-medium ${theme.textMuted} mb-2`}>🔮 Coming Soon</h4>
              <div className={`space-y-2 text-xs ${theme.textDim}`}>
                <p>• Forecast Manpower module</p>
                <p>• Total Manpower line</p>
                <p>• Task-to-personnel calculator</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MissionWorkloadAnalysisTool;
