import React from "react";

export default function Loader({ size = "md", text = "Loading..." }) {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-3">
      <div
        className={`${sizes[size] || sizes.md} rounded-full border-slate-200 border-t-teal-600 animate-spin dark:border-slate-800 dark:border-t-teal-500`}
      />
      {text && (
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          {text}
        </p>
      )}
    </div>
  );
}