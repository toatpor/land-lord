import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSetting } from "./useSetting";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    settingLoad,
    settingData: {
      minBookingLenght,
      maxBookinglenght,
      maxGuestBooking,
      breakfastPrice,
    } = {},
  } = useSetting();

  const { isSettingLoad, updateSettingApi } = useUpdateSetting();

  const handlerSetting = function (e, filed) {
    const { value } = e.target;
    if (!value) return;
    updateSettingApi({ [filed]: value });
  };

  if (settingLoad) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLenght}
          onBlur={(e) => handlerSetting(e, "minBookingLenght")}
          disabled={isSettingLoad}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input type="number" id="max-nights" defaultValue={maxBookinglenght} />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input type="number" id="max-guests" defaultValue={maxGuestBooking} />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
