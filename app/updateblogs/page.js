import { Suspense } from "react";
import EditBlogForm from "../Components/EditBlogForm";

export default function UpdateBlogPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditBlogForm />
    </Suspense>
  );
}
