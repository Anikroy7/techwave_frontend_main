"use client";

import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {}

export default function TWInput({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
  disabled=false,
  placeholder = ''
}: IProps) {
  const {
    register,
  
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <Input
      {...register(name)}
      errorMessage={errorMessage || ""}
      isInvalid={!!errors?.[name]}
      label={label}
      required={required}
      size={size}
      type={type}
      variant={variant}
      isDisabled={disabled}
      placeholder={placeholder}
    />
  );
}
