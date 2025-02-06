import React from "react";
import { cn } from "@/lib/utils";

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <div className={cn("bg-white dark:bg-gray-800 shadow-md rounded-lg", className)}>{children}</div>;
};

export const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <div className={cn("p-4 border-b dark:border-gray-700", className)}>{children}</div>;
};

export const CardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <h3 className={cn("text-lg font-semibold", className)}>{children}</h3>;
};

export const CardDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <p className={cn("text-sm text-gray-600 dark:text-gray-400", className)}>{children}</p>;
};

export const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <div className={cn("p-4", className)}>{children}</div>;
};
