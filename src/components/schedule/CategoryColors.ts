
export const getCategoryColor = (category: string): string => {
  switch(category.toLowerCase()) {
    case 'keynote': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'workshop': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'panel': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    case 'talk': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'networking': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
    case 'social': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    case 'discussion': return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200';
    case 'ceremony': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
    case 'worship': return 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200';
    case 'registration': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
    case 'devotion': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200';
    case 'plenary': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'reflection': return 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200';
    case 'meal': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};
