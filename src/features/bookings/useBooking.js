import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBooking } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

//sort filter inside custom hook
export function useBooking() {
  const queryClient = useQueryClient();
  const [searchparam] = useSearchParams();

  // filter
  const filterValue = searchparam.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { filed: "status", value: filterValue, action: "eq" };

  // sort
  const sort = searchparam.get("sortBy") || "startDate-desc";
  const [field, direction] = sort.split("-");
  const sortBy = { field, direction };

  // pagination
  const pagination = !searchparam.get("page")
    ? 1
    : Number(searchparam.get("page"));
  const {
    isPending,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    //like depenciearray
    queryKey: ["bookings", filter, sortBy, pagination],
    queryFn: () => getAllBooking({ filter, sortBy, pagination }),
  });

  //pre-fetch
  //size of page data / limited of page  to show
  const pageCount = Math.ceil(count / import.meta.env.VITE_PAGE_LIMITED);
  if (pagination < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, pagination + 1],
      queryFn: () =>
        getAllBooking({ filter, sortBy, pagination: pagination + 1 }),
    });

  return { isPending, bookings, error, count };
}
