import React, { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const { isLoaded, signUp } = useSignUp();
    const navigate = useNavigate();

    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [verifying, setVerifying] = useState(false);

    const handleStart = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;
        try {
            await signUp.create({
                emailAddress,
                password,
            });
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
        } catch (err: any) {
            console.error("Sign up error:", err.errors); // Clerk returns helpful error messages
            alert(err.errors?.[0]?.message ?? "Sign up failed");
        }

    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleStart}>
                <input
                    type="email"
                    placeholder="Email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Start Sign Up (send code)</button>
            </form>
        </div>
    );
}
