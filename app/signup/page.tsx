'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WindowHeader from '@/components/layout/WindowHeader/index';
import Input from '@/components/ui/Input/index';
import { signUp, emailValidationRequest, verifyEmailCode } from '@/lib/api/user';
import { WindeathLogo } from '@/assets';
import * as _ from './styles';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEmailSent || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isEmailSent]);

  const formatTime = (seconds: number): string => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleSendEmail = async () => {
    if (!email) {
      alert('이메일을 입력해 주세요.');
      return;
    }
    if (!email.includes('@')) {
      alert('이메일 형식이 잘못되었습니다.');
      return;
    }
    if (isVerified) {
      alert('이미 인증을 하셨습니다.');
      return;
    }

    setIsLoading(true);
    try {
      await emailValidationRequest({ email });
      setIsEmailSent(true);
      setTimeLeft(180);
      alert('이메일이 성공적으로 전송되었습니다.');
    } catch (err) {
      alert('이메일 전송 실패: 다시 입력해 주세요!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (isVerified) {
      alert('이미 인증을 하셨습니다.');
      return;
    }
    if (verificationCode.length !== 5) {
      alert('인증코드 5자리를 입력하지 않았습니다.');
      return;
    }

    setIsLoading(true);
    try {
      await verifyEmailCode({ email, authorizationCode: verificationCode });
      setIsVerified(true);
      alert('인증이 완료되었습니다.');
    } catch (err) {
      alert('인증 실패: 다시 입력해 주세요');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    // 유효성 검사
    if (!name) {
      alert('사용자 이름을 입력해 주세요.');
      return;
    }
    if (!userId) {
      alert('아이디를 입력해 주세요.');
      return;
    }
    if (userId.length < 6 || userId.length > 16) {
      alert('아이디는 6~16자 이내로 입력해주세요.');
      return;
    }
    if (!email) {
      alert('이메일을 입력해 주세요.');
      return;
    }
    if (!email.includes('@')) {
      alert('이메일 형식이 잘못되었습니다.');
      return;
    }
    if (!isVerified) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }
    if (!password) {
      alert('비밀번호를 입력해 주세요.');
      return;
    }
    if (password.length < 8 || password.length > 20) {
      alert('비밀번호는 8~20자 이내로 입력해주세요.');
      return;
    }
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await signUp({ name, userId, email, password });
      alert('회원가입이 완료되었습니다.');
      router.push('/login');
    } catch (err) {
      alert('회원가입 실패: 다시 시도해 주세요');
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/login');
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
                  label="사용자 이름:"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  label="아이디:"
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="아이디 (6~16자)"
                  required
                />
                <_.InputRow>
                  <Input
                    label="이메일:"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    required
                  />
                  <_.SmallButton
                    onClick={handleSendEmail}
                    disabled={isLoading}
                  >
                    {isVerified ? '인증완료' : isEmailSent ? '코드 재전송' : '코드 전송'}
                  </_.SmallButton>
                </_.InputRow>
                <_.InputRow>
                  <Input
                    label="인증 코드:"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={5}
                    required
                  />
                  <_.TimerBox>{formatTime(timeLeft)}</_.TimerBox>
                  <_.SmallButton
                    onClick={handleVerifyCode}
                    disabled={isLoading || isVerified}
                  >
                    확인
                  </_.SmallButton>
                </_.InputRow>
                <Input
                  label="비밀번호:"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호 (8~20자)"
                  required
                />
                <Input
                  label="비밀번호 재입력:"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </_.FormFields>
              <_.ButtonGroup>
                <_.StyledButton onClick={handleCancel}>취소</_.StyledButton>
                <_.PrimaryButton
                  onClick={handleSignUp}
                  disabled={isLoading}
                >
                  확인
                </_.PrimaryButton>
              </_.ButtonGroup>
            </_.FormSection>
          </_.MainContent>
        </_.ContentWrapper>
      </_.WindowContainer>
    </_.Container>
  );
}
