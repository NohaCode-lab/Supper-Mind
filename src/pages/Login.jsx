import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart, FiLock, FiMail } from "react-icons/fi";
import { loginSchema } from "../utils/validators";
import { useAuthStore } from "../stores/useAuthStore";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function Login() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState("alex.dev@suppermind.com");
  const [password, setPassword] = useState("password123");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrors({});

    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      const fieldErrors = {};
      validation.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setUser({
        id: "demo-user-123",
        email,
        user_metadata: { full_name: email.split("@")[0] || "User" },
      });
      setIsLoading(false);
      navigate("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 flex items-center justify-center text-white mx-auto shadow-md">
            <FiHeart size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Welcome Back</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign in to continue your mental wellness journey.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            placeholder="you@example.com"
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            placeholder="••••••••"
          />

          <Button type="submit" isLoading={isLoading} className="w-full">
            Sign In to Account
          </Button>
        </form>

        <p className="text-xs text-center text-slate-500 dark:text-slate-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-teal-600 dark:text-teal-400 font-semibold hover:underline">
            Create one free
          </Link>
        </p>
      </div>
    </div>
  );
}