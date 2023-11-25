import axios from "axios";
import supabase, { supabaseUrl } from "./supabase";

export const getALlCabin = async function () {
  const { data, error } = await supabase.from("cabin").select("*");
  if (error) {
    throw new Error("something went wrong");
  }

  return data;
};

export const deleteCabin = async function (id) {
  const { data, error } = await supabase.from("cabin").delete().eq("id", id);
  if (error) {
    throw new Error("Cabin could not delete it");
  }

  return data;
};

export const addEditCabin = async function (newCabin, id) {
  // check image contain url or not
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin?.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabin");
  //1.create a cabin

  // A.for create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B edit cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  // want to keep image store by url

  const { data, error } = await query.select();

  if (error) {
    throw new Error("Cabin could not create");
  }
  // we dont want to update image in storage anymore
  if (hasImagePath) return data;
  //2.upload image to store

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //delete cabin is case that upload image is failed
  if (storageError) {
    await supabase.from("cabin").delete().eq("id", newCabin.id);
    throw new Error("Cabin image coulde not be add");
  }

  return data;
};

// export const getAllMebmer = async function () {
//   const data = await axios.get("/api/member");
//   console.log(data);
//   return data;
// };

// const shit = getAllMebmer();

// console.log(shit);
