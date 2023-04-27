import { useOutletContext } from "@remix-run/react";

import type { Database } from "db_types";
import type { SupabaseOutletContext } from "~/root";

export default function login() {
    const { supabase } = useOutletContext<SupabaseOutletContext>();

    const handleLogin =async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "github",
        });

        if (error) {
            console.log(error);
        }
    };
    
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.log(error);
        }
    };

    return (
        <>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleLogin}>Login</button>
        </>
    )
}