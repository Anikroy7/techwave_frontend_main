"use client";

import { ReactNode, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface formConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

interface IProps extends formConfig {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
}

export default function TWForm({ children, onSubmit, defaultValues }: IProps) {
  const formConfig: formConfig = {};
  const methods = useForm(formConfig);

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues, { keepDefaultValues: false });
    }
  }, [defaultValues]);
  const submitHandler = methods.handleSubmit;

  return (
    <FormProvider {...methods}>
      <form onSubmit={submitHandler(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
