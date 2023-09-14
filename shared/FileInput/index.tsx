import HelperText from "@shared/HelpText"
import clsx from "clsx"
import type { ComponentProps, ReactNode } from "react"
import { forwardRef } from "react"

export interface FileInputProps
  extends Omit<ComponentProps<"input">, "type" | "ref" | "color"> {
  color?: "default" | "info" | "failure" | "warning" | "success"
  helperText?: ReactNode
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, color = "default", helperText, ...props }, ref) => {
    return (
      <>
        <div className={clsx("flex", className)}>
          <label className="block">
            <span className="sr-only">Choose file</span>
            <input
              type="file"
              className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100"
              ref={ref}
              {...props}
            />
          </label>
        </div>
        {helperText && <HelperText color={color}>{helperText}</HelperText>}
      </>
    )
  }
)

FileInput.displayName = "FileInput"
