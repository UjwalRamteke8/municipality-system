import { forwardRef } from "react";
import clsx from "clsx";

/**
 * Controlled or uncontrolled Input compatible with react-hook-form via ref
 * Props: label, name, type, placeholder, error (string), ...rest
 */
const Input = forwardRef(
  ({ label, error, className = "", icon: Icon, ...props }, ref) => {
    return (
      <div className={clsx("w-full", className)}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}

        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          )}
          <input
            ref={ref}
            className={clsx(
              "w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300",
              Icon && "pl-10",
              error ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
            )}
            {...props}
          />
        </div>

        {error ? <p className="text-xs text-red-600 mt-1">{error}</p> : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
