'use client';

import * as _ from './Whiteboard.styles';

interface WhiteboardProps {
  children: React.ReactNode;
  padding?: string;
  gap?: string;
}

export default function Whiteboard({ children, padding, gap }: WhiteboardProps) {
  return (
    <_.StyledWhiteboard padding={padding} gap={gap}>
      {children}
    </_.StyledWhiteboard>
  );
}
