import React, {
    useEffect,
    useMemo,
    useState,
} from "react";
import {
    AlertCircle,
    CalendarDays,
    CheckCircle2,
    Loader2,
    X,
} from "lucide-react";

const initialForm = {
    startDate: "",
    endDate: "",
    quantity: 1,
};

const RentalBookingModal = ({
    rental,
    open,
    onClose,
    createBooking,
    getAvailability,
    loading,
}) => {
    const [form, setForm] =
        useState(initialForm);

    const [availability, setAvailability] =
        useState(null);

    const [
        checkingAvailability,
        setCheckingAvailability,
    ] = useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState(null);

    useEffect(() => {
        if (!open) {
            setForm(initialForm);
            setAvailability(null);
            setError("");
            setSuccess(null);
        }
    }, [open]);

    const rentalDays = useMemo(() => {
        if (
            !form.startDate ||
            !form.endDate
        ) {
            return 0;
        }

        const start = new Date(
            `${form.startDate}T00:00:00`
        );

        const end = new Date(
            `${form.endDate}T00:00:00`
        );

        const difference =
            end.getTime() - start.getTime();

        return Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );
    }, [
        form.startDate,
        form.endDate,
    ]);

    const estimatedTotal = useMemo(() => {
        if (
            rentalDays <= 0 ||
            !rental?.pricePerDay
        ) {
            return 0;
        }

        return (
            Number(rental.pricePerDay) *
            rentalDays *
            Number(form.quantity)
        );
    }, [
        rental,
        rentalDays,
        form.quantity,
    ]);

    const estimatedDeposit = useMemo(() => {
        if (!rental?.depositAmount) {
            return 0;
        }

        return (
            Number(rental.depositAmount) *
            Number(form.quantity)
        );
    }, [
        rental,
        form.quantity,
    ]);

    const handleChange = (event) => {
        const {
            name,
            value,
        } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setAvailability(null);
        setError("");
    };

    const validate = () => {
        if (!form.startDate) {
            return "Please select a start date.";
        }

        if (!form.endDate) {
            return "Please select an end date.";
        }

        if (rentalDays <= 0) {
            return "End date must be after start date.";
        }

        if (
            Number(form.quantity) <= 0
        ) {
            return "Quantity must be greater than 0.";
        }

        if (
            Number(form.quantity) >
            Number(rental.quantity)
        ) {
            return `Maximum available quantity is ${rental.quantity}.`;
        }

        return "";
    };

    const checkAvailability = async () => {
        const validationError =
            validate();

        if (validationError) {
            setError(validationError);
            return false;
        }

        setCheckingAvailability(true);
        setAvailability(null);
        setError("");

        const result =
            await getAvailability(
                rental.id,
                {
                    startDate: new Date(
                        `${form.startDate}T00:00:00`
                    ).toISOString(),

                    endDate: new Date(
                        `${form.endDate}T00:00:00`
                    ).toISOString(),

                    quantity: Number(
                        form.quantity
                    ),
                }
            );

        setCheckingAvailability(false);

        if (!result.success) {
            setError(result.error);
            return false;
        }

        setAvailability(result.data);

        if (!result.data.available) {
            setError(
                `Only ${result.data.availableQuantity} unit(s) are available for these dates.`
            );

            return false;
        }

        return true;
    };

    const handleSubmit = async (
        event
    ) => {
        event.preventDefault();

        const available =
            await checkAvailability();

        if (!available) {
            return;
        }

        const result =
            await createBooking({
                rentalId: rental.id,

                startDate: new Date(
                    `${form.startDate}T00:00:00`
                ).toISOString(),

                endDate: new Date(
                    `${form.endDate}T00:00:00`
                ).toISOString(),

                quantity: Number(
                    form.quantity
                ),
            });

        if (!result.success) {
            setError(result.error);
            return;
        }

        setSuccess(result.data);
    };

    if (!open || !rental) {
        return null;
    }

    if (success) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="w-full max-w-md p-8 text-center bg-white shadow-2xl rounded-2xl dark:bg-slate-800">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    </div>

                    <h2 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
                        Rental Request Sent
                    </h2>

                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        Your rental request has been
                        sent to the owner.
                    </p>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full px-5 py-3 mt-6 font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700"
                    >
                        Done
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (
                    event.target ===
                    event.currentTarget
                ) {
                    onClose();
                }
            }}
        >
            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-slate-800">
                <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white/95 dark:border-slate-700 dark:bg-slate-800/95">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Request Rental
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {rental.title}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-6"
                >
                    {error && (
                        <div className="flex gap-3 p-4 text-sm text-red-700 border border-red-200 rounded-xl bg-red-50 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
                            <AlertCircle className="flex-shrink-0 w-5 h-5" />
                            {error}
                        </div>
                    )}

                    <section>
                        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                            <CalendarDays className="w-4 h-4 text-blue-600" />
                            Rental Period
                        </h3>

                        <div className="grid gap-4 mt-3 sm:grid-cols-2">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Start Date
                                </label>

                                <input
                                    type="date"
                                    name="startDate"
                                    value={
                                        form.startDate
                                    }
                                    min={
                                        new Date()
                                            .toISOString()
                                            .split(
                                                "T"
                                            )[0]
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full px-4 py-3 text-sm border border-gray-300 outline-none rounded-xl focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    End Date
                                </label>

                                <input
                                    type="date"
                                    name="endDate"
                                    value={
                                        form.endDate
                                    }
                                    min={
                                        form.startDate ||
                                        new Date()
                                            .toISOString()
                                            .split(
                                                "T"
                                            )[0]
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full px-4 py-3 text-sm border border-gray-300 outline-none rounded-xl focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    <section>
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Quantity
                        </label>

                        <input
                            type="number"
                            name="quantity"
                            min="1"
                            max={
                                rental.quantity
                            }
                            value={
                                form.quantity
                            }
                            onChange={
                                handleChange
                            }
                            className="w-full px-4 py-3 text-sm border border-gray-300 outline-none rounded-xl focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                            required
                        />

                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Total listed quantity:{" "}
                            {rental.quantity}
                        </p>
                    </section>

                    <section className="p-4 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            Price Summary
                        </h3>

                        <div className="mt-3 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">
                                    Price per day
                                </span>

                                <span className="font-medium text-gray-900 dark:text-white">
                                    ₹
                                    {Number(
                                        rental.pricePerDay
                                    ).toLocaleString(
                                        "en-IN"
                                    )}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">
                                    Duration
                                </span>

                                <span className="font-medium text-gray-900 dark:text-white">
                                    {rentalDays}{" "}
                                    {rentalDays ===
                                        1
                                        ? "day"
                                        : "days"}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">
                                    Quantity
                                </span>

                                <span className="font-medium text-gray-900 dark:text-white">
                                    {form.quantity}
                                </span>
                            </div>

                            <div className="my-2 border-t border-gray-200 dark:border-slate-600" />

                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    Rental total
                                </span>

                                <span className="font-bold text-blue-600">
                                    ₹
                                    {estimatedTotal.toLocaleString(
                                        "en-IN"
                                    )}
                                </span>
                            </div>

                            {estimatedDeposit >
                                0 && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">
                                            Security deposit
                                        </span>

                                        <span className="font-medium text-gray-900 dark:text-white">
                                            ₹
                                            {estimatedDeposit.toLocaleString(
                                                "en-IN"
                                            )}
                                        </span>
                                    </div>
                                )}
                        </div>
                    </section>

                    {availability?.available && (
                        <div className="p-4 text-sm border rounded-xl border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-300">
                            This rental is available for
                            the selected dates and
                            quantity.
                        </div>
                    )}

                    <div className="flex flex-col-reverse gap-3 pt-4 border-t border-gray-200 sm:flex-row sm:justify-end dark:border-slate-700">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-3 font-semibold text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-700"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={
                                loading ||
                                checkingAvailability
                            }
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 font-semibold text-white bg-orange-600 rounded-xl hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ||
                                checkingAvailability ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />

                                    {checkingAvailability
                                        ? "Checking..."
                                        : "Requesting..."}
                                </>
                            ) : (
                                "Request Rental"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RentalBookingModal;