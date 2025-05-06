import * as React from "react";

import { cn } from "@/lib/utils";
import { danaLight } from "@/app/styles/fonts";

interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, errorMessage, ...props }, ref) => {
    return (
      <>
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input ring-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-customgreen disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            error && "ring-1 ring-destructive focus-visible:ring-destructive",
            className
          )}
          ref={ref}
          {...props}
        />
        {/* {error && errorMessage && (
          
        )} */}
          <div className="min-h-[14px]">
          {error && errorMessage && (
           <p className={`${danaLight.className} text-destructive text-[11px] mt-1`}>{errorMessage}</p>
          )}
        </div>
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };