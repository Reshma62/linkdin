import { useState } from "react";

function Modal({ toggleModal, children, title, sendInfo }) {
  return (
    <>
      {/* The overlay */}

      <div className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          {/* The modal */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              {/* Modal content goes here */}
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm leading-5 text-gray-500">{children}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                {/* <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-primary text-base leading-6 font-medium text-white shadow-sm  focus:outline-none  focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5 mr-5"
                  onClick={sendInfo}
                >
                  Send
                </button> */}
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-primary text-base leading-6 font-medium text-white shadow-sm  focus:outline-none  focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  onClick={toggleModal}
                >
                  Close
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* The button that opens the modal */}
    </>
  );
}
export default Modal;
