import { Controller } from "react-hook-form";

import { IInput } from "@/src/types";
import ReactQuill from "react-quill";

const toolbarOptions = [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean']
];


interface IProps extends IInput { }

export default function TWTextEditor({
    label,
    name,
    variant = "bordered",
}: IProps) {
    return (
        <Controller
            name={name}
            render={({ field }) => (
                <ReactQuill
                    {...field}
                    theme="snow"
                    modules={{ toolbar: toolbarOptions }}
                />
            )}
        />
    );
}