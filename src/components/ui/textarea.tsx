import * as React from "react";

import { cn } from "@/lib/utils";
import { danaLight } from "@/app/styles/fonts";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  error?: boolean;
  errorMessage?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, errorMessage, ...props }, ref) => {
    return (
      <>
        <textarea
          className={cn(
            "flex min-h-[100px] w-full text-xs rounded-md border border-input ring-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-customgreen disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            error && "ring-1 ring-destructive focus-visible:ring-destructive",
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="min-h-[14px]">
          {error && errorMessage && (
            <p
              className={`${danaLight.className} text-destructive text-[11px] mt-1 ps-2`}
            >
              {errorMessage}
            </p>
          )}
        </div>
      </>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
