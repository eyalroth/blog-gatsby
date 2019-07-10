import React from 'react'

export default function Blog() {
  if (typeof window !== 'undefined') {
    window.location = '/blog/software';
  }

  return null;
}