import React from "react";
import { cn } from "@/lib/utils";

export const Button = ({ children, className, ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => {
    return (
        <button
            className={cn(
                "bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
