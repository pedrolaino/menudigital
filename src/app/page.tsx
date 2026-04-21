import { createClient } from "@/lib/supabase-server";
import { STATIC_MENU } from "@/data/menu";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Menu from "@/components/sections/Menu";
import Historia from "@/components/sections/Historia";
import Reservas from "@/components/sections/Reservas";
import Contacto from "@/components/sections/Contacto";
import type { Dish } from "@/lib/types";

export const revalidate = 60;

export default async function Home() {
  let dishes: Dish[] = STATIC_MENU;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("dishes")
      .select("*")
      .eq("available", true)
      .order("created_at", { ascending: true });

    if (data && data.length > 0) {
      dishes = data as Dish[];
    }
  } catch {
    // Supabase not configured — use static menu
  }

  return (
    <main>
      <Navbar />
      <Hero />
      <Menu dishes={dishes} />
      <Historia />
      <Reservas />
      <Contacto />
    </main>
  );
}
