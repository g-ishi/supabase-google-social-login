import GoogleSignIn from './GoogleSignIn';
import { PrebuildLogin } from './Prebuild';

export default function LoginPage() {
  return (
    <>
      <GoogleSignIn />
      <PrebuildLogin />
    </>
  );
}
