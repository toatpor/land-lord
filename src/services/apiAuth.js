import supabase, { supabaseUrl } from "./supabase";

//return data to localStorlage
//after we login we can set user data to queryClient
export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}

// check if there any session  in localstorage about user login or not
export async function getCurrentUser() {
  // get active session, get it from localstorage that supabase provide for
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  // get current data from localstorage
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logOut() {
  //delete all data that supabase provide in localstorage
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function createUser({ email, password, fullName }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avatar: "" },
    },
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function uploadAvatar({ fullName, avatar, password }) {
  let updateData;
  // if upload fullname or image avatar need to creat object of data because of options that create user in first time
  if (fullName) updateData = { data: { fullName } };
  //create new object with password then update
  if (password) updateData = { password };

  const { data: currentDataUpdate, error } = await supabase.auth.updateUser(
    updateData
  );

  if (error) throw new Error(error.message);
  //read if not have any avatar image then return data imediately
  if (!avatar) return { currentDataUpdate };

  const filName = `avatar-${currentDataUpdate.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(filName, avatar);

  if (storageError) throw new Error(error.message);

  const { data: updateUserWithAvatar, error: avatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${filName}`,
      },
    });

  if (avatarError) throw Error(avatarError.message);

  //return all user information

  return updateUserWithAvatar;
}
