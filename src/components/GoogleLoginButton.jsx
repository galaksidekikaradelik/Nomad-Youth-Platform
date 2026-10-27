import { useState } from "react";

import {
  GoogleOAuthProvider,
  GoogleLogin,
} from "@react-oauth/google";

import { useAuth } from "../hooks/useAuth";

const GOOGLE_CLIENT_ID =
  "634861401015-03376om3e90l3vb3ifuckfeup5nm62ul.apps.googleusercontent.com";

function GoogleLoginContent({
  onSuccess,
  onError,
}) {
  const { googleLogin } = useAuth();

  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSuccess = async (credentialResponse) => {
    if (isSubmitting) return;

    setErrorMsg("");

    const credential = credentialResponse?.credential;

    if (!credential) {
      const error = new Error(
        "Google credential is missing"
      );

      setErrorMsg(
        "Google ilə daxil olmaq mümkün olmadı."
      );

      onError?.(error);
      return;
    }

    setIsSubmitting(true);

    try {
      const user = await googleLogin(credential);

      onSuccess?.(user);
    } catch (err) {
      console.error(
        "Google login uğursuz oldu:",
        err
      );

      setErrorMsg(
        "Google ilə daxil olmaq mümkün olmadı. Yenidən cəhd edin."
      );

      onError?.(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleError = () => {
    const error = new Error("Google OAuth failed");

    setErrorMsg(
      "Google ilə daxil olmaq mümkün olmadı."
    );

    onError?.(error);
  };

  return (
    <div className="google-login-wrapper">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}

        use_fedcm_for_button={true}

        useOneTap={false}

        theme="outline"
        size="large"
        text="continue_with"
        shape="rectangular"
        width="100%"
      />

      {isSubmitting && (
        <p role="status" className="auth-hint">
          Google hesabı yoxlanılır...
        </p>
      )}

      {errorMsg && (
        <p className="auth-error" role="alert">
          {errorMsg}
        </p>
      )}
    </div>
  );
}

export default function GoogleLoginButton({
  onSuccess,
  onError,
}) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleLoginContent
        onSuccess={onSuccess}
        onError={onError}
      />
    </GoogleOAuthProvider>
  );
}