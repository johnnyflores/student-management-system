export const colorStyles = {
  blue: {
    background: 'bg-blue-100 dark:bg-blue-950',
    icon: 'text-blue-600 dark:text-blue-400',
  },
  green: {
    background: 'bg-green-100 dark:bg-green-950',
    icon: 'text-green-600 dark:text-green-400',
  },
  orange: {
    background: 'bg-orange-100 dark:bg-orange-950',
    icon: 'text-orange-600 dark:text-orange-400',
  },
  purple: {
    background: 'bg-purple-100 dark:bg-purple-950',
    icon: 'text-purple-600 dark:text-purple-400',
  },
} as const;

export type ColorName = keyof typeof colorStyles;
