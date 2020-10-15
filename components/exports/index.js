import dynamic from "next/dynamic";

export const CustomTextEditor = dynamic(
  () => import("../CustomEditorText/index"),
  {
    ssr: false,
  }
);
