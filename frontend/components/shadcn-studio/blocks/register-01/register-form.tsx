"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

const RegisterForm = () => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreed) {
      setError("Please agree to the privacy policy and terms to continue.");
      return;
    }

    setLoading(true);

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    // If email confirmation is disabled in Supabase, the user is signed in automatically.
    // Otherwise, show a prompt to check their email.
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

        {/* Full Name */}
        <Field className="gap-2">
          <FieldLabel className="leading-5" htmlFor="fullName">
            Full name*
          </FieldLabel>
          <Input
            type="text"
            id="fullName"
            placeholder="Jordan Mercer"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </Field>

        {/* Email */}
        <Field className="gap-2">
          <FieldLabel className="leading-5" htmlFor="userEmail">
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
          <FieldLabel className="leading-5" htmlFor="password">
            Password*
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="password"
              type={isPasswordVisible ? "text" : "password"}
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
                onClick={() => setIsPasswordVisible((prev) => !prev)}
                className="text-muted-foreground rounded-l-none hover:bg-transparent"
              >
                {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                <span className="sr-only">
                  {isPasswordVisible ? "Hide password" : "Show password"}
                </span>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Field>

        {/* Confirm Password */}
        <Field className="w-full gap-2">
          <FieldLabel className="leading-5" htmlFor="confirmPassword">
            Confirm Password*
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="confirmPassword"
              type={isConfirmPasswordVisible ? "text" : "password"}
              placeholder="••••••••••••••••"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              required
            />
            <InputGroupAddon align="inline-end" className="pr-1.5">
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
                className="text-muted-foreground rounded-l-none hover:bg-transparent"
              >
                {isConfirmPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                <span className="sr-only">
                  {isConfirmPasswordVisible ? "Hide password" : "Show password"}
                </span>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Field>

        {/* Privacy policy */}
        <Field orientation="horizontal" className="flex items-center gap-2">
          <Checkbox
            id="agreeTerms"
            checked={agreed}
            onCheckedChange={(v) => setAgreed(!!v)}
          />
          <FieldLabel htmlFor="agreeTerms">
            <span className="text-muted-foreground">I agree to the </span>
            <a href="#" className="hover:underline">
              privacy policy &amp; terms
            </a>
          </FieldLabel>
        </Field>

        <Field>
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Creating account…" : "Create account"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
