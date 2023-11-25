import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabin } from "./useCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabin } = useCabin();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;
  const filterVlaue = searchParams.get("discount") || "all";

  let filterCabin;

  if (filterVlaue === "all") filterCabin = cabin;
  if (filterVlaue === "no-discount")
    filterCabin = cabin.filter((value) => value.discount === 0);
  if (filterVlaue === "with-discount")
    filterCabin = cabin.filter((val) => val.discount > 0);

  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [filed, direaction] = sortBy.split("-");
  const modifier = direaction === "asc" ? 1 : -1;
  const sortData = filterCabin.sort((a, b) => (a[filed] - b[filed]) * modifier);

  return (
    <Menus>
      <Table role="table" columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
        <Table.Header role="row">
          <div></div>
          <div>cabin</div>
          <div>capacity</div>
          <div>price</div>
          <div>discount</div>
          <div></div>
        </Table.Header>
        {/* {cabin.map((val) => (
        <CabinRow cabin={val} key={val.id} />
      ))} */}

        {/* prop render  */}
        <Table.Body
          data={sortData}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
