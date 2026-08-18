import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { authApi } from "../../api/auth.api";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Verification token is missing.");
      return;
    }

    const verify = async () => {
      try {
        const response = await authApi.verifyEmail(token);

        setStatus("success");

        setMessage(
          response.data?.message ||
            "Your email has been verified successfully."
        );
      } catch (error) {
        setStatus("error");

        setMessage(
          error.response?.data?.message ||
            "Unable to verify your email."
        );
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-background">
      <div className="w-full max-w-md text-center">

        {/* Loading */}
        {status === "loading" && (
          <>
            <Loader2 className="mx-auto w-14 h-14 animate-spin text-primary" />

            <h1 className="mt-6 text-2xl font-semibold">
              Verifying your email...
            </h1>

            <p className="mt-2 text-muted-foreground">
              Please wait while we verify your email address.
            </p>
          </>
        )}

        {/* Success */}
        {status === "success" && (
          <>
            <CheckCircle2 className="w-16 h-16 mx-auto text-green-500" />

            <h1 className="mt-6 text-2xl font-semibold">
              Email Verified!
            </h1>

            <p className="mt-2 text-muted-foreground">
              {message}
            </p>

            <Link
              to="/settings"
              className="inline-flex px-6 py-3 mt-6 text-sm font-medium rounded-lg bg-primary text-primary-foreground"
            >
              Continue to Settings
            </Link>
          </>
        )}

        {/* Error */}
        {status === "error" && (
          <>
            <XCircle className="w-16 h-16 mx-auto text-red-500" />

            <h1 className="mt-6 text-2xl font-semibold">
              Verification Failed
            </h1>

            <p className="mt-2 text-muted-foreground">
              {message}
            </p>

            <Link
              to="/settings"
              className="inline-flex px-6 py-3 mt-6 text-sm font-medium rounded-lg bg-primary text-primary-foreground"
            >
              Back to Settings
            </Link>
          </>
        )}

      </div>
    </div>
  );
};

export default VerifyEmail;