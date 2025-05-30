"use server";

import { revalidatePath } from "next/cache";

export async function cashDeleter(path: string) {
  revalidatePath(path);
}
