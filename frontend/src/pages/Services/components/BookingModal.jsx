import React, { useEffect, useMemo, useState } from "react";
import {
    AlertCircle,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Loader2,
    MapPin,
    X,
} from "lucide-react";
import BookingLocationPicker from "./BookingLocationPicker";

const initialLocation = {
    addressLine: "",
    locality: "",
    city: "",
    state: "",
    postalCode: "",
    latitude: null,
    longitude: null,
};

const initialForm = {
    date: "",
    startTime: "",
    duration: "1",
    location: initialLocation,
    customerNote: "",
};

const BookingModal = ({
    service,
    open,
    onClose,
    createBooking,
    getAvailability,
    loading,
}) => {
    const [form, setForm] = useState(initialForm);
    const [availability, setAvailability] = useState(null);
    const [checkingAvailability, setCheckingAvailability] =
        useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(null);

    const pricingType = service?.pricingType;

    const durationOptions = useMemo(() => {
        if (pricingType !== "HOURLY") {
            return [];
        }

        return ["1", "2", "3", "4", "5", "6", "8"];
    }, [pricingType]);

    useEffect(() => {
        if (!open) {
            setForm(initialForm);
            setAvailability(null);
            setError("");
            setSuccess(null);
        }
    }, [open]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setAvailability(null);
        setError("");
    };

    const handleLocationChange = (location) => {
        setForm((previous) => ({
            ...previous,
            location,
        }));

        setAvailability(null);
        setError("");
    };

    const getScheduledDateTime = () => {
        if (!form.date) {
            return null;
        }

        if (pricingType === "DAILY") {
            return new Date(`${form.date}T09:00:00`);
        }

        if (!form.startTime) {
            return null;
        }

        return new Date(
            `${form.date}T${form.startTime}:00`
        );
    };

    const getEndDateTime = (scheduledAt) => {
        if (!scheduledAt || pricingType !== "HOURLY") {
            return null;
        }

        const end = new Date(scheduledAt);

        end.setHours(
            end.getHours() + Number(form.duration)
        );

        return end;
    };

    const validateForm = () => {
        if (!form.date) {
            return "Please select a date.";
        }

        if (
            (pricingType === "HOURLY" ||
                pricingType === "FIXED") &&
            !form.startTime
        ) {
            return "Please select a time.";
        }

        const {
            addressLine,
            city,
            state,
            postalCode,
            latitude,
            longitude,
        } = form.location;

        if (
            latitude === null ||
            latitude === "" ||
            longitude === null ||
            longitude === ""
        ) {
            return "Please select a valid service location.";
        }

        if (!addressLine.trim()) {
            return "Please enter the service address.";
        }

        if (!city.trim()) {
            return "Please enter the city.";
        }

        if (!state.trim()) {
            return "Please enter the state.";
        }

        if (!postalCode.trim()) {
            return "Please enter the postal code.";
        }

        return "";
    };

    const checkAvailability = async () => {
        const validationError = validateForm();

        if (validationError) {
            setError(validationError);
            return false;
        }

        const scheduledAt = getScheduledDateTime();

        if (
            !scheduledAt ||
            Number.isNaN(scheduledAt.getTime())
        ) {
            setError(
                "Please select a valid date and time."
            );

            return false;
        }

        const endAt = getEndDateTime(scheduledAt);

        if (endAt && endAt <= scheduledAt) {
            setError("Please select a valid duration.");
            return false;
        }

        setCheckingAvailability(true);
        setError("");
        setAvailability(null);

        const result = await getAvailability(service.id, {
            scheduledAt: scheduledAt.toISOString(),
            ...(endAt && {
                endAt: endAt.toISOString(),
            }),
        });

        setCheckingAvailability(false);

        if (!result.success) {
            setError(result.error);
            return false;
        }

        setAvailability(result.data);

        if (!result.data.available) {
            setError(
                "This time slot is no longer available. Please select another time."
            );

            return false;
        }

        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        const isAvailable = await checkAvailability();

        if (!isAvailable) {
            return;
        }

        const scheduledAt = getScheduledDateTime();
        const endAt = getEndDateTime(scheduledAt);

        const location = form.location;

        const result = await createBooking({
            serviceId: service.id,

            scheduledAt: scheduledAt.toISOString(),

            ...(endAt && {
                endAt: endAt.toISOString(),
            }),

            addressLine: location.addressLine.trim(),

            locality:
                location.locality.trim() || undefined,

            city: location.city.trim(),

            state: location.state.trim(),

            postalCode:
                location.postalCode.trim(),

            latitude: Number(location.latitude),

            longitude: Number(location.longitude),

            customerNote:
                form.customerNote.trim() || undefined,
        });

        if (!result.success) {
            setError(result.error);
            return;
        }

        setSuccess(result.data);
    };

    if (!open || !service) {
        return null;
    }

    if (success) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl dark:bg-slate-800">
                    <div className="p-8 text-center">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                            <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Booking Requested
                        </h2>

                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            Your booking request has been
                            sent to the service provider.
                        </p>

                        <div className="p-4 mt-5 text-left rounded-xl bg-gray-50 dark:bg-slate-700/50">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {service.title}
                            </p>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Status:{" "}
                                <span className="font-medium text-amber-600 dark:text-amber-400">
                                    Pending
                                </span>
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full px-5 py-3 mt-6 font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700"
                        >
                            Done
                        </button>
                    </div>
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
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-slate-800">
                <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-slate-700 dark:bg-slate-800/95">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Request to Book
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {service.title}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 text-gray-500 transition rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-slate-700 dark:hover:text-white"
                        aria-label="Close booking modal"
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
                            <p>{error}</p>
                        </div>
                    )}

                    <section>
                        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                            <CalendarDays className="w-4 h-4 text-blue-600" />
                            Schedule
                        </h3>

                        <div className="grid gap-4 mt-3 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="booking-date"
                                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    {pricingType ===
                                        "DAILY"
                                        ? "Booking Date"
                                        : "Preferred Date"}
                                </label>

                                <input
                                    id="booking-date"
                                    type="date"
                                    name="date"
                                    value={form.date}
                                    min={
                                        new Date()
                                            .toISOString()
                                            .split("T")[0]
                                    }
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 text-sm border border-gray-300 outline-none rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                    required
                                />
                            </div>

                            {(pricingType ===
                                "HOURLY" ||
                                pricingType ===
                                "FIXED") && (
                                    <div>
                                        <label
                                            htmlFor="booking-time"
                                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Preferred Time
                                        </label>

                                        <input
                                            id="booking-time"
                                            type="time"
                                            name="startTime"
                                            value={
                                                form.startTime
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            className="w-full px-4 py-3 text-sm border border-gray-300 outline-none rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                            required
                                        />
                                    </div>
                                )}

                            {pricingType ===
                                "HOURLY" && (
                                    <div>
                                        <label
                                            htmlFor="booking-duration"
                                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Duration
                                        </label>

                                        <select
                                            id="booking-duration"
                                            name="duration"
                                            value={
                                                form.duration
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            className="w-full px-4 py-3 text-sm border border-gray-300 outline-none rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                        >
                                            {durationOptions.map(
                                                (
                                                    duration
                                                ) => (
                                                    <option
                                                        key={
                                                            duration
                                                        }
                                                        value={
                                                            duration
                                                        }
                                                    >
                                                        {
                                                            duration
                                                        }{" "}
                                                        {duration ===
                                                            "1"
                                                            ? "hour"
                                                            : "hours"}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                )}
                        </div>
                    </section>

                    <section>
                        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            Service Location
                        </h3>

                        <div className="mt-3">
                            <BookingLocationPicker
                                value={form.location}
                                onChange={
                                    handleLocationChange
                                }
                            />
                        </div>
                    </section>

                    <section>
                        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                            <Clock3 className="w-4 h-4 text-blue-600" />
                            Additional Information
                        </h3>

                        <div className="mt-3">
                            <label
                                htmlFor="booking-note"
                                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Note
                            </label>

                            <textarea
                                id="booking-note"
                                name="customerNote"
                                value={
                                    form.customerNote
                                }
                                onChange={
                                    handleChange
                                }
                                rows={4}
                                placeholder="Tell the provider anything they should know..."
                                className="w-full px-4 py-3 text-sm border border-gray-300 outline-none resize-none rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400"
                            />
                        </div>
                    </section>

                    {availability?.available && (
                        <div className="p-4 text-sm border rounded-xl border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-300">
                            This time slot is available.
                        </div>
                    )}

                    <div className="flex flex-col-reverse gap-3 pt-2 border-t border-gray-200 sm:flex-row sm:justify-end dark:border-slate-700">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-3 font-semibold text-gray-700 transition border border-gray-300 rounded-xl hover:bg-gray-50 dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-700"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={
                                loading ||
                                checkingAvailability
                            }
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 font-semibold text-white transition bg-orange-600 rounded-xl hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
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
                                "Request Booking"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;