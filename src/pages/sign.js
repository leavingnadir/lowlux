import { LoginForm } from "@/components/login-form";
import Head from "next/head";

export default function LoginPage() {
  return (
    <>
    <Head>
        <title>Sign Up - LowLux</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
    </>
  );
}
