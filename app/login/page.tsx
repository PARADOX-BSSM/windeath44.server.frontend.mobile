'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import WindowHeader from '@/components/layout/WindowHeader/index';
import MemorialBtn from '@/components/ui/MemorialBtn';
import Input from '@/components/ui/Input/index';
import { logIn } from '@/lib/api/auth';
import { WindeathLogo } from '@/assets';
import * as _ from './styles';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await logIn({ id: username, password });
      // 로그인 성공 시 메인 페이지로 이동
      router.push('/');
    } catch (err) {
      setError('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = () => {
    // TODO: 회원가입 페이지로 이동
    router.push('/signup');
  };

  return (
    <_.Container>
      <_.WindowContainer>
        <_.ContentWrapper>
          <WindowHeader />
          <_.MainContent>
            <_.LogoSection>
              <img
                src={WindeathLogo.src}
                alt="Windeath 44"
              />
            </_.LogoSection>
            <_.Divider />
            <_.FormSection>
              <_.FormFields>
                <Input
                  label="아이디:"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  name="username"
                  required
                />
                <Input
                  label="비밀번호:"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  required
                />
              </_.FormFields>
              <_.ButtonGroup>
                <MemorialBtn
                  name="회원가입"
                  onClick={handleSignup}
                  type="submit"
                  active={true}
                  width="120px"
                  height="40px"
                  fontSize="18px"
                />
                <MemorialBtn
                  name="확인"
                  onClick={handleLogin}
                  type="submit"
                  active={true}
                  width="120px"
                  height="40px"
                  fontSize="18px"
                />
              </_.ButtonGroup>
            </_.FormSection>
          </_.MainContent>
        </_.ContentWrapper>
      </_.WindowContainer>
    </_.Container>
  );
}
