
import React from "react";
import { signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth, provider } from "../firebase"; 

function LoginButton() {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      console.log("✅ User logged in:", user.email);
      console.log("🪪 ID Token:", idToken);

      // שליחה ל-backend
      const res = await fetch("http://localhost:8000/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: idToken }),
      });

      const data = await res.json();
      console.log("🎉 Verified with backend:", data);
    } catch (err) {
      console.error("❌ Login failed:", err);
    }
  };

  return (
    <button onClick={handleLogin}>
      Login with Google
    </button>
  );
}

export default LoginButton;
