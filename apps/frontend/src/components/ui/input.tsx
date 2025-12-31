import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: LucideIcon;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', label, error, icon: Icon, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="block text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {Icon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Icon size={18} />
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`
              w-full rounded-lg border bg-white
              ${Icon ? 'pl-10 pr-4' : 'px-4'} py-2.5
              text-sm transition-all duration-200
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
              ${error
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                : 'border-gray-200 hover:border-gray-300'
                            }
              ${className}
            `}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="text-sm text-red-500 animate-fade-in">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
