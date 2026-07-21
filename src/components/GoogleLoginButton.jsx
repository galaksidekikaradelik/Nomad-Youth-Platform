import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

export default function GoogleLoginButton({ onSuccess, onError }) {
  const { googleLogin } = useAuth();
  const [errorMsg, setErrorMsg] = useState('');

  const handleSuccess = async (credentialResponse) => {
    setErrorMsg('');
    try {
      const user = await googleLogin(credentialResponse.credential);
      onSuccess?.(user);
    } catch (err) {
      console.error('Google login uğursuz oldu:', err);
      setErrorMsg('Google ilə daxil olmaq mümkün olmadı. Yenidən cəhd edin.');
      onError?.(err);
    }
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          setErrorMsg('Google ilə daxil olmaq mümkün olmadı.');
          onError?.(new Error('Google OAuth failed'));
        }}
        useOneTap={false}
        theme="outline"
        size="large"
        text="continue_with"
        shape="rectangular"
        width="100%"
      />
      {errorMsg && <p className="auth-error">{errorMsg}</p>}
    </div>
  );
}