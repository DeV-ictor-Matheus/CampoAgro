'use client';

import { type AnchorHTMLAttributes, type MouseEvent } from 'react';

import { useClarityTrack } from '@/hooks/useClarityTrack';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  trackEvent: string;
  trackTags?: Record<string, string>;
};

export default function TrackLink({ trackEvent, trackTags, onClick, children, ...props }: Props) {
  const track = useClarityTrack();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    track(trackEvent, trackTags);
    onClick?.(e);
  }

  return (
    <a {...props} onClick={handleClick}>
      {children}
    </a>
  );
}
