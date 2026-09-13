import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Package,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";

const categories = [
  {
    icon: Wrench,
    title: "Services",
    description: "Find trusted local professionals for everyday needs.",
    href: "/services",
  },
  {
    icon: Building2,
    title: "Rentals",
    description: "Discover spaces and rental options around you.",
    href: "/rentals",
  },
  {
    icon: BriefcaseBusiness,
    title: "Jobs",
    description: "Explore local opportunities and connect with employers.",
    href: "/jobs",
  },
  {
    icon: Package,
    title: "Marketplace",
    description: "Buy, sell and discover products in your community.",
    href: "/products",
  },
  {
    icon: Building2,
    title: "Spaces",
    description: "Find properties and spaces that fit your needs.",
    href: "/spaces",
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with people and discover what's happening locally.",
    href: "/community",
  },
];

const benefits = [
  "Discover opportunities close to you",
  "Connect with local people and businesses",
  "Find services, jobs, rentals and products",
  "Build a stronger local community",
];

const steps = [
  {
    number: "01",
    title: "Explore",
    description:
      "Browse local services, jobs, rentals, products, spaces and communities.",
  },
  {
    number: "02",
    title: "Connect",
    description:
      "Find the right people, businesses and opportunities for your needs.",
  },
  {
    number: "03",
    title: "Get things done",
    description:
      "Connect locally, make decisions and turn discoveries into action.",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="flex items-center justify-between h-16 px-5 mx-auto max-w-7xl sm:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="LookAtLocal"
              className="object-contain h-9 w-9"
            />
            <span className="text-xl font-bold tracking-tight">
              LookAtLocal
            </span>
          </Link>

          <nav className="items-center hidden gap-7 md:flex">
            <a
              href="#categories"
              className="text-sm font-medium transition text-slate-600 hover:text-slate-950"
            >
              Explore
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium transition text-slate-600 hover:text-slate-950"
            >
              How it works
            </a>
            <Link
              to="/help"
              className="text-sm font-medium transition text-slate-600 hover:text-slate-950"
            >
              Help
            </Link>
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              to="/login"
              className="hidden px-4 py-2 text-sm font-semibold transition rounded-lg text-slate-700 hover:bg-slate-100 sm:block"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
          <div className="absolute inset-0">
            <div className="absolute rounded-full -left-32 top-10 h-72 w-72 bg-blue-100/70 blur-3xl" />
            <div className="absolute rounded-full -right-20 top-24 h-96 w-96 bg-indigo-100/70 blur-3xl" />
          </div>

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm">
                <Sparkles className="w-4 h-4" />
                Your local world, connected
              </div>

              <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                Discover more.
                <span className="block text-slate-500">Connect locally.</span>
              </h1>

              <p className="max-w-2xl text-lg leading-8 mt-7 text-slate-600 sm:text-xl">
                LookAtLocal brings your local community together. Discover
                services, jobs, rentals, products, spaces and people — all in
                one place.
              </p>

              <div className="flex flex-col gap-3 mt-9 sm:flex-row">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  Get started
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  Sign in
                </Link>
              </div>

              <div className="flex flex-wrap text-sm mt-9 gap-x-6 gap-y-3 text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  One local platform
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Community focused
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Built for discovery
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="p-4 bg-white border shadow-2xl rounded-3xl border-slate-200 shadow-slate-900/10 sm:p-6">
                <div className="p-5 text-white rounded-2xl bg-slate-950 sm:p-7">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Explore locally</p>
                      <h2 className="mt-1 text-2xl font-semibold">
                        Find what you need
                      </h2>
                    </div>
                    <div className="p-3 rounded-xl bg-white/10">
                      <MapPin className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 px-4 py-3 bg-white mt-7 rounded-xl text-slate-400">
                    <Search className="w-5 h-5" />
                    <span className="text-sm">What are you looking for?</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-5">
                    {[
                      ["Services", Wrench],
                      ["Jobs", BriefcaseBusiness],
                      ["Rentals", Building2],
                      ["Products", Package],
                    ].map(([label, Icon]) => (
                      <div
                        key={label}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5"
                      >
                        <Icon className="w-5 h-5 text-slate-300" />
                        <span className="text-sm font-medium">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-4">
                  <div className="p-4 rounded-xl bg-slate-50">
                    <p className="text-2xl font-bold">6+</p>
                    <p className="mt-1 text-xs text-slate-500">Categories</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50">
                    <p className="text-2xl font-bold">Local</p>
                    <p className="mt-1 text-xs text-slate-500">Connections</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50">
                    <p className="text-2xl font-bold">One</p>
                    <p className="mt-1 text-xs text-slate-500">Platform</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="categories" className="py-20 bg-white sm:py-24">
          <div className="px-5 mx-auto max-w-7xl sm:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold tracking-wider uppercase text-slate-500">
                Explore LookAtLocal
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Everything local, in one place
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                From finding a service to discovering a job or connecting with
                your community, LookAtLocal makes local discovery simple.
              </p>
            </div>

            <div className="grid gap-5 mt-12 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map(({ icon: Icon, title, description, href }) => (
                <Link
                  key={title}
                  to={href}
                  className="p-6 transition bg-white border group rounded-2xl border-slate-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5"
                >
                  <div className="flex items-start justify-between">
                    <div className="p-3 transition rounded-xl bg-slate-100 text-slate-800 group-hover:bg-slate-950 group-hover:text-white">
                      <Icon className="w-5 h-5" />
                    </div>
                    <ChevronRight className="w-5 h-5 transition text-slate-300 group-hover:translate-x-1 group-hover:text-slate-700" />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    {description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 border-y border-slate-200 bg-slate-50 sm:py-24">
          <div className="grid px-5 mx-auto max-w-7xl gap-14 sm:px-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold tracking-wider uppercase text-slate-500">
                Why LookAtLocal
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Make your local connections matter
              </h2>
              <p className="max-w-xl mt-5 text-lg leading-8 text-slate-600">
                Local communities have opportunities everywhere. LookAtLocal
                gives people a simple way to discover them, connect with others
                and participate in the places around them.
              </p>

              <div className="mt-8 space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                    <span className="font-medium text-slate-700">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-white border shadow-sm rounded-2xl border-slate-200 p-7">
                <MapPin className="h-7 w-7 text-slate-800" />
                <h3 className="mt-5 text-xl font-semibold">
                  Local discovery
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  Discover useful opportunities and services around your local
                  community.
                </p>
              </div>

              <div className="bg-white border shadow-sm rounded-2xl border-slate-200 p-7 sm:translate-y-8">
                <Users className="h-7 w-7 text-slate-800" />
                <h3 className="mt-5 text-xl font-semibold">
                  Community first
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  Connect with people and participate in the community around
                  you.
                </p>
              </div>

              <div className="bg-white border shadow-sm rounded-2xl border-slate-200 p-7">
                <ShieldCheck className="h-7 w-7 text-slate-800" />
                <h3 className="mt-5 text-xl font-semibold">
                  Built for people
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  A simple platform designed to make local interactions easier.
                </p>
              </div>

              <div className="bg-white border shadow-sm rounded-2xl border-slate-200 p-7 sm:translate-y-8">
                <Sparkles className="h-7 w-7 text-slate-800" />
                <h3 className="mt-5 text-xl font-semibold">
                  More possibilities
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  Discover different ways to work, buy, rent, help and connect
                  locally.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-white sm:py-24">
          <div className="px-5 mx-auto max-w-7xl sm:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-sm font-semibold tracking-wider uppercase text-slate-500">
                Simple by design
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                How LookAtLocal works
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Start discovering your local world in just a few simple steps.
              </p>
            </div>

            <div className="grid gap-6 mt-14 md:grid-cols-3">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="border rounded-2xl border-slate-200 p-7"
                >
                  <span className="text-sm font-bold tracking-widest text-slate-400">
                    {step.number}
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 sm:px-8 sm:pb-24">
          <div className="px-6 py-16 mx-auto overflow-hidden text-center text-white max-w-7xl rounded-3xl bg-slate-950 sm:px-10">
            <div className="max-w-3xl mx-auto">
              <p className="text-sm font-semibold tracking-wider uppercase text-slate-400">
                Start exploring
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
                Your local world is closer than you think.
              </h2>
              <p className="max-w-2xl mx-auto mt-5 text-lg leading-8 text-slate-400">
                Join LookAtLocal and discover the people, opportunities,
                services and experiences around you.
              </p>

              <Link
                to="/register"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Create your account
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200">
        <div className="flex flex-col gap-6 px-5 py-8 mx-auto max-w-7xl sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="LookAtLocal"
              className="object-contain w-8 h-8"
            />
            <span className="font-semibold">LookAtLocal</span>
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-slate-500">
            <Link to="/help" className="hover:text-slate-900">
              Help
            </Link>
            <Link to="/terms" className="hover:text-slate-900">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-slate-900">
              Privacy
            </Link>
          </div>

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} LookAtLocal
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;