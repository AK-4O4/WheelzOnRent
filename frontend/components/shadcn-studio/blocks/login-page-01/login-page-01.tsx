import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

import Logo from "@/components/shadcn-studio/logo";
import AuthBackgroundShape from "@/assets/svg/auth-background-shape";
import LoginForm from "@/components/shadcn-studio/blocks/login-page-01/login-form";

const Login = () => {
  return (
    <div className="relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute">
        <AuthBackgroundShape />
      </div>

      <Card className="z-1 w-full gap-6 py-6 sm:max-w-lg">
        <CardHeader className="gap-6 px-6">
          <Logo className="gap-3" />

          <div>
            <CardTitle className="mb-2 text-2xl font-semibold">Sign in to Ceepii</CardTitle>
            <CardDescription className="text-base">
              Welcome back — your next ride is waiting.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-6">
          {/* Login Form */}
          <div className="space-y-4">
            <LoginForm />

            <p className="text-muted-foreground text-center text-base">
              New to Ceepii?{" "}
              <Link href="/register" className="text-card-foreground hover:underline">
                Create an account
              </Link>
            </p>

            <div className="flex items-center gap-4">
              <Separator className="flex-1" />
              <p className="text-base">or</p>
              <Separator className="flex-1" />
            </div>

            <Button variant="ghost" className="w-full" render={<a href="#" />} nativeButton={false}>
              Sign in with Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
