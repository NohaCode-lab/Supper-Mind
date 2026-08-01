import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { registerSchema } from "../utils/validators";
import { useAuthStore } from "../stores/useAuthStore";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function Register() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setErrors({});

    const validation = registerSchema.safeParse({
      fullName,
      email,
      password,
      confirmPassword,
    });

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
        id: `user-${Date.now()}`,
        email,
        user_metadata: { full_name: fullName },
      });
      setIsLoading(false);
      navigate("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 flex items-center justify-center text-white mx-auto shadow-md">
            <FiHeart size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Create Account</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Start your personalized wellness journey today.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={errors.fullName}
            placeholder="Alex Vance"
          />

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

          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            placeholder="••••••••"
          />

          <Button type="submit" isLoading={isLoading} className="w-full">
            Create Free Account
          </Button>
        </form>

        <p className="text-xs text-center text-slate-500 dark:text-slate-400">
          Already registered?{" "}
          <Link to="/login" className="text-teal-600 dark:text-teal-400 font-semibold hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}