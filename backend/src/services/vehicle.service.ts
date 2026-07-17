import { supabase } from "../config/db";

export async function findAll(filters: any) {
  let query = supabase.from("vehicles").select("*, vehicle_images(*)");

  if (!filters.location) {
    query = query.eq("location", filters.location);
  }
  const { data, error } = await query;

  if (error) throw { statusCode: 500, message: error.message };

  return data;
}

export async function create(payload: any, ownerId: string) {
  const { data, error } = await supabase
    .from("vehicles")
    .insert({ ...payload, owner_id: ownerId })
    .select()
    .single();

  if (error) throw { statusCode: 400, message: error.message };

  return data;
}
