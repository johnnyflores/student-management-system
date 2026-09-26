export const colorStyles = {
  blue: {
    background:
      'bg-blue-100 dark:bg-blue-950 hover:bg-blue-200 dark:hover:bg-blue-900',
    icon: 'text-blue-600 dark:text-blue-400 hover:text-blue-500',
  },
  green: {
    background:
      'bg-green-100 dark:bg-green-950 hover:bg-green-200 dark:hover:bg-green-900',
    icon: 'text-green-600 dark:text-green-400 hover:text-green-500',
  },
  orange: {
    background:
      'bg-orange-100 dark:bg-orange-950 hover:bg-orange-200 dark:hover:bg-orange-900',
    icon: 'text-orange-600 dark:text-orange-400 hover:text-orange-500',
  },
  purple: {
    background:
      'bg-purple-100 dark:bg-purple-950 hover:bg-purple-200 dark:hover:bg-purple-900',
    icon: 'text-purple-600 dark:text-purple-400 hover:text-purple-500',
  },
} as const;

export type ColorName = keyof typeof colorStyles;
