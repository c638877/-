import React, { useState, useEffect } from 'react';
import { Timer, Bell, Play, Pause, RotateCcw, Coffee, Focus } from 'lucide-react';
import LycheeCharacter from './components/LycheeCharacter.tsx';
import { Tab, TimerMode, TimerSettings } from './types.ts';
import { playNotificationSound } from './services/audioService.ts';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Timer);
  const [settings, setSettings] = useState<TimerSettings>({
    focusMinutes: 25,
    breakMinutes: 5,
    periodicReminderMinutes: 0,
  });
  
  const [mode, setMode] = useState<TimerMode>(TimerMode.Focus);
  const [timeLeft, setTimeLeft] = useState(settings.focusMinutes * 60);
  const [isActive, setIsActive] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval: number | undefined;
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => {
          const nextValue = prev - 1;
          if (settings.periodicReminderMinutes > 0) {
            const totalSeconds = (mode === TimerMode.Focus ? settings.focusMinutes : settings.breakMinutes) * 60;
            const elapsed = totalSeconds - nextValue;
            if (elapsed > 0 && elapsed % (settings.periodicReminderMinutes * 60) === 0) {
              playNotificationSound();
            }
          }
          return nextValue;
        });
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      playNotificationSound();
      const nextMode = mode === TimerMode.Focus ? TimerMode.Break : TimerMode.Focus;
      setMode(nextMode);
      setTimeLeft((nextMode === TimerMode.Focus ? settings.focusMinutes : settings.breakMinutes) * 60);
      alert(`${mode === TimerMode.Focus ? '專注' : '休息'}時間結束囉！`);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, settings]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft((mode === TimerMode.Focus ? settings.focusMinutes : settings.breakMinutes) * 60);
  };

  const handleUpdateFocusTime = (val: number) => {
    const min = Math.max(1, val);
    setSettings(prev => ({ ...prev, focusMinutes: min }));
    if (mode === TimerMode.Focus && !isActive) setTimeLeft(min * 60);
  };

  const handleUpdateBreakTime = (val: number) => {
    const min = Math.max(1, val);
    setSettings(prev => ({ ...prev, breakMinutes: min }));
    if (mode === TimerMode.Break && !isActive) setTimeLeft(min * 60);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-2">
      {/* 280px 纖細質感容器 */}
      <div className="bg-white/80 backdrop-blur-2xl rounded-[2.8rem] shadow-2xl w-full max-w-[280px] overflow-hidden border-[6px] border-white/60 relative z-10 flex flex-col max-h-[92dvh]">
        
        {/* 頂部分頁導航 */}
        <div className="flex bg-rose-100/30 p-1 m-4 mb-2 rounded-[1.5rem]">
          <button
            onClick={() => setActiveTab(Tab.Timer)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[1.2rem] transition-all duration-300 ${
              activeTab === Tab.Timer ? 'bg-white text-rose-500 shadow-sm font-bold' : 'text-rose-300'
            }`}
          >
            <Timer size={14} />
            <span className="text-[11px]">計時</span>
          </button>
          <button
            onClick={() => setActiveTab(Tab.Alarm)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[1.2rem] transition-all duration-300 ${
              activeTab === Tab.Alarm ? 'bg-white text-rose-500 shadow-sm font-bold' : 'text-rose-300'
            }`}
          >
            <Bell size={14} />
            <span className="text-[11px]">設定</span>
          </button>
        </div>

        <div className="px-5 pb-5 flex-grow overflow-y-auto no-scrollbar">
          {activeTab === Tab.Timer ? (
            <div className="text-center flex flex-col items-center">
              {/* 高品質 SVG 荔枝縮放 */}
              <div className="scale-[0.55] transform origin-top mb-[-45px] mt-[-15px]">
                <LycheeCharacter isWorking={isActive} />
              </div>
              
              <h1 className="text-[13px] font-black text-rose-500 mb-1 tracking-wider uppercase">「荔枝鐘工作計時器」</h1>
              
              <div className="space-y-1">
                <div className="text-5xl font-black text-slate-800 tracking-tighter tabular-nums leading-none">
                  {formatTime(timeLeft)}
                </div>
                {/* 狀態標籤 */}
                <div className={`text-[10px] font-black px-4 py-1.5 rounded-full inline-block mt-4 tracking-[0.1em] shadow-sm ${
                  mode === TimerMode.Focus ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'
                }`}>
                  {mode === TimerMode.Focus ? '● 專注中' : '● 休息中'}
                </div>
              </div>

              {/* 控制按鈕 */}
              <div className="flex justify-center gap-4 pt-6 pb-6">
                <button
                  onClick={toggleTimer}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg active:scale-90 ${
                    isActive ? 'bg-amber-50 text-amber-500 border-2 border-amber-100' : 'bg-rose-500 text-white shadow-rose-200'
                  }`}
                >
                  {isActive ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-1" />}
                </button>
                <button
                  onClick={resetTimer}
                  className="w-14 h-14 rounded-full bg-rose-50 text-rose-200 flex items-center justify-center border-2 border-rose-100 active:scale-90"
                >
                  <RotateCcw size={18} />
                </button>
              </div>

              {/* 工作與休息並排設定 */}
              <div className="w-full grid grid-cols-2 gap-2 pt-4 border-t border-rose-100/50">
                <div className="flex flex-col items-center bg-rose-50/50 p-2.5 rounded-2xl border border-rose-100/30">
                  <div className="flex items-center gap-1 text-rose-400 mb-1">
                    <Focus size={10} />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-center">工作</span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={settings.focusMinutes}
                      onChange={(e) => handleUpdateFocusTime(parseInt(e.target.value) || 0)}
                      disabled={isActive}
                      className="w-8 bg-transparent text-center font-black text-rose-600 text-base outline-none"
                    />
                    <span className="text-[8px] text-rose-300 font-bold ml-0.5">M</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center bg-emerald-50/50 p-2.5 rounded-2xl border border-emerald-100/30">
                  <div className="flex items-center gap-1 text-emerald-500 mb-1">
                    <Coffee size={10} />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-center">休息</span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={settings.breakMinutes}
                      onChange={(e) => handleUpdateBreakTime(parseInt(e.target.value) || 0)}
                      disabled={isActive}
                      className="w-8 bg-transparent text-center font-black text-emerald-600 text-base outline-none"
                    />
                    <span className="text-[8px] text-emerald-300 font-bold ml-0.5">M</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 pt-1">
              <div className="bg-gradient-to-br from-rose-500 to-rose-400 p-4 rounded-[1.8rem] text-white shadow-lg">
                <h2 className="text-sm font-bold flex items-center gap-2 mb-1"><Bell size={16} /> 定時提示</h2>
                <p className="text-rose-100 text-[9px]">週期性發出輕微提示音</p>
              </div>
              
              <div className="bg-white p-5 rounded-[1.8rem] border-2 border-rose-50 text-center">
                <label className="block text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-3">提醒頻率 (分鐘)</label>
                <div className="flex items-center justify-center">
                  <input
                    type="number"
                    value={settings.periodicReminderMinutes}
                    onChange={(e) => setSettings(prev => ({ ...prev, periodicReminderMinutes: parseInt(e.target.value) || 0 }))}
                    className="w-16 p-3 rounded-2xl bg-rose-50 text-2xl font-black text-rose-500 text-center outline-none border-2 border-rose-100 focus:border-rose-300 transition-all"
                  />
                </div>
                <p className="text-[8px] text-slate-300 mt-3 italic font-medium">0 表示不提示</p>
              </div>

              <button
                onClick={() => setActiveTab(Tab.Timer)}
                className="w-full py-3.5 bg-rose-500 text-white rounded-[1.2rem] font-bold text-sm shadow-lg shadow-rose-200 active:scale-95 transition-all"
              >
                儲存並返回
              </button>
            </div>
          )}
        </div>

        {/* 底部激勵文字 */}
        <div className="pb-5 text-center mt-auto px-4">
          <p className="text-slate-300 text-[8px] font-bold tracking-[0.2em] uppercase leading-relaxed">
            讓可愛的荔枝鐘陪你活力高效一整天
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;