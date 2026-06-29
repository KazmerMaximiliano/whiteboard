export const formatDate = (timestamp: number): string =>
  new Date(timestamp).toLocaleString();
