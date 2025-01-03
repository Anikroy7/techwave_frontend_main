import { Controller } from "react-hook-form";
const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
});
import { IInput } from "@/src/types";
import dynamic from "next/dynamic";

const toolbarOptions = [
  [{ header: "1" }, { header: "2" }, { font: [] }],
  [{ size: [] }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  ["link", "image", "video"],
  ["clean"],
];

interface IProps extends IInput {}

export default function TWTextEditor({ name }: IProps) {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <ReactQuill
          {...field}
          modules={{ toolbar: toolbarOptions }}
          theme="snow"
        />
      )}
    />
  );
}
