import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import StyledForm from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabin = {}, onCloseModal }) {
  const { createCabin, isCreate } = useCreateCabin();
  const { updateCabin, isEdit } = useEditCabin();

  const { id: editCabin, ...cabinValue } = cabin;
  const isEditSession = Boolean(editCabin);
  //formstate can access to error that occured in form
  //getvalues can get value of another field

  const { register, handleSubmit, getValues, formState, reset } = useForm({
    defaultValues: isEditSession ? cabinValue : {},
  });
  const { errors } = formState;

  const isEditOrCreate = isCreate || isEdit;

  const onSubmit = function (data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      updateCabin(
        {
          newCabin: { ...data, image: image },
          id: editCabin,
        },
        {
          onSuccess: () => {
            onCloseModal?.();
            reset();
          },
        }
      );
    else
      createCabin(
        { ...data, image },
        {
          //can access data inside useCreateCain hook to see data
          onSuccess: (data) => {
            onCloseModal?.();
            reset();
          },
        }
      );
  };

  const onError = function (error) {
    // console.log(errors);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "model" : "regular"}
    >
      <StyledForm label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isEditOrCreate}
          {...register("name", {
            required: "This filed is required",
          })}
        />
      </StyledForm>

      <StyledForm label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isEditOrCreate}
          {...register("maxCapacity", {
            required: "This field is required",
          })}
        />
      </StyledForm>

      <StyledForm label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isEditOrCreate}
          {...register("regularPrice", {
            required: "This field is required",
          })}
        />
      </StyledForm>

      <StyledForm label="discount" error={errors?.discount?.message}>
        <Input
          defaultValue={0}
          type="number"
          id="discount"
          disabled={isEditOrCreate}
          {...register("discount", {
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount should be less than regular price",
          })}
        />
      </StyledForm>

      <StyledForm
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isEditOrCreate}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </StyledForm>

      <StyledForm label="Cabin image">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </StyledForm>

      <StyledForm>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isEditOrCreate}>
          {isEditSession ? "Edit Cabin" : "Create new cabin"}
        </Button>
      </StyledForm>
    </Form>
  );
}

export default CreateCabinForm;
