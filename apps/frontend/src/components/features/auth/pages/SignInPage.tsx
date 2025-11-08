"use client";

import AuthLayout from "@/components/features/auth/components/AuthLayout";
import { SignInForm } from "@/components/features/auth/forms";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useSignIn } from "@/hooks/react-query/useAuth";
import { signInSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookAudioIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function SignInPage() {
  const router = useRouter();
  const { mutateAsync: signInMutation, isPending: signInPending } = useSignIn();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSignIn(data: z.infer<typeof signInSchema>) {
    signInMutation(data, {
      onSuccess: () => {
        router.push("/");
        form.reset();
      },
      onError: (error) => {
        form.setError("email", {
          type: "manual",
          message: error.message || "Sign in failed",
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
            alt=""
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        <div className="mx-auto my-auto flex h-full max-h-2/5 w-full max-w-sm flex-col items-center justify-between">
          <div className="flex flex-col items-center text-center">
            <BookAudioIcon className="size-12 mb-2" />
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground text-balance">
              Login to your Acme Inc account
            </p>
          </div>
          <Form {...form}>
            <SignInForm onSignIn={onSignIn} isLoading={signInPending} />
          </Form>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Button variant="link" className="p-0" asChild>
              <Link href="/sign_up">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
