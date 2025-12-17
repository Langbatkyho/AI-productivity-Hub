import React from 'react';
import { Recipe } from '../types';
import { getIcon } from '../constants';
import { ArrowRight } from 'lucide-react';

interface Props {
  recipe: Recipe;
  onClick: () => void;
}

export const RecipeCard: React.FC<Props> = ({ recipe, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 cursor-pointer hover:shadow-md hover:border-indigo-100 transition-all group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
          {getIcon(recipe.icon)}
        </div>
        <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-500 rounded-full">
          {recipe.category}
        </span>
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600">{recipe.title}</h3>
      <p className="text-sm text-slate-500 line-clamp-2 mb-4">{recipe.description}</p>
      <div className="flex items-center text-indigo-600 text-sm font-medium">
        Dùng ngay <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};