"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useGoogleOAuth } from "@/hooks/auth.hook";
import { getDashboardRoute, getMessage } from "@/lib/utils";

import { Spinner } from "../../ui/spinner";

export default function GoogleLoginComponent() {
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);
  const [buttonWidth, setButtonWidth] = useState(0);

  const { mutate: googleLogin, isPending: googleLoginPending } =
    useGoogleOAuth();

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const updateWidth = () => {
      const width = Math.floor(container.getBoundingClientRect().width);

      setButtonWidth(Math.max(0, Math.min(width, 400)));
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    if (googleLoginPending) return;

    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.error("Google login failed. Please try again.");
      return;
    }

    googleLogin(
      { idToken },
      {
        onSuccess: (response) => {
          toast.success(getMessage(response, "Google login successful."));

          router.push(getDashboardRoute(response.data.role));
        },
        onError: (error) => {
          toast.error(
            getMessage(error, "Google login failed. Please try again."),
          );
        },
      },
    );
  };

  const handleGoogleError = () => {
    toast.error("Google login failed. Please try again.");
  };

  return (
    <div ref={containerRef} className="w-full min-w-0">
      <div
        inert={googleLoginPending}
        aria-busy={googleLoginPending}
        className={`flex min-h-10 justify-center ${
          googleLoginPending ? "opacity-60" : ""
        }`}
      >
        {buttonWidth > 0 && (
          <GoogleLogin
            key={buttonWidth}
            width={String(buttonWidth)}
            size="large"
            theme="outline"
            shape="rectangular"
            text="continue_with"
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        )}
      </div>

      {googleLoginPending && (
        <p
          role="status"
          className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground"
        >
          <Spinner className="size-4" />
          Signing in with Google...
        </p>
      )}
    </div>
  );
}
