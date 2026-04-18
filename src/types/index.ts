import type { Dispatch, SetStateAction } from 'react';

export interface ChatBotProps {
  chatOpen: boolean;
  setChatOpen: Dispatch<SetStateAction<boolean>>;
  isFullScreen: boolean;
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
}

export interface Bullet {
  x: number;
  y: number;
}

export type ChatMessage = { role: 'user' | 'assistant'; content: string };
