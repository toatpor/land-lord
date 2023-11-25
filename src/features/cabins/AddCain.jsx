import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCain() {
  return (
    <Modal>
      <Modal.Open openWindow={"cabin-name"}>
        <Button>Create Cabin</Button>
      </Modal.Open>
      <Modal.Window name={"cabin-name"}>
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}
//   const [showForm, setShowForm] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setShowForm((show) => !show)}>
//         Add new cabin
//       </Button>
//       {showForm && (
//         <Modal onhandleCloseModel={() => setShowForm(false)}>
//           <CreateCabinForm onCloseModel={() => setShowForm(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCain;
