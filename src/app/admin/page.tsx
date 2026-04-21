import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import DishesManager from "@/components/admin/DishesManager";
import type { Dish } from "@/lib/types";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: dishes } = await supabase
    .from("dishes")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <DishesManager
      initialDishes={(dishes as Dish[]) ?? []}
      userEmail={user.email ?? ""}
    />
  );
}
