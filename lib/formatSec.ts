export const formatSec = (seconds: number) => {
  const times: number[] = [];

  if (seconds > 3600) times.push(Math.floor(seconds / 3600));
  times.push(Math.floor((seconds % 3600) / 60));
  times.push(seconds % 60);

  return times.map(t => (t < 10 ? `0${t}` : t.toString())).join(':');
};
