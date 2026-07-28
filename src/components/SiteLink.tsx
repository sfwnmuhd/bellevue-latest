"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSmoothScroll } from "./SmoothScrollProvider";

type Props = {
  href: string;
  className?: string;
  /** Runs after the link is activated — used to close the mobile menu. */
  onNavigate?: () => void;
  children: React.ReactNode;
};

/**
 * Menu entries mix three kinds of destination: another route, an anchor on the
 * page you are already on, and an external link. Only the middle case should be
 * hijacked for smooth scrolling — the rest go through `Link` so they prefetch.
 */
export default function SiteLink({
  href,
  className,
  onNavigate,
  children,
}: Props) {
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();

  if (/^(https?:)?\/\//.test(href) || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onNavigate}
      >
        {children}
      </a>
    );
  }

  const hashAt = href.indexOf("#");
  const hash = hashAt >= 0 ? href.slice(hashAt) : "";
  const path = hashAt >= 0 ? href.slice(0, hashAt) || "/" : href;

  if (hash && path === pathname) {
    return (
      <a
        href={href}
        className={className}
        onClick={(event) => {
          event.preventDefault();
          onNavigate?.();
          scrollTo(hash);
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onNavigate}>
      {children}
    </Link>
  );
}
