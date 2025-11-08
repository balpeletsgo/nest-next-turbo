"use client";

import AuthLayout from "@/components/features/auth/components/AuthLayout";
import { SignUpForm } from "@/components/features/auth/forms";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useSignUp } from "@/hooks/react-query/useAuth";
import { signUpSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookAudioIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function SignUpPage() {
  const router = useRouter();
  const { mutateAsync: signUpMutation, isPending: signUpPending } = useSignUp();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSignUp(data: z.infer<typeof signUpSchema>) {
    signUpMutation(data, {
      onSuccess: (response) => {
        toast.success(response.message, {
          description: "You can now sign in with your new account.",
        });
        form.reset();
        router.push("/sign_in");
      },
      onError: (error) => {
        console.log("Sign up error:", error);
        form.setError("email", {
          type: "manual",
          message: error.message || "Sign up failed",
        });
      },
    });
  }

  return (
    <AuthLayout>
      <div className="grid h-full w-full p-0 md:grid-cols-2">
        <div className="bg-muted relative hidden md:block">
          <img
            src="/placeholder.svg"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        <div className="mx-auto my-auto flex h-full max-h-3/4 w-full max-w-md flex-col items-center justify-between">
          <div className="flex flex-col items-center text-center">
            <BookAudioIcon className="size-12 mb-2" />
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-muted-foreground text-balance">
              Create an account to get started
            </p>
          </div>
          <Form {...form}>
            <SignUpForm onSignUp={onSignUp} isLoading={signUpPending} />
          </Form>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Button variant="link" className="p-0" asChild>
              <Link href="/sign_in">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
