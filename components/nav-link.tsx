"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

export type NavLinkProps = {
  href: string;
  slug?: string;
  className?: string;
  activeClassName?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

function NavLinkInner({
  href,
  slug,
  className = "shrink-0 px-3 py-1 font-medium text-foreground/80 hover:text-accent transition-colors",
  activeClassName = "shrink-0 px-3 py-1 font-bold text-accent border-b-2 border-accent transition-colors",
  children,
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category");

  let isActive = false;

  if (href === "/") {
    isActive = pathname === "/";
  } else if (href === "/all-coins" && (!slug || slug === "all")) {
    isActive = pathname === "/all-coins" && !currentCategory;
  } else if (slug) {
    isActive =
      pathname === "/all-coins" &&
      currentCategory?.toLowerCase() === slug.toLowerCase();
  } else if (href.includes("?category=")) {
    const targetSlug = href.split("?category=")[1]?.toLowerCase();
    isActive =
      pathname === "/all-coins" &&
      currentCategory?.toLowerCase() === targetSlug;
  } else {
    isActive = pathname === href;
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={isActive ? activeClassName : className}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

export function NavLink(props: NavLinkProps) {
  return (
    <Suspense
      fallback={
        <Link
          href={props.href}
          onClick={props.onClick}
          className={props.className}
        >
          {props.children}
        </Link>
      }
    >
      <NavLinkInner {...props} />
    </Suspense>
  );
}

