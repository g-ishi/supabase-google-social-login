'use client';
import { createClient } from '@/utils/supabase/client';
import Script from 'next/script';
import { useEffect } from 'react';

// グローバルな型定義を追加
declare global {
  interface Window {
    handleSignInWithGoogle: (response: GoogleResponse) => Promise<void>;
  }
}

interface GoogleResponse {
  credential: string;
}

export const PrebuildLogin = () => {
  // コンポーネントがマウントされる時にコールバックを設定
  useEffect(() => {
    window.handleSignInWithGoogle = async (response: GoogleResponse) => {
      const supabase = createClient();

      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
      });

      console.log(data);
      console.log(error);
    };

    // クリーンアップ関数
    return () => {
      // delete window.handleSignInWithGoogle;
      delete (window as any).handleSignInWithGoogle;
    };
  }, []);

  return (
    <>
      <Script
        src='https://accounts.google.com/gsi/client'
        strategy='afterInteractive'
      />
      <div
        id='g_id_onload'
        data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        data-context='signin'
        data-ux_mode='popup'
        data-callback='handleSignInWithGoogle'
        data-itp_support='true'
        data-use_fedcm_for_prompt='true'
      ></div>

      <div
        className='g_id_signin'
        data-type='standard'
        data-shape='pill'
        data-theme='outline'
        data-text='signin_with'
        data-size='large'
        data-logo_alignment='left'
      ></div>
    </>
  );
};
