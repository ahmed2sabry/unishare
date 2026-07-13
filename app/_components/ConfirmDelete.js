import SpinnerMini from "./SpinnerMini";

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <div className=" flex flex-col gap-3 ">
      <h3 className="text-2xl text-center text-primary-500">
        Delete {resourceName}
      </h3>
      <p className="mt-3">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="self-center flex items-center gap-2">
        <button
          className="inline cursor-pointer px-2 py-3 border-gray-200 bg-white hover:bg-gray-200 transition-all duration-300"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </button>
        <button
          className="inline cursor-pointer px-2 py-3 bg-red-800 hover:bg-red-900 transition-all duration-300 text-white disabled:cursor-not-allowed"
          disabled={disabled}
          onClick={onConfirm}
        >
          {disabled ? <SpinnerMini /> : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
