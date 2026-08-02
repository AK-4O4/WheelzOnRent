"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

const LoginForm = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    router.push("/account");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup className="gap-4">
        {/* Error banner */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Email */}
        <Field className="gap-2">
          <FieldLabel htmlFor="userEmail" className="leading-5">
            Email address*
          </FieldLabel>
          <Input
            type="email"
            id="userEmail"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>

        {/* Password */}
        <Field className="w-full gap-2">
          <FieldLabel htmlFor="password" className="leading-5">
            Password*
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="password"
              type={isVisible ? "text" : "password"}
              placeholder="••••••••••••••••"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />
            <InputGroupAddon align="inline-end" className="pr-1.5">
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => setIsVisible((prev) => !prev)}
                className="text-muted-foreground rounded-l-none hover:bg-transparent"
              >
                {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                <span className="sr-only">{isVisible ? "Hide password" : "Show password"}</span>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Field>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between gap-y-2">
          <Field orientation="horizontal" className="flex items-center gap-2">
            <Checkbox id="rememberMe" />
            <FieldLabel htmlFor="rememberMe" className="text-muted-foreground">
              Remember Me
            </FieldLabel>
          </Field>
          <a href="#" className="text-base text-nowrap hover:underline">
            Forgot Password?
          </a>
        </div>

        <Field>
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign in to Ceepii"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
