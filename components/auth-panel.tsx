"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "../lib/auth-client";

export function AuthPanel() {
  const { data: session, isPending } = authClient.useSession();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleGoogleSignIn() {
    setErrorMessage(null);
    setIsSigningIn(true);

    const redirect = new URLSearchParams(window.location.search).get("redirect");
    const callbackURL = redirect?.startsWith("/") ? redirect : "/account";
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL,
    });

    if (error) {
      setErrorMessage(error.message || "Google sign-in could not be completed.");
      setIsSigningIn(false);
    }
  }

  async function handleSignOut() {
    setErrorMessage(null);
    setIsSigningOut(true);
    const { error } = await authClient.signOut();

    if (error) {
      setErrorMessage(error.message || "Logout could not be completed.");
    }
    setIsSigningOut(false);
  }

  if (isPending) {
    return (
      <section className="mx-auto flex min-h-[28rem] w-full max-w-md items-center justify-center rounded-3xl border border-border-subtle bg-white p-8 shadow-[0_18px_50px_rgba(20,57,47,0.08)]">
        <p className="text-sm text-text-muted">Checking your account…</p>
      </section>
    );
  }

  if (session?.user) {
    return (
      <section className="mx-auto w-full max-w-md rounded-3xl border border-border-subtle bg-white p-8 shadow-[0_18px_50px_rgba(20,57,47,0.08)] sm:p-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent">Collector account</p>
        <h1 className="text-3xl font-bold tracking-tight text-brand-strong">Welcome back, {session.user.name || "collector"}.</h1>
        <p className="mt-3 break-all text-sm text-text-muted">{session.user.email}</p>
        <p className="mt-6 rounded-2xl bg-surface-muted px-4 py-3 text-sm leading-6 text-foreground/75">
          You are signed in with Google and can continue browsing the collection.
        </p>
        {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="inline-flex flex-1 items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-strong">
            Continue browsing
          </Link>
          <button type="button" onClick={handleSignOut} disabled={isSigningOut} className="inline-flex flex-1 items-center justify-center rounded-full border border-brand/20 px-5 py-3 text-sm font-semibold text-brand-strong transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60">
            {isSigningOut ? "Logging out…" : "Log out"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-md rounded-3xl border border-border-subtle bg-white p-8 shadow-[0_18px_50px_rgba(20,57,47,0.08)] sm:p-10">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent">Coins Gyaan Store</p>
      <h1 className="text-3xl font-bold tracking-tight text-brand-strong">Sign in to your collection.</h1>
      <p className="mt-3 text-sm leading-6 text-text-muted">Use your Google account to access your collector account.</p>
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      <button type="button" onClick={handleGoogleSignIn} disabled={isSigningIn} className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-60">
        <GoogleIcon />
        {isSigningIn ? "Connecting to Google…" : "Continue with Google"}
      </button>
      <p className="mt-6 text-center text-xs leading-5 text-text-muted">By continuing, you’ll be redirected to Google to securely authenticate.</p>
    </section>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700">{message}</p>;
}

function GoogleIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5"><path fill="#4285F4" d="M21.35 12.23c0-.72-.06-1.42-.18-2.09H12v3.96h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.15c1.85-1.7 2.9-4.2 2.9-7.26Z"/><path fill="#34A853" d="M12 21.6c2.65 0 4.88-.88 6.5-2.39l-3.15-2.45c-.88.59-2 .94-3.35.94-2.57 0-4.75-1.74-5.53-4.08H3.22v2.53A9.82 9.82 0 0 0 12 21.6Z"/><path fill="#FBBC05" d="M6.47 13.62A5.9 5.9 0 0 1 6.16 12c0-.56.11-1.1.31-1.62V7.85H3.22A9.6 9.6 0 0 0 2.2 12c0 1.5.36 2.92 1.02 4.15l3.25-2.53Z"/><path fill="#EA4335" d="M12 6.3c1.44 0 2.74.5 3.76 1.48l2.82-2.82C16.88 3.36 14.65 2.4 12 2.4a9.82 9.82 0 0 0-8.78 5.45l3.25 2.53C7.25 8.04 9.43 6.3 12 6.3Z"/></svg>;
}
