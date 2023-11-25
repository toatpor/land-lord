import { getToday } from "../utils/helpers";
import supabase from "./supabase";

const pageLimited = import.meta.env.VITE_PAGE_LIMITED;

export async function getAllBooking({ filter, sortBy, pagination }) {
  let query = supabase
    .from("booking")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuest , status ,totalPrice,cabin(name),guest(fullName,email)",
      { count: "exact" }
    );

  // if you have to filter more than one need to pass array object
  if (filter) query = query[filter.action || "eq"](filter.filed, filter.value);

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (pagination) {
    //get first array in data base need to start with 0
    const from = (pagination - 1) * Number(pageLimited);

    // return 9 19
    const to = from + Number(pageLimited) - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  if (error) {
    throw new Error("Bookings could bot be loaded");
  }

  return { data, count };
}
export async function getBooking(id) {
  const { data, error } = await supabase
    .from("booking")
    .select("*, cabin(*), guest(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("booking")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("booking")
    // .select('*')
    .select("*, guest(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("booking")
    .select("*, guest(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("booking")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("booking").delete().eq("id", id);
  if (error) {
    throw new Error("Booking could not be deleted");
  }
  return data;
}
