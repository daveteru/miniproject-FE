import React from "react";

type togglerprops = {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  state: boolean;
};

export default function Toggler({ setter, state }: togglerprops) {
  return (
    <button
      onClick={() => setter(!state)}
      className={`w-15 h-8  p-1 rounded-full ${state ? "bg-green-400" : "bg-neutral-300"} transition-all ease-in`}
    >
      <div
        className={`bg-white rounded-full w-6 h-full ${state ? "translate-x-7" : ""} transition-all easing`}
      >
        <p className="text-black h-full w-full text-sm  items-center translate-y-[2px] justify-center">
          {state ? "✓" : "✕"}
        </p>
      </div>
    </button>
  );
}
