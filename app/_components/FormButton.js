import SpinnerMini from "./SpinnerMini";

function FormButton({ children, isPending }) {
  return (
    <button
      type="submit"
      className="bg-primary-500  text-white py-4 rounded-xl mt-4 hover:bg-primary-600 transition-all font-medium text-lg cursor-pointer"
      disabled={isPending}
    >
      {isPending ? <SpinnerMini /> : children}
    </button>
  );
}

export default FormButton;
