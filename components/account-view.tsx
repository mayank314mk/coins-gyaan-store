"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "../lib/auth-client";
import { Breadcrumb } from "./breadcrumb";

export function AccountView({ isAdmin }: { isAdmin: boolean }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/login");
    }
  }, [isPending, router, session?.user]);

  if (isPending) {
    return (
      <div className="mx-auto w-full max-w-[1440px] px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <div className="h-64 max-w-2xl animate-pulse rounded-2xl border border-border-subtle bg-surface" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="mx-auto w-full max-w-[1440px] px-4 py-4 text-sm text-text-muted">
        Taking you to login...
      </div>
    );
  }

  async function logout() {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  const name = session.user.name || "Collector";
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
      <div className="mb-6 sm:mb-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "My Account" }]} />
      </div>

      <h1 className="text-2xl font-bold text-brand-strong sm:text-[28px]">My Account</h1>

      <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-[360px_1fr] lg:gap-8">
        {/* Profile card */}
        <section className="rounded-2xl border border-border-subtle bg-white p-6 sm:p-7">
          <p className="text-xs font-bold tracking-wide text-accent">ACCOUNT DETAILS</p>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-accent/10">
              <span className="text-xl font-bold text-brand-strong">{initial}</span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-bold text-brand-strong">{name}</p>
              <p className="truncate text-sm text-text-muted">{session.user.email}</p>
            </div>
          </div>

          {isAdmin && (
            <Link
              href="/admin"
              className="mt-6 flex items-center gap-3 border-t border-border-subtle pt-5 text-sm font-bold text-brand-strong transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              <AdminIcon className="h-5 w-5 text-accent" />
              <span className="flex-1">Admin Dashboard</span>
              <ChevronIcon className="h-4 w-4 shrink-0 text-text-muted" />
            </Link>
          )}
        </section>

        {/* Account actions */}
        <section className="overflow-hidden rounded-2xl border border-border-subtle bg-white">
          <AccountRow href="/orders" label="View Orders" description="Track and review past purchases" icon={PackageIcon} />
          <AccountRow href="/cart" label="View Cart" description="Items ready for checkout" icon={CartIcon} />
          <AccountRow href="/wishlist" label="Wishlist" description="Coins you're keeping an eye on" icon={HeartIcon} />
          <AccountRow onClick={logout} label="Logout" description="Sign out of this device" icon={LogoutIcon} />
        </section>
      </div>
    </div>
  );
}

function AccountRow({
  href,
  onClick,
  label,
  description,
  icon: Icon,
}: {
  href?: string;
  onClick?: () => void;
  label: string;
  description: string;
  icon: (props: { className?: string }) => React.JSX.Element;
}) {
  const content = (
    <>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
        <Icon className="h-5 w-5 text-accent" />
      </div>
      <span className="flex-1">
        <span className="block text-sm font-bold text-brand-strong">{label}</span>
        <span className="block text-xs text-text-muted">{description}</span>
      </span>
      <ChevronIcon className="h-4 w-4 shrink-0 text-text-muted" />
    </>
  );

  const className = "flex w-full items-center gap-4 border-b border-border-subtle px-5 py-4 text-left transition-colors last:border-b-0 hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent";

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}

/* Icons — flat outline style matching the site's trust-bar icons */

function PackageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8.5 12 4 3 8.5 12 13l9-4.5Z" />
      <path d="M3 8.5V16l9 4.5 9-4.5V8.5" />
      <path d="M12 13v7.5" />
    </svg>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="20" r="1.25" />
      <circle cx="18" cy="20" r="1.25" />
      <path d="M2.5 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21 7H6" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20.5s-7.5-4.6-10-9.3C.5 7.8 2.3 4.5 5.6 4c2-.3 3.9.7 5 2.3l1.4 2 1.4-2c1.1-1.6 3-2.6 5-2.3 3.3.5 5.1 3.8 3.6 7.2-2.5 4.7-10 9.3-10 9.3Z" />
    </svg>
  );
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}

function AdminIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 8h3M7 12h10M7 16h6" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}