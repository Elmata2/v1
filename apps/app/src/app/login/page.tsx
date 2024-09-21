import { GoogleSignin } from "@/components/google-signin";
import React from "react";


export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to Our App</h1>
        <p className="mb-4">Please sign in to continue</p>
        <GoogleSignin />
      </div>
    </div>
  );
}