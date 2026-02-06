import { mockStore } from '../../../../services/mockStore';
import { DemoBadge } from '../../../DemoIndicator';

export const ResetDataButton: React.FC = () => {
  const handleReset = () => {
    if (window.confirm('This will delete all your local changes and reset the app. Continue?')) {
      mockStore.resetData();
    }
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm mt-8 flex justify-between items-center">
      <div>
        <h3 className="text-xl font-black text-slate-900 mb-2">System Controls <DemoBadge /></h3>
        <p className="text-sm text-slate-500">Reset the local database to its initial seed state.</p>
      </div>
      <button 
        onClick={handleReset}
        className="px-6 py-3 bg-red-100 text-red-700 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-200 transition-all"
      >
        Reset Demo Data
      </button>
    </div>
  );
};
