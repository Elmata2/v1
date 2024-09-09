"use client";

import { useState } from "react";
import { createClient } from "@v1/supabase/client";
import { Button } from "@v1/ui/button";
import React from "react";

export function GoogleSignin() {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleSignin = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      // You can add a toast notification here to show the error to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleSignin} variant="outline" className="font-mono" disabled={isLoading}>
      {isLoading ? "Signing in..." : "Sign in with Google"}
    </Button>
  );
}
