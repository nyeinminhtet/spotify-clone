import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImage = (song: Song) => {
  const supabaseClient = useSupabaseClient();

  if (!song) {
    return null;
  }

  const { data: ImagData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(song.image_path);

  return ImagData.publicUrl;
};

export default useLoadImage;
