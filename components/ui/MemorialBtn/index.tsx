'use client';

import * as _ from './MemorialBtn.styles';

interface MemorialBtnProps {
  name: string;
  selected?: boolean;
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void);
  type?: string;
  active?: boolean;
  width?: string;
  height?: string;
  fontSize?: string;
}

const MemorialBtn = ({
  name,
  selected = false,
  onClick,
  type = 'none',
  active,
  width,
  height,
  fontSize = '20px',
}: MemorialBtnProps) => {
  if (type === 'hidden') {
    return <_.HiddenBtn width={width} height={height} />;
  }
  if (type === 'submit') {
    return !active ? (
      <_.SubmitDefault width={width} height={height} fontSize={fontSize}>
        {name}
      </_.SubmitDefault>
    ) : (
      <_.SubmitActive onClick={onClick} width={width} height={height} fontSize={fontSize}>
        {name}
      </_.SubmitActive>
    );
  } else if (type === 'menu') {
    return !selected ? (
      <_.Btn onClick={onClick} width={width} height={height} fontSize={fontSize}>
        {name}
      </_.Btn>
    ) : (
      <_.SelectedBtn width={width} height={height} fontSize={fontSize}>
        {name}
      </_.SelectedBtn>
    );
  }

  return null;
};

export default MemorialBtn;
