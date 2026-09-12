export const toApiDate = (date: string): string => {
  return `${date}T00:00:00Z`;
};

export const toInputDate = (date: string): string => {
  return date.split('T')[0];
};
