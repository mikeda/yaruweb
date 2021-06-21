export const generatePath = (path: string, params?: { [key: string]: string | number | undefined }) => {
  if (!params) return path;

  const queries: string[] = [];
  Object.entries(params).filter(([k, v]) => {
    if (v) queries.push(`${k}=${v}`);
  });
  if (queries.length === 0) return path;

  return `${path}?${queries.join('&')}`;
};
