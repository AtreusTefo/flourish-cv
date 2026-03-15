import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema, signupSchema, type LoginFormData, type SignupFormData } from "@/validation/authSchema";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", fullName: "" },
  });

  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [user, navigate, location.state]);

  const handleSubmit = async (data: LoginFormData | SignupFormData) => {
    setLoading(true);
    setGeneralError(null);

    try {
      if (isLogin) {
        const { email, password } = data as LoginFormData;
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            setGeneralError("Invalid email or password. Please check your credentials and try again.");
          } else if (error.message.includes("Email not confirmed")) {
            setGeneralError("Please check your email and click the confirmation link before signing in.");
          } else {
            setGeneralError(error.message || "An error occurred during sign in");
          }
          return;
        }
        toast.success("Welcome back!");
      } else {
        const { email, password, fullName } = data as SignupFormData;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });
        if (error) {
          if (error.message.includes("User already registered")) {
            setGeneralError("An account with this email already exists. Please sign in instead.");
          } else {
            setGeneralError(error.message || "An error occurred during sign up");
          }
          return;
        }
        toast.success("Account created! Please check your email to verify your account.");
      }
    } catch {
      setGeneralError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin((prev) => !prev);
    setGeneralError(null);
    loginForm.reset();
    signupForm.reset();
  };

  const loginErrors = loginForm.formState.errors;
  const signupErrors = signupForm.formState.errors;
  const fieldErrors = isLogin ? loginErrors : signupErrors;

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">{isLogin ? "Welcome Back" : "Create Account"}</CardTitle>
          <CardDescription>
            {isLogin ? "Sign in to access your resumes" : "Start building your professional resume"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={isLogin ? loginForm.handleSubmit(handleSubmit) : signupForm.handleSubmit(handleSubmit)} className="space-y-4">
            {generalError && (
              <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md" role="alert">
                <AlertCircle className="h-4 w-4" aria-hidden="true" />
                <span>{generalError}</span>
              </div>
            )}

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  {...signupForm.register("fullName")}
                  aria-invalid={!!signupErrors.fullName}
                  className={signupErrors.fullName ? "border-red-500" : ""}
                />
                {signupErrors.fullName && (
                  <p className="text-sm text-red-600" role="alert">{signupErrors.fullName.message}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...(isLogin ? loginForm.register("email") : signupForm.register("email"))}
                aria-invalid={!!fieldErrors.email}
                className={fieldErrors.email ? "border-red-500" : ""}
              />
              {fieldErrors.email && (
                <p className="text-sm text-red-600" role="alert">{fieldErrors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...(isLogin ? loginForm.register("password") : signupForm.register("password"))}
                aria-invalid={!!fieldErrors.password}
                className={fieldErrors.password ? "border-red-500" : ""}
              />
              {fieldErrors.password && (
                <p className="text-sm text-red-600" role="alert">{fieldErrors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full bg-gradient-primary" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isLogin ? "Signing In..." : "Creating Account..."}
                </>
              ) : (
                isLogin ? "Sign In" : "Sign Up"
              )}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <button
              type="button"
              onClick={switchMode}
              className="text-primary hover:underline"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" onClick={() => navigate("/")} className="w-full">
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
