import { LoaderArgs, json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { createBrowserClient } from "@supabase/auth-helpers-remix";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Database } from "db_types";
import { useEffect, useState } from "react";
import createServerSupabase from 'utils/supabase.server';

type TypedSupabaseClient = SupabaseClient<Database>

export type SupabaseOutletContext = {
  supabase: TypedSupabaseClient;
}

export const loader =async ({request}: LoaderArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };
  const response = new Response();
  const supabase = createServerSupabase({ request, response })

  const {
    data: {session},
  } = await supabase.auth.getSession();

  return json({env, session }, {headers: response.headers});
};

export default function App() {
  const {env, session} = useLoaderData<typeof loader>();
  
  console.log({ server: {session}});
  const [supabase] = useState(() => createBrowserClient<Database>(
    env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  );

  useEffect(() => {
    supabase.auth
    .getSession()
    .then((session) => console.log({ client: { session }}, []));
  })

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet context={{ supabase }} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
