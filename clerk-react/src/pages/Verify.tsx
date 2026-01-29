import React, { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function Verify() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    try {
      const attempt = await signUp.attemptEmailAddressVerification({ code });

      if (attempt.status === "complete") {
        // set new session active
        await setActive({ session: attempt.createdSessionId });
        navigate("/dashboard");
      } else {
        console.log("verification attempt:", attempt);
        alert("Not complete - check console for details");
      }
    } catch (err) {
      console.error(err);
      alert("Verification failed. See console.");
    }
  };

  return (
    <div>
      <h2>Verify Email</h2>
      <form onSubmit={handleVerify}>
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code" />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}
