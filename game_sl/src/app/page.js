"use client";
import { useState } from 'react';
import useGameStore from '@/store/useGameStore';
import InitProfile from '@/components/home/InitProfile';
import Dashboard from '@/components/home/Dashboard';

export default function HomePage() {
  const isInitialized = useGameStore((state) => state.isInitialized);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      {!isInitialized ? (
        <InitProfile />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}