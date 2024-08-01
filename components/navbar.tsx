'use client'

import React from 'react';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' }); // Redirect to home page after sign out
  };

  const renderAuthButton = () => {
    if (status === "loading") {
      return (
        <div className="w-20 h-10 flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-white" />
        </div>
      );
    }

    if (status === "authenticated") {
      return (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      );
    }

    return (
      <a
        href="/login"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Login
      </a>
    );
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">MyApp</div>
        <div>
          {renderAuthButton()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;