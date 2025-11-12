'use client';

import * as _ from './styles';

interface WhiteboardProps {
  children: React.ReactNode;
  padding?: string;
  gap?: string;
  height?: string;
}

export default function Whiteboard({ children, padding, gap, height }: WhiteboardProps) {
  return (
    <_.StyledWhiteboard
      padding={padding}
      gap={gap}
      height={height}
    >
      {children}
    </_.StyledWhiteboard>
  );
}
