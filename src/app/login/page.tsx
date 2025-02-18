import { HtmlBaseLoginButton } from './HtmlBaseLoginButton';
import JavascriptBaseLoginButton from './JavascriptBaseLoginButton';

export default function LoginPage() {
  return (
    <section className='flex flex-col items-center justify-center h-screen space-y-8'>
      <p>
        Javascript Base Login Button
        <JavascriptBaseLoginButton />
      </p>
      <p>
        HTML Base Login Button
        <HtmlBaseLoginButton />
      </p>
    </section>
  );
}
