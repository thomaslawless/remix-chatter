import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import supabase from "utils/supabase";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export const loader = async ({}: LoaderArgs) => {
  const { data } = await supabase.from('messages').select()
  return { messages: data ?? [] };
}

export default function Index() {
  const { messages } = useLoaderData<typeof loader>();
  return (
   <pre>{JSON.stringify(messages, null, 2)}</pre>
  );
}
