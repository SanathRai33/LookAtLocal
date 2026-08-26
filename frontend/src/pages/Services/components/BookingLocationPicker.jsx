import React, { useEffect, useRef, useState } from "react";
import {
    AlertCircle,
    CheckCircle2,
    Loader2,
    MapPin,
    Search,
} from "lucide-react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

const emptyLocation = {
    addressLine: "",
    locality: "",
    city: "",
    state: "",
    postalCode: "",
    latitude: null,
    longitude: null,
};

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

setOptions({
    key: GOOGLE_MAPS_API_KEY,
    v: "weekly",
});

const BookingLocationPicker = ({
    value = emptyLocation,
    onChange,
}) => {
    const [mode, setMode] = useState("CURRENT");
    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [error, setError] = useState("");

    const autocompleteContainerRef = useRef(null);
    const autocompleteRef = useRef(null);
    const listenerRef = useRef(null);

    const location = {
        ...emptyLocation,
        ...value,
    };

    const updateLocation = (updates) => {
        onChange({
            ...location,
            ...updates,
        });

        setError("");
    };

    useEffect(() => {
        if (mode !== "OTHER") {
            return;
        }

        let cancelled = false;

        const initializeGooglePlaces = async () => {
            if (!GOOGLE_MAPS_API_KEY) {
                setError(
                    "Google Maps API key is missing. Add VITE_GOOGLE_MAPS_API_KEY to your frontend .env file."
                );
                return;
            }

            try {
                setSearchLoading(true);
                setError("");

                const {
                    PlaceAutocompleteElement,
                } = await importLibrary("places");

                if (
                    cancelled ||
                    !autocompleteContainerRef.current
                ) {
                    return;
                }

                if (autocompleteRef.current) {
                    return;
                }

                const autocomplete =
                    new PlaceAutocompleteElement({
                        includedRegionCodes: ["in"],
                    });

                autocomplete.placeholder =
                    "Search for a location...";

                autocomplete.includedRegionCodes = ["in"];

                autocompleteRef.current = autocomplete;

                autocompleteContainerRef.current.innerHTML = "";

                autocompleteContainerRef.current.appendChild(
                    autocomplete
                );

                const handlePlaceSelect = async (event) => {
                    try {
                        setSearchLoading(true);
                        setError("");

                        const place =
                            event.placePrediction.toPlace();

                        await place.fetchFields({
                            fields: [
                                "displayName",
                                "formattedAddress",
                                "location",
                                "addressComponents",
                            ],
                        });

                        if (!place.location) {
                            throw new Error(
                                "Selected place does not contain coordinates."
                            );
                        }

                        const parsedAddress =
                            parseAddressComponents(
                                place.addressComponents
                            );

                        updateLocation({
                            addressLine:
                                parsedAddress.addressLine ||
                                place.formattedAddress ||
                                "",

                            locality:
                                parsedAddress.locality,

                            city:
                                parsedAddress.city,

                            state:
                                parsedAddress.state,

                            postalCode:
                                parsedAddress.postalCode,

                            latitude:
                                place.location.lat(),

                            longitude:
                                place.location.lng(),
                        });

                        setMode("OTHER");
                    } catch (err) {
                        console.error(
                            "Google Places selection error:",
                            err
                        );

                        setError(
                            "Unable to get the selected location details. Please try again."
                        );
                    } finally {
                        setSearchLoading(false);
                    }
                };

                autocomplete.addEventListener(
                    "gmp-select",
                    handlePlaceSelect
                );

                listenerRef.current = {
                    autocomplete,
                    handlePlaceSelect,
                };

                console.log(
                    "Google Places Autocomplete initialized"
                );
            } catch (err) {
                console.error(
                    "Google Places initialization error:",
                    err
                );

                setError(
                    "Unable to load Google Places. Check your API key and Places API configuration."
                );
            } finally {
                setSearchLoading(false);
            }
        };

        initializeGooglePlaces();

        return () => {
            cancelled = true;

            if (
                listenerRef.current?.autocomplete &&
                listenerRef.current?.handlePlaceSelect
            ) {
                listenerRef.current.autocomplete.removeEventListener(
                    "gmp-select",
                    listenerRef.current.handlePlaceSelect
                );
            }

            listenerRef.current = null;
            autocompleteRef.current = null;
        };
    }, [mode]);

    const parseAddressComponents = (components = []) => {
        const result = {
            addressLine: "",
            locality: "",
            city: "",
            state: "",
            postalCode: "",
        };

        const getLongText = (type) => {
            const component = components.find((item) =>
                item.types?.includes(type)
            );

            return component?.longText || "";
        };

        const streetNumber =
            getLongText("street_number");

        const route =
            getLongText("route");

        result.addressLine = [streetNumber, route]
            .filter(Boolean)
            .join(" ");

        result.locality =
            getLongText("sublocality_level_1") ||
            getLongText("sublocality") ||
            getLongText("neighborhood");

        result.city =
            getLongText("locality") ||
            getLongText("administrative_area_level_2");

        result.state =
            getLongText("administrative_area_level_1");

        result.postalCode =
            getLongText("postal_code");

        return result;
    };

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            setError(
                "Location is not supported by your browser."
            );
            return;
        }

        setLoading(true);
        setError("");

        navigator.geolocation.getCurrentPosition(
            async ({ coords }) => {
                const latitude = coords.latitude;
                const longitude = coords.longitude;

                try {
                    const { Geocoder } =
                        await importLibrary("geocoding");

                    const geocoder = new Geocoder();

                    const response =
                        await geocoder.geocode({
                            location: {
                                lat: latitude,
                                lng: longitude,
                            },
                        });

                    const firstResult =
                        response.results?.[0];

                    if (!firstResult) {
                        throw new Error(
                            "No address found for current location."
                        );
                    }

                    const parsedAddress =
                        parseAddressComponents(
                            firstResult.address_components
                        );

                    updateLocation({
                        addressLine:
                            parsedAddress.addressLine ||
                            firstResult.formatted_address ||
                            "",

                        locality:
                            parsedAddress.locality,

                        city:
                            parsedAddress.city,

                        state:
                            parsedAddress.state,

                        postalCode:
                            parsedAddress.postalCode,

                        latitude,
                        longitude,
                    });

                    setMode("CURRENT");
                } catch (err) {
                    console.error(
                        "Reverse geocoding error:",
                        err
                    );

                    // Even if address lookup fails, preserve
                    // the GPS coordinates.
                    updateLocation({
                        latitude,
                        longitude,
                    });

                    setMode("CURRENT");

                    setError(
                        "Location found, but we could not automatically get the address. Please enter the address manually."
                    );
                } finally {
                    setLoading(false);
                }
            },

            (locationError) => {
                setLoading(false);

                if (locationError.code === 1) {
                    setError(
                        "Location permission was denied. Please allow location access or choose another location."
                    );
                    return;
                }

                if (locationError.code === 2) {
                    setError(
                        "Your location could not be determined. Please try again or choose another location."
                    );
                    return;
                }

                if (locationError.code === 3) {
                    setError(
                        "Getting your location timed out. Please try again."
                    );
                    return;
                }

                setError(
                    "Unable to get your current location. Please try again."
                );
            },

            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000,
            }
        );
    };

    const handleCurrentLocation = () => {
        setMode("CURRENT");

        updateLocation({
            addressLine: "",
            locality: "",
            city: "",
            state: "",
            postalCode: "",
            latitude: null,
            longitude: null,
        });

        getCurrentLocation();
    };

    const handleOtherLocation = () => {
        setMode("OTHER");

        updateLocation({
            addressLine: "",
            locality: "",
            city: "",
            state: "",
            postalCode: "",
            latitude: null,
            longitude: null,
        });
    };

    const handleManualAddressChange = (event) => {
        const {
            name,
            value: inputValue,
        } = event.target;

        updateLocation({
            [name]: inputValue,
        });
    };

    const hasCoordinates =
        location.latitude !== null &&
        location.latitude !== "" &&
        location.longitude !== null &&
        location.longitude !== "";

    return (
        <div className="space-y-4">
            {/* Location mode buttons */}
            <div className="grid gap-3 sm:grid-cols-2">
                <button
                    type="button"
                    onClick={handleCurrentLocation}
                    disabled={loading}
                    className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${mode === "CURRENT"
                        ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-900/20 dark:text-blue-300"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-700"
                        }`}
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <MapPin className="w-5 h-5" />
                    )}

                    {loading
                        ? "Getting location..."
                        : "Use Current Location"}
                </button>

                <button
                    type="button"
                    onClick={handleOtherLocation}
                    disabled={loading}
                    className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${mode === "OTHER"
                        ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-900/20 dark:text-blue-300"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-700"
                        }`}
                >
                    <Search className="w-5 h-5" />
                    Choose Another Location
                </button>
            </div>

            {/* Error */}
            {error && (
                <div className="flex gap-3 p-4 text-sm text-red-700 border border-red-200 rounded-xl bg-red-50 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
                    <AlertCircle className="flex-shrink-0 w-5 h-5" />
                    <p>{error}</p>
                </div>
            )}

            {/* Google Places search */}
            {mode === "OTHER" && (
                <div className="p-4 border border-gray-200 rounded-xl dark:border-slate-700">
                    <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            Search Service Location
                        </p>

                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Search for the location where the
                            service should be provided.
                        </p>
                    </div>

                    <div
                        ref={autocompleteContainerRef}
                        className="w-full"
                    />

                    {searchLoading && (
                        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Loading Google Maps...
                        </div>
                    )}
                </div>
            )}

            {/* Current location selected */}
            {mode === "CURRENT" && hasCoordinates && (
                <div className="flex items-start gap-3 p-4 border rounded-xl border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-900/20">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />

                    <div>
                        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                            Current location selected
                        </p>

                        <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                            Latitude:{" "}
                            {location.latitude}
                            <br />
                            Longitude:{" "}
                            {location.longitude}
                        </p>
                    </div>
                </div>
            )}

            {/* Address details */}
            {hasCoordinates && (
                <div className="grid gap-4 sm:grid-cols-2">
                    {/* Address */}
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="booking-address"
                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Address
                        </label>

                        <input
                            id="booking-address"
                            type="text"
                            name="addressLine"
                            value={location.addressLine}
                            onChange={
                                handleManualAddressChange
                            }
                            placeholder="House number, street, building..."
                            className="w-full px-4 py-3 text-sm border border-gray-300 outline-none rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400"
                            required
                        />
                    </div>

                    {/* Locality */}
                    <div>
                        <label
                            htmlFor="booking-locality"
                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Locality
                        </label>

                        <input
                            id="booking-locality"
                            type="text"
                            name="locality"
                            value={location.locality}
                            onChange={
                                handleManualAddressChange
                            }
                            placeholder="Locality"
                            className="w-full px-4 py-3 text-sm border border-gray-300 outline-none rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400"
                        />
                    </div>

                    {/* City */}
                    <div>
                        <label
                            htmlFor="booking-city"
                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            City
                        </label>

                        <input
                            id="booking-city"
                            type="text"
                            name="city"
                            value={location.city}
                            onChange={
                                handleManualAddressChange
                            }
                            placeholder="City"
                            className="w-full px-4 py-3 text-sm border border-gray-300 outline-none rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400"
                            required
                        />
                    </div>

                    {/* State */}
                    <div>
                        <label
                            htmlFor="booking-state"
                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            State
                        </label>

                        <input
                            id="booking-state"
                            type="text"
                            name="state"
                            value={location.state}
                            onChange={
                                handleManualAddressChange
                            }
                            placeholder="State"
                            className="w-full px-4 py-3 text-sm border border-gray-300 outline-none rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400"
                            required
                        />
                    </div>

                    {/* PIN */}
                    <div>
                        <label
                            htmlFor="booking-postal"
                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            PIN Code
                        </label>

                        <input
                            id="booking-postal"
                            type="text"
                            name="postalCode"
                            value={location.postalCode}
                            onChange={
                                handleManualAddressChange
                            }
                            placeholder="PIN Code"
                            inputMode="numeric"
                            maxLength={6}
                            className="w-full px-4 py-3 text-sm border border-gray-300 outline-none rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400"
                            required
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingLocationPicker;