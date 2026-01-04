import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowRight, AlertOctagon } from "lucide-react";

const Opps = () => {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-50 rounded-full">
            <AlertOctagon className="w-16 h-16 text-[#9f1239]" />
          </div>
        </div>

        <p className="text-base font-bold text-[#9f1239] uppercase tracking-wide">
          404 Error
        </p>

        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl font-serif">
          Page not found
        </h1>

        <p className="mt-6 text-lg leading-7 text-slate-600">
          Sorry, we couldn’t find the page you’re looking for. It might have
          been moved or doesn't exist on the portal.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto rounded-lg bg-[#9f1239] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-900/20 hover:bg-[#881337] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9f1239] transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Go back home
          </Link>

          <Link
            to="/contact"
            className="w-full sm:w-auto rounded-lg px-6 py-3 text-sm font-bold text-slate-700 hover:text-[#9f1239] hover:bg-white border border-transparent hover:border-slate-200 transition-all flex items-center justify-center gap-2"
          >
            Contact support <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8">
          <p className="text-xs text-slate-400">
            Municipal Corporation Official Portal
          </p>
        </div>
      </div>
    </main>
  );
};

export default Opps;
