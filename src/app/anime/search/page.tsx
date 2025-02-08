"use client";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import SearchPageContent from "./searchPage";

export default function SearchPage() {
  return (
    <Suspense fallback={<Loader />}>
      <SearchPageContent />
    </Suspense>
  );
}
