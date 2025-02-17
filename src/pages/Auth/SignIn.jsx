import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

// Adjust these import paths as needed based on your project structure
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.error("SignIn error:", err);
      setError(err.message || "Failed to sign in");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-[-6rem]">
      <h1 className="mt-4 mb-8 text-4xl font-black">
        <span className="text-white">FOCUS.</span>
        <span className="text-[#F51555]">FEED</span>
      </h1>
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-center">Sign In</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Sign In</Button>
        </form>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="text-[#F51555]">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
