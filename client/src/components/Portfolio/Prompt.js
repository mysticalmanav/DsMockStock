import React, { useState } from "react";

const Dialog = ({ setTrue, isOpen, setIsOpen }) => {
  const closeDialog = () => {
    setTrue(false);
    setIsOpen(false);
  };
  const closeDialog2 = () => {
    setTrue(true);
    setIsOpen(false);
  };

  return (
  <>{isOpen && (  <div>
      
        <div
          className="modal-dialog modal-dialog-centered"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "1000",
            width: "400px",
          }}
        >
          <div
            className="modal-content p-5"
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="modal-header">
              <h5 className="modal-title pb-3">Confirmation</h5>
              
            </div>
            <div className="modal-body">
              <p>All the selected stock sold position will be cleared.</p>
            </div>
            <div className="modal-footer">
              <a
                className="text-primary mx-3 text-decoration-none"
                onClick={closeDialog2}
                style={{ cursor: "pointer" }}
              >
                OK
              </a>
              <a
                className="text-primary mx-3 text-decoration-none"
                onClick={closeDialog}
                style={{ cursor: "pointer" }}
              >
                Cancel
              </a>
            </div>
          </div>
        </div>
      <div
        className="modal-backdrop fade show"
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: "999",
        }}
      ></div> 
    </div>
    )}</>

  );
};

export default Dialog;
