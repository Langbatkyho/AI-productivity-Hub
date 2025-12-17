import React from 'react';
import { Blueprint } from '../types';
import { getIcon } from '../constants';
import { PlayCircle, CheckCircle } from 'lucide-react';

interface Props {
  blueprint: Blueprint;
  onClick: () => void;
  isCompleted: boolean;
}

export const BlueprintCard: React.FC<Props> = ({ blueprint, onClick, isCompleted }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl border-2 cursor-pointer transition-all ${
        isCompleted 
          ? 'bg-emerald-50 border-emerald-200' 
          : 'bg-slate-900 border-slate-800 hover:border-indigo-500'
      }`}
    >
      {isCompleted && (
        <div className="absolute top-3 right-3 text-emerald-600">
          <CheckCircle className="w-6 h-6 fill-emerald-100" />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${isCompleted ? 'bg-emerald-200 text-emerald-800' : 'bg-slate-800 text-indigo-400'}`}>
            {getIcon(blueprint.icon)}
          </div>
          <div className={`text-xs font-semibold px-2 py-1 rounded ${isCompleted ? 'bg-emerald-200 text-emerald-800' : 'bg-indigo-900 text-indigo-200'}`}>
            BẢN VẼ TỰ ĐỘNG HÓA
          </div>
        </div>
        
        <h3 className={`text-xl font-bold mb-2 ${isCompleted ? 'text-emerald-900' : 'text-white'}`}>
          {blueprint.title}
        </h3>
        <p className={`text-sm mb-6 ${isCompleted ? 'text-emerald-700' : 'text-slate-400'}`}>
          {blueprint.description}
        </p>

        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-2 text-xs font-medium ${isCompleted ? 'text-emerald-800' : 'text-slate-400'}`}>
            <PlayCircle className="w-4 h-4" />
            {blueprint.videoDuration} Video HD
          </div>
          <span className={`text-sm font-bold ${isCompleted ? 'text-emerald-600' : 'text-indigo-400'} group-hover:underline`}>
            {isCompleted ? 'Xem lại' : 'Mở Lab'} &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};