
export enum Track {
  FRONTEND = 'FRONTEND',
  BACKEND = 'BACKEND',
  MOBILE = 'MOBILE',
  DATABASE = 'DATABASE',
  DEVOPS = 'DEVOPS',
  GAME = 'GAME',
  AI = 'AI',
  SECURITY = 'SECURITY',
}

export type TrackType = {
  id: number;
  name: string;
  description: string;
  backgroundColor: string | null;
}
