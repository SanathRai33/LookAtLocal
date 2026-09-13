import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RotateCcw, ShieldCheck } from "lucide-react";
import { useUser } from "../../hooks/useUser";
import { useAuth } from '../../context/AuthContext'

const ReactivateAccount = () => {
    const navigate = useNavigate();

    const { updateMyAccountStatus, loading } = useUser();
    const { user } = useAuth();


    const handleReactivate = async () => {
        const result = await updateMyAccountStatus("ACTIVE");

        if (!result.success) {
            alert(result.error);
            return;
        }
        navigate("/");
    };

    useEffect(() => {
        if (user?.status === "ACTIVE") {
            return navigate('/dashboard');
        }
    }, [])


    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-slate-950">
            <div className="w-full max-w-md p-8 text-center bg-slate-900 rounded-2xl">

                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-amber-100">
                    <ShieldCheck className="w-8 h-8 text-amber-600" />
                </div>

                <h1 className="text-2xl font-bold text-white">
                    Your account is deactivated
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                    Your account is currently inactive.
                    Reactivate your account to continue
                    using LookAtLocal.
                </p>

                <button
                    type="button"
                    onClick={handleReactivate}
                    disabled={loading}
                    className="flex items-center justify-center w-full gap-2 px-5 py-3 mt-6 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    <RotateCcw className="w-4 h-4" />

                    {loading
                        ? "Reactivating..."
                        : "Reactivate Account"}
                </button>

            </div>
        </div>
    );
};

export default ReactivateAccount;