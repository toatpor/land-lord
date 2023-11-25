import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCain from "../features/cabins/AddCain";
import CabinOperation from "../features/cabins/CabinOperation";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinOperation />
      </Row>
      <Row>
        <CabinTable />
      </Row>
      <AddCain />
    </>
  );
}

export default Cabins;
