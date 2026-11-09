import React, { useState, useEffect } from 'react';
import { 
  X, 
  Cloud, 
  CloudUpload, 
  CloudDownload, 
  Copy, 
  Check, 
  Wifi, 
  Smartphone, 
  Monitor, 
  RefreshCw,
  Sparkles,
  ArrowRight,
  ClipboardPaste,
  ShieldCheck,
  Database
} from 'lucide-react';
import { 
  fetchLiveDatabase, 
  saveLiveDatabase, 
  exportSyncString, 
  importSyncString 
} from '../data/dataSyncManager';

export default function SyncModal({ isOpen, onClose, onDataUpdated }) {
  const [activeTab, setActiveTab] = useState('cloud');
  const [copied, setCopied] = useState(false);
  const [pasteData, setPasteData] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [dbStatus, setDbStatus] = useState(null);

  const checkDbStatus = async () => {
    try {
      const res = await fetch('/api/status');
      if (res.ok) {
        const data = await res.json();
        setDbStatus(data);
      } else {
        setDbStatus(null);
      }
    } catch (e) {
      setDbStatus(null);
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkDbStatus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePushToCloud = async () => {
    setIsProcessing(true);
    setStatusMsg({ type: 'info', text: 'Uploading to Aroham Cloud...' });
    try {
      const mentors = JSON.parse(localStorage.getItem('aroham_mentors') || '[]');
      const events = JSON.parse(localStorage.getItem('aroham_events') || '[]');
      const mentees = JSON.parse(localStorage.getItem('aroham_mentees') || '[]');
      const applications = JSON.parse(localStorage.getItem('aroham_applications') || '[]');
      
      await saveLiveDatabase({ mentors, events, mentees, applications });
      setStatusMsg({ type: 'success', text: `Successfully pushed ${mentors.length} mentors to Cloud! Available on all devices.` });
      onDataUpdated && onDataUpdated();
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Cloud upload failed: ' + err.message });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePullFromCloud = async () => {
    setIsProcessing(true);
    setStatusMsg({ type: 'info', text: 'Fetching from Aroham Cloud...' });
    try {
      const live = await fetchLiveDatabase();
      if (live && Array.isArray(live.mentors)) {
        setStatusMsg({ type: 'success', text: `Downloaded ${live.mentors.length} mentors from Cloud! Device synced.` });
        onDataUpdated && onDataUpdated();
        window.dispatchEvent(new Event('aroham_data_sync'));
      } else {
        setStatusMsg({ type: 'error', text: 'No cloud records found yet.' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Cloud download failed: ' + err.message });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyData = () => {
    try {
      const syncStr = exportSyncString();
      navigator.clipboard.writeText(syncStr);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (e) {
      alert('Unable to copy automatically. Please copy from text area.');
    }
  };

  const handleApplyPasted = async () => {
    if (!pasteData.trim()) return;
    setIsProcessing(true);
    try {
      const result = await importSyncString(pasteData);
      if (result.success) {
        setStatusMsg({ type: 'success', text: `Applied! ${result.count} mentors imported and synced across all pages.` });
        setPasteData('');
        onDataUpdated && onDataUpdated();
        setTimeout(() => onClose(), 2000);
      } else {
        setStatusMsg({ type: 'error', text: 'Import error: ' + (result.error || 'Invalid data') });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to import: ' + err.message });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-aroham-border flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-aroham-dark text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute right-5 top-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
              <Cloud size={20} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">
              Cross-Device Synchronization
            </span>
          </div>

          <h3 className="text-xl font-bold font-serif">
            Sync Desktop & Mobile
          </h3>
          <p className="text-xs text-emerald-100/80 mt-1">
            Keep mentors, mentees, and events 100% matched across all your screens and devices.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-aroham-border bg-[#F4F8F5] p-2 gap-1.5 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('cloud')}
            className={`flex-1 py-2 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
              activeTab === 'cloud'
                ? 'bg-white text-aroham-dark shadow-sm'
                : 'text-aroham-muted hover:text-aroham-dark'
            }`}
          >
            <Cloud size={14} className={activeTab === 'cloud' ? 'text-aroham-forest' : ''} />
            <span>Auto Cloud</span>
          </button>

          <button
            onClick={() => setActiveTab('mysql')}
            className={`flex-1 py-2 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
              activeTab === 'mysql'
                ? 'bg-white text-aroham-dark shadow-sm'
                : 'text-aroham-muted hover:text-aroham-dark'
            }`}
          >
            <Database size={14} className={activeTab === 'mysql' ? 'text-sky-600' : ''} />
            <span>🐬 MySQL Database</span>
          </button>

          <button
            onClick={() => setActiveTab('copy')}
            className={`flex-1 py-2 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
              activeTab === 'copy'
                ? 'bg-white text-aroham-dark shadow-sm'
                : 'text-aroham-muted hover:text-aroham-dark'
            }`}
          >
            <Copy size={14} className={activeTab === 'copy' ? 'text-aroham-forest' : ''} />
            <span>Code</span>
          </button>

          <button
            onClick={() => setActiveTab('wifi')}
            className={`flex-1 py-2 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
              activeTab === 'wifi'
                ? 'bg-white text-aroham-dark shadow-sm'
                : 'text-aroham-muted hover:text-aroham-dark'
            }`}
          >
            <Wifi size={14} className={activeTab === 'wifi' ? 'text-aroham-forest' : ''} />
            <span>Wi-Fi</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {statusMsg && (
            <div className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              statusMsg.type === 'success' 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : statusMsg.type === 'error'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-blue-50 text-blue-700 border border-blue-200'
            }`}>
              <ShieldCheck size={16} className="shrink-0" />
              <span>{statusMsg.text}</span>
            </div>
          )}

          {/* TAB 1: Automatic Cloud */}
          {activeTab === 'cloud' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse mt-1 shrink-0" />
                <div className="text-xs text-aroham-forest">
                  <div className="font-bold text-sm text-aroham-heading mb-0.5">
                    Cloud Relay Active
                  </div>
                  Changes automatically sync every 2.5 seconds. You can also manually push or pull below.
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={handlePushToCloud}
                  disabled={isProcessing}
                  className="py-3 px-4 bg-aroham-dark hover:bg-aroham-forest text-white rounded-xl text-xs font-bold transition-all shadow flex flex-col items-center justify-center gap-1.5 active:scale-98"
                >
                  <CloudUpload size={20} />
                  <span>Push to Cloud</span>
                  <span className="text-[10px] text-emerald-300 font-normal">Send this device's data</span>
                </button>

                <button
                  onClick={handlePullFromCloud}
                  disabled={isProcessing}
                  className="py-3 px-4 bg-white hover:bg-emerald-50 text-aroham-dark border border-aroham-border rounded-xl text-xs font-bold transition-all shadow-sm flex flex-col items-center justify-center gap-1.5 active:scale-98"
                >
                  <CloudDownload size={20} className="text-aroham-forest" />
                  <span>Pull from Cloud</span>
                  <span className="text-[10px] text-aroham-muted font-normal">Get other device's data</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB: MySQL Database */}
          {activeTab === 'mysql' && (
            <div className="space-y-4 text-xs">
              <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
                dbStatus?.mysql?.connected 
                  ? 'bg-sky-50/80 border-sky-300' 
                  : 'bg-amber-50/80 border-amber-300'
              }`}>
                <span className={`w-3 h-3 rounded-full mt-0.5 shrink-0 ${
                  dbStatus?.mysql?.connected ? 'bg-sky-500 animate-pulse' : 'bg-amber-500'
                }`} />
                <div className="flex-1">
                  <div className="font-bold text-sm text-aroham-heading flex items-center justify-between">
                    <span>
                      {dbStatus?.mysql?.connected ? 'MySQL Live & Connected' : 'MySQL Inactive / Authentication Required'}
                    </span>
                    <button
                      onClick={checkDbStatus}
                      className="text-[10px] text-aroham-forest hover:underline flex items-center gap-1"
                    >
                      <RefreshCw size={11} /> Refresh
                    </button>
                  </div>
                  <p className="text-[11px] text-aroham-body mt-0.5">
                    {dbStatus?.mysql?.connected
                      ? `Database: "${dbStatus.mysql.database || 'aroham'}" on ${dbStatus.mysql.host}:${dbStatus.mysql.port} (User: ${dbStatus.mysql.user})`
                      : (dbStatus?.mysql?.message || 'Set MYSQL_PASSWORD in your .env file to enable MySQL.')}
                  </p>
                </div>
              </div>

              {/* MySQL Tables stats grid */}
              {dbStatus?.mysql?.connected && dbStatus.mysql.tables && (
                <div className="grid grid-cols-4 gap-2">
                  <div className="p-2.5 bg-[#F4F8F5] rounded-xl text-center border border-aroham-border">
                    <div className="text-base font-bold text-aroham-dark">
                      {dbStatus.mysql.tables.mentors ?? 0}
                    </div>
                    <div className="text-[10px] uppercase text-aroham-muted font-bold">Mentors</div>
                  </div>
                  <div className="p-2.5 bg-[#F4F8F5] rounded-xl text-center border border-aroham-border">
                    <div className="text-base font-bold text-aroham-dark">
                      {dbStatus.mysql.tables.events ?? 0}
                    </div>
                    <div className="text-[10px] uppercase text-aroham-muted font-bold">Events</div>
                  </div>
                  <div className="p-2.5 bg-[#F4F8F5] rounded-xl text-center border border-aroham-border">
                    <div className="text-base font-bold text-aroham-dark">
                      {dbStatus.mysql.tables.mentees ?? 0}
                    </div>
                    <div className="text-[10px] uppercase text-aroham-muted font-bold">Mentees</div>
                  </div>
                  <div className="p-2.5 bg-[#F4F8F5] rounded-xl text-center border border-aroham-border">
                    <div className="text-base font-bold text-aroham-dark">
                      {dbStatus.mysql.tables.applications ?? 0}
                    </div>
                    <div className="text-[10px] uppercase text-aroham-muted font-bold">Apps</div>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={async () => {
                    setIsProcessing(true);
                    setStatusMsg({ type: 'info', text: 'Saving all collections to MySQL...' });
                    try {
                      const mentors = JSON.parse(localStorage.getItem('aroham_mentors') || '[]');
                      const events = JSON.parse(localStorage.getItem('aroham_events') || '[]');
                      const mentees = JSON.parse(localStorage.getItem('aroham_mentees') || '[]');
                      const applications = JSON.parse(localStorage.getItem('aroham_applications') || '[]');
                      await saveLiveDatabase({ mentors, events, mentees, applications });
                      await checkDbStatus();
                      setStatusMsg({ type: 'success', text: 'All data successfully saved into MySQL tables!' });
                      onDataUpdated && onDataUpdated();
                    } catch (err) {
                      setStatusMsg({ type: 'error', text: 'MySQL save failed: ' + err.message });
                    } finally {
                      setIsProcessing(false);
                    }
                  }}
                  disabled={isProcessing}
                  className="w-full py-2.5 px-4 bg-sky-700 hover:bg-sky-800 text-white rounded-xl font-bold transition-all shadow flex items-center justify-center gap-2"
                >
                  <Database size={15} />
                  <span>Save All Current Data to MySQL</span>
                </button>

                {/* Configuration Help Card */}
                <div className="p-3 bg-[#F4F8F5] rounded-xl border border-aroham-border text-[11px] text-aroham-body space-y-1.5">
                  <div className="font-bold text-aroham-heading flex items-center gap-1.5">
                    <span>⚙️ MySQL Connection Settings (.env)</span>
                  </div>
                  <div className="font-mono bg-white p-2 rounded-lg border border-aroham-border text-[10px] text-slate-700 space-y-0.5">
                    <div>MYSQL_HOST=127.0.0.1</div>
                    <div>MYSQL_PORT=3306</div>
                    <div>MYSQL_USER=root</div>
                    <div>MYSQL_PASSWORD=&lt;your_password&gt;</div>
                    <div>MYSQL_DATABASE=aroham</div>
                  </div>
                  <p className="text-[10px] text-aroham-muted">
                    Supports local MySQL (MySQL 8.0, XAMPP, WAMP) or Cloud MySQL (PlanetScale, AWS RDS, GCP Cloud SQL). Run <code className="bg-white px-1 py-0.5 rounded border border-aroham-border">npm run seed:mysql</code> to seed initial data.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 1-Click Code Transfer */}
          {activeTab === 'copy' && (
            <div className="space-y-4 text-xs">
              <div className="space-y-2">
                <label className="font-bold text-aroham-heading block">
                  1. Copy from this device:
                </label>
                <button
                  onClick={handleCopyData}
                  className="w-full py-2.5 px-4 bg-aroham-sage hover:bg-aroham-mint text-aroham-dark rounded-xl font-bold transition-all border border-aroham-border flex items-center justify-center gap-2"
                >
                  {copied ? <Check size={16} className="text-emerald-700" /> : <Copy size={16} />}
                  <span>{copied ? 'Copied to Clipboard! ✓' : 'Copy Sync Code to Clipboard'}</span>
                </button>
              </div>

              <div className="pt-2 border-t border-aroham-border space-y-2">
                <label className="font-bold text-aroham-heading block">
                  2. Or Paste Sync Code from other device:
                </label>
                <textarea
                  value={pasteData}
                  onChange={(e) => setPasteData(e.target.value)}
                  placeholder="Paste sync code here..."
                  rows={3}
                  className="w-full p-3 bg-[#F4F8F5] rounded-xl border border-aroham-border text-xs font-mono focus:outline-none focus:ring-2 focus:ring-aroham-dark/20 resize-none"
                />
                <button
                  onClick={handleApplyPasted}
                  disabled={isProcessing || !pasteData.trim()}
                  className="w-full py-2.5 px-4 bg-aroham-forest hover:bg-aroham-dark text-white rounded-xl font-bold transition-all shadow flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <ClipboardPaste size={15} />
                  <span>Apply & Sync Device Now</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Wi-Fi Network */}
          {activeTab === 'wifi' && (
            <div className="space-y-4 text-xs leading-relaxed text-aroham-body">
              <div className="p-4 rounded-2xl bg-white border border-aroham-border shadow-soft space-y-2">
                <div className="font-bold text-aroham-heading flex items-center gap-2">
                  <Smartphone size={16} className="text-aroham-forest" />
                  <span>Open on Mobile (Same Wi-Fi Network)</span>
                </div>
                <p className="text-aroham-muted text-[11px]">
                  Ensure your phone is connected to the same Wi-Fi, then open this address in mobile Safari or Chrome:
                </p>
                <div className="p-2.5 bg-[#F4F8F5] rounded-xl font-mono font-bold text-aroham-dark select-all text-center border border-aroham-border">
                  http://192.168.1.57:3000/#admin
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#F4F8F5] border-t border-aroham-border flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-aroham-dark text-white hover:bg-aroham-forest rounded-xl text-xs font-bold transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

