'use client';

import { MinIcon, FullIcon, ExitIcon, WindeathLogo } from '@/assets';
import * as _ from './WindowHeader.styles';

interface WindowHeaderProps {
  logoSrc?: string;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
}

export default function WindowHeader({
  logoSrc = WindeathLogo.src,
  onMinimize,
  onMaximize,
  onClose,
}: WindowHeaderProps) {
  return (
    <_.HeaderContainer>
      <_.LogoSection>
        <_.LogoIcon>
          <img src={logoSrc} alt="Logo" />
        </_.LogoIcon>
        <_.Title>최애의 사인</_.Title>
      </_.LogoSection>
      <_.WindowButtons>
        <_.WindowBtn onClick={onMinimize}>
          <img src={MinIcon.src} alt="Minimize" />
        </_.WindowBtn>
        <_.WindowBtn onClick={onMaximize}>
          <img src={FullIcon.src} alt="Maximize" />
        </_.WindowBtn>
        <_.WindowBtn onClick={onClose}>
          <img src={ExitIcon.src} alt="Close" />
        </_.WindowBtn>
      </_.WindowButtons>
    </_.HeaderContainer>
  );
}
