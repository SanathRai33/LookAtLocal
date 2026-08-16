import React from 'react';
import LocalSearch from './LocalSearch';

const HeroSection = ({ cities }) => {
    return (
        <section
            className="relative min-h-[500px] overflow-hidden rounded-3xl bg-cover bg-center lg:min-h-[560px]"
            style={{
                backgroundImage:
                    "url('https://imgs.search.brave.com/o3-GhjqIV40AeAjqjhnHk7fTHN3eUBVMazvTa_PoQMI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvaGF5/LWRheS10aGUtZmFy/bS1hbmltYWxzLWF0/dzltZG1ocmxsZ3B0/ajQuanBn')",
            }}
        >
            <div className="absolute inset-0 bg-blue-700/65" />

            <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 via-blue-700/10 to-blue-950/45" />

            <div className="relative z-10 flex min-h-[500px] items-center justify-center px-5 py-14 text-center lg:min-h-[560px]">
                <div className="w-full max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-medium text-white border rounded-full border-white/20 bg-white/20 backdrop-blur-md sm:text-sm">
                        <span className="w-2 h-2 bg-green-400 rounded-full" />

                        Now live in {cities || 0}+ cities across India
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Your Neighbourhood,

                        <span className="block mt-1 text-yellow-400">
                            Reimagined.
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto mt-5 text-base leading-7 text-blue-50 sm:text-lg">
                        Services, rentals, jobs, spaces — everything your
                        community needs,

                        <span className="block">
                            right at your doorstep.
                        </span>
                    </p>

                    <LocalSearch />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;