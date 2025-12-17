import React, { useState, useEffect } from 'react';
import { UserRole, AppState, Recipe, Blueprint } from './types';
import { ALL_RECIPES, BLUEPRINTS } from './constants';
import { RecipeCard } from './components/RecipeCard';
import { BlueprintCard } from './components/BlueprintCard';
import { generateRecipeContent } from './services/geminiService';
import { 
  LayoutGrid, BookOpen, ChevronRight, PlayCircle, Copy, CheckCircle, 
  ArrowLeft, Search, Loader2, Star, Zap, Award 
} from 'lucide-react';

export default function App() {
  // Initialize state from localStorage if available
  const [state, setState] = useState<AppState>(() => {
    try {
      const savedState = localStorage.getItem('aph_app_state');
      if (savedState) {
        return JSON.parse(savedState);
      }
    } catch (e) {
      console.error("Failed to load state", e);
    }
    return {
      role: null,
      completedBlueprints: [],
      view: 'ONBOARDING',
      activeRecipeId: null,
      activeBlueprintId: null
    };
  });

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('aph_app_state', JSON.stringify(state));
  }, [state]);

  // Derived state
  const activeRecipe = ALL_RECIPES.find(r => r.id === state.activeRecipeId);
  const activeBlueprint = BLUEPRINTS.find(b => b.id === state.activeBlueprintId);
  const currentRoleRecipes = ALL_RECIPES.filter(r => r.role === state.role).slice(0, 3);
  const roleBlueprint = BLUEPRINTS.find(b => b.role === state.role);
  const isAutomationRookie = state.completedBlueprints.length > 0;

  // Recipe Execution State
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [output, setOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLibraryModal, setShowLibraryModal] = useState(false);
  const [libraryFilter, setLibraryFilter] = useState<'Tất cả' | 'Viết' | 'Đọc' | 'Phân tích'>('Tất cả');

  const handleRoleSelect = (role: UserRole) => {
    setState(prev => ({ ...prev, role, view: 'DASHBOARD' }));
  };

  const handleRecipeClick = (id: string) => {
    setState(prev => ({ ...prev, view: 'RECIPE_EXECUTION', activeRecipeId: id }));
    setInputs({});
    setOutput('');
  };

  const handleGenerate = async () => {
    if (!activeRecipe) return;
    setIsLoading(true);
    const result = await generateRecipeContent(activeRecipe.systemPrompt, inputs);
    setOutput(result);
    setIsLoading(false);
  };

  const handleBlueprintComplete = () => {
    if (activeBlueprint && !state.completedBlueprints.includes(activeBlueprint.id)) {
      setState(prev => ({
        ...prev,
        completedBlueprints: [...prev.completedBlueprints, activeBlueprint.id]
      }));
    }
    // Go back to dashboard
    setState(prev => ({ ...prev, view: 'DASHBOARD', activeBlueprintId: null }));
  };

  const handleLogout = () => {
    // Clear state and storage to reset app
    const resetState: AppState = {
      role: null,
      completedBlueprints: [],
      view: 'ONBOARDING',
      activeRecipeId: null,
      activeBlueprintId: null
    };
    setState(resetState);
    setInputs({});
    setOutput('');
    localStorage.removeItem('aph_app_state');
  };

  /* --- VIEWS --- */

  const renderOnboarding = () => (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg shadow-indigo-200">
            <Zap className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Productivity Hub</h1>
        <p className="text-slate-500 mb-8">Chọn vai trò của bạn để cá nhân hóa không gian làm việc.</p>
        
        <div className="space-y-3">
          {Object.values(UserRole).map((role) => (
            <button
              key={role}
              onClick={() => handleRoleSelect(role)}
              className="w-full bg-white border border-slate-200 p-4 rounded-xl text-left hover:border-indigo-500 hover:shadow-md transition-all flex items-center justify-between group"
            >
              <span className="font-medium text-slate-700 group-hover:text-indigo-600">{role}</span>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="max-w-3xl mx-auto pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Chào mừng trở lại</h2>
          <p className="text-slate-500">Không gian {state.role}</p>
        </div>
        {isAutomationRookie && (
          <div className="flex items-center gap-2 bg-emerald-100 px-3 py-1.5 rounded-full">
            <Award className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700">Tập sự Tự động hóa</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-slate-200 rounded-lg mb-8 w-fit">
        <button className="px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium text-slate-900">
          Tác nghiệp nhanh
        </button>
        <button 
          onClick={() => setState(prev => ({ ...prev, view: 'LIBRARY' }))} // Placeholder for tab switching if full tabs implemented
          className="px-4 py-2 text-slate-500 text-sm font-medium hover:text-slate-700"
        >
          Phòng Lab Tự động hóa
        </button>
      </div>

      {/* Quick Wins Section */}
      <section className="mb-10">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-lg font-bold text-slate-800">Công thức Hiệu quả cao</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentRoleRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} onClick={() => handleRecipeClick(recipe.id)} />
          ))}
        </div>
        <div className="mt-6 text-center">
          <button 
            onClick={() => setShowLibraryModal(true)}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            Khám phá thêm 15+ công thức...
          </button>
        </div>
      </section>

      {/* Automation Teaser Section (In Dashboard) or separate Tab */}
      <section>
        <h3 className="text-lg font-bold text-slate-800 mb-4">Bản vẽ Đề xuất</h3>
        {roleBlueprint && (
          <BlueprintCard 
            blueprint={roleBlueprint} 
            isCompleted={state.completedBlueprints.includes(roleBlueprint.id)}
            onClick={() => setState(prev => ({ ...prev, view: 'BLUEPRINT_DETAIL', activeBlueprintId: roleBlueprint.id }))} 
          />
        )}
      </section>
    </div>
  );

  const renderAutomationLab = () => (
     <div className="max-w-3xl mx-auto pb-24">
        <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setState(prev => ({...prev, view: 'DASHBOARD'}))} className="p-2 hover:bg-slate-100 rounded-full">
                <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <h2 className="text-2xl font-bold text-slate-900">Phòng Lab Tự động hóa</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
            {BLUEPRINTS.map(bp => (
                <BlueprintCard 
                    key={bp.id} 
                    blueprint={bp} 
                    isCompleted={state.completedBlueprints.includes(bp.id)}
                    onClick={() => setState(prev => ({ ...prev, view: 'BLUEPRINT_DETAIL', activeBlueprintId: bp.id }))} 
                />
            ))}
        </div>
     </div>
  );

  const renderRecipeExecution = () => {
    if (!activeRecipe) return null;
    return (
      <div className="max-w-2xl mx-auto pb-12">
        <button 
          onClick={() => setState(prev => ({ ...prev, view: 'DASHBOARD', activeRecipeId: null }))}
          className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại Bảng tin
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded">CÔNG THỨC</span>
              <span className="text-slate-400 text-sm">{activeRecipe.role}</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">{activeRecipe.title}</h1>
            <p className="text-slate-500 mt-1">{activeRecipe.description}</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Inputs */}
            {activeRecipe.inputs.map(input => (
              <div key={input.id}>
                <label className="block text-sm font-medium text-slate-700 mb-2">{input.label}</label>
                {input.multiline ? (
                  <textarea 
                    className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px]"
                    placeholder={input.placeholder}
                    value={inputs[input.id] || ''}
                    onChange={(e) => setInputs(prev => ({...prev, [input.id]: e.target.value}))}
                  />
                ) : (
                  <input 
                    type="text" 
                    className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder={input.placeholder}
                    value={inputs[input.id] || ''}
                    onChange={(e) => setInputs(prev => ({...prev, [input.id]: e.target.value}))}
                  />
                )}
              </div>
            ))}

            <button 
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex justify-center items-center gap-2"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 fill-indigo-400" />}
              {isLoading ? 'Đang tạo phép màu...' : 'Chạy Công thức'}
            </button>
          </div>

          {/* Output */}
          {output && (
            <div className="border-t border-slate-200 p-6 bg-slate-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800">Kết quả</h3>
                <div className="flex gap-2">
                  <button onClick={() => navigator.clipboard.writeText(output)} className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-white rounded-md transition-all" title="Sao chép">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-500 hover:text-yellow-500 hover:bg-white rounded-md transition-all" title="Đánh giá">
                    <Star className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200 text-slate-700 whitespace-pre-wrap text-sm leading-relaxed">
                {output}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderBlueprintDetail = () => {
    if (!activeBlueprint) return null;
    return (
      <div className="max-w-3xl mx-auto pb-12">
        <button 
          onClick={() => setState(prev => ({ ...prev, view: 'DASHBOARD', activeBlueprintId: null }))}
          className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại
        </button>

        <div className="bg-slate-900 rounded-2xl text-white overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-slate-800">
            <div className="flex items-center gap-3 mb-4">
               <span className="px-2 py-1 bg-indigo-600 text-white text-xs font-bold rounded">BẢN VẼ</span>
               <span className="text-slate-400 text-sm">Cấp độ: Trung bình</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">{activeBlueprint.title}</h1>
            <p className="text-slate-400 text-lg leading-relaxed">{activeBlueprint.description}</p>
          </div>

          <div className="p-8 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              
              {/* Video Mock */}
              <div className="aspect-video bg-slate-800 rounded-xl flex flex-col items-center justify-center border border-slate-700 relative group cursor-pointer hover:border-indigo-500 transition-all">
                <PlayCircle className="w-16 h-16 text-indigo-500 group-hover:scale-110 transition-transform" />
                <span className="mt-4 font-medium text-slate-300">Xem Hướng dẫn ({activeBlueprint.videoDuration})</span>
              </div>

              {/* Steps */}
              <div>
                <h3 className="text-xl font-bold mb-4">Các bước Thực hiện</h3>
                <ol className="space-y-4">
                  {activeBlueprint.steps.map((step, idx) => (
                    <li key={idx} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-indigo-400">
                        {idx + 1}
                      </span>
                      <span className="py-1 text-slate-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

            </div>

            <div className="space-y-6">
               <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                  <h4 className="font-bold text-slate-200 mb-2">Công cụ Yêu cầu</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeBlueprint.toolsInvolved.map(t => (
                      <span key={t} className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">{t}</span>
                    ))}
                  </div>
               </div>

               <div className="bg-indigo-900/30 p-5 rounded-xl border border-indigo-500/30">
                  <h4 className="font-bold text-indigo-200 mb-2">Câu lệnh Vàng (Golden Prompt)</h4>
                  <p className="text-xs text-indigo-300 mb-3">Sao chép nội dung này vào bước tự động hóa AI của bạn.</p>
                  <div className="bg-slate-900 p-3 rounded text-xs text-slate-400 font-mono mb-3 max-h-40 overflow-y-auto">
                    {activeBlueprint.goldenPrompt}
                  </div>
                  <button 
                    onClick={() => navigator.clipboard.writeText(activeBlueprint.goldenPrompt)}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded flex items-center justify-center gap-2"
                  >
                    <Copy className="w-4 h-4" /> Sao chép Lệnh
                  </button>
               </div>

               <button 
                onClick={handleBlueprintComplete}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all"
               >
                 <CheckCircle className="w-5 h-5" /> Tôi đã thiết lập xong!
               </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderLibraryModal = () => {
    if (!showLibraryModal) return null;
    const filteredRecipes = ALL_RECIPES.filter(r => 
      (libraryFilter === 'Tất cả' || r.category === libraryFilter) && 
      (state.role ? r.role === state.role : true)
    );

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Thư viện Công thức</h2>
              <p className="text-sm text-slate-500">Khám phá các câu lệnh dành cho {state.role}</p>
            </div>
            <button onClick={() => setShowLibraryModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
          </div>
          
          <div className="p-4 border-b border-slate-100 flex gap-2 overflow-x-auto">
            {['Tất cả', 'Viết', 'Đọc', 'Phân tích'].map(f => (
              <button
                key={f}
                onClick={() => setLibraryFilter(f as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${libraryFilter === f ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRecipes.map(r => (
                <RecipeCard 
                  key={r.id} 
                  recipe={r} 
                  onClick={() => {
                    setShowLibraryModal(false);
                    handleRecipeClick(r.id);
                  }} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* --- MAIN RENDER --- */
  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-900">
      {/* Top Navigation for logged in users */}
      {state.view !== 'ONBOARDING' && (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-slate-900 cursor-pointer" onClick={() => setState(prev => ({...prev, view: 'DASHBOARD'}))}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="hidden md:block">AI Productivity Hub</span>
          </div>
          
          <div className="flex gap-1 md:gap-4">
             <button 
                onClick={() => setState(prev => ({...prev, view: 'DASHBOARD'}))}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${state.view === 'DASHBOARD' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                <LayoutGrid className="w-4 h-4" /> <span className="hidden md:inline">Tác nghiệp nhanh</span>
             </button>
             <button 
                onClick={() => setState(prev => ({...prev, view: 'LIBRARY'}))}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${state.view === 'LIBRARY' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                <BookOpen className="w-4 h-4" /> <span className="hidden md:inline">Phòng Lab Tự động hóa</span>
             </button>
          </div>

          <div className="flex items-center gap-3">
             <div 
               onClick={handleLogout}
               title="Nhấn để đăng xuất"
               className="w-8 h-8 bg-slate-200 hover:bg-red-100 rounded-full flex items-center justify-center text-slate-600 hover:text-red-600 text-xs font-bold cursor-pointer transition-colors"
             >
               {state.role ? state.role[0] : 'U'}
             </div>
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <main className={state.view !== 'ONBOARDING' ? 'p-4 md:p-8' : ''}>
        {state.view === 'ONBOARDING' && renderOnboarding()}
        {state.view === 'DASHBOARD' && renderDashboard()}
        {state.view === 'LIBRARY' && renderAutomationLab()}
        {state.view === 'RECIPE_EXECUTION' && renderRecipeExecution()}
        {state.view === 'BLUEPRINT_DETAIL' && renderBlueprintDetail()}
      </main>

      {/* Modals */}
      {renderLibraryModal()}
    </div>
  );
}