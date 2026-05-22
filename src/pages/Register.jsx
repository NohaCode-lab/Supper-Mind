
import { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    console.log("Register:", email, password);
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10">

      <h1 className="text-2xl font-bold mb-6 text-white">
        Register
      </h1>

      <div className="space-y-3">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <Button onClick={handleRegister} className="w-full">
          Create Account
        </Button>
      </div>

    </div>
  );
}

export default Register;