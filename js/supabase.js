import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// Datos de nuestro proyecto Supabase
const SUPABASE_URL = "https://vasetbikxokdguecatad.supabase.co";
const SUPABASE_KEY = "sb_publishable_6ybOuIhlSKNVC-zNPCekGA_zyWYc8q4";

// Creamos el cliente de conexión
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
