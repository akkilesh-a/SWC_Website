import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "z26kuyk0",
  dataset: "production",
  apiVersion: "2024-11-01",
  useCdn: true,
});