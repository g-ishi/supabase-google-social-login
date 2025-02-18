/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useCallback, useEffect } from 'react';

const JavascriptBaseLoginButton = () => {
  const router = useRouter();
  const supabase = createClient();

  // handleCallbackをuseCallbackで定義
  const handleCredentialResponse = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (response: any) => {
      try {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: response.credential,
        });

        if (error) throw error;

        console.log('Logged in:', data);
        router.refresh();
        router.push('/private'); // ログイン後のリダイレクト先
      } catch (error) {
        console.error('Error:', error);
      }
    },
    [router, supabase.auth]
  );

  // グローバルに関数を登録
  useEffect(() => {
    // @ts-ignore
    window.handleCredentialResponse = handleCredentialResponse;
  }, [handleCredentialResponse]);

  return (
    <>
      <Script
        src='https://accounts.google.com/gsi/client'
        strategy='afterInteractive'
        onLoad={() => {
          // @ts-ignore
          google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            callback: handleCredentialResponse,
          });
          // @ts-ignore
          google.accounts.id.renderButton(
            document.getElementById('signInDiv')!,
            { theme: 'outline', size: 'large' }
          );
          // @ts-ignore
          google.accounts.id.prompt(); // also display the One Tap dialog
        }}
      />
      {/* Google Sign-Inボタンのコンテナ */}
      <div id='signInDiv'></div>
    </>
  );
};

export default JavascriptBaseLoginButton;
