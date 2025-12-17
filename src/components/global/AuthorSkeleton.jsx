import React from "react";

const AuthorSkeleton = () => {
  return (
    <>
      <div
        className="profile_avatar skeleton-box"
        style={{
          width: "165px",
          height: "165px",
          borderRadius: "50%",
        }}
      >
        <i className="fa fa-check"></i>
      </div>
      <div className="profile_name">
        <h4>
          <div
            className="skeleton-box"
            style={{ width: "120px", height: "25px" }}
          ></div>
          <div className="profile_username">
            @
            <div
              className="skeleton-box"
              style={{ width: "80px", height: "15px" }}
            ></div>
          </div>
          <div id="wallet" className="profile_wallet">
            <div
              className="skeleton-box"
              style={{
                width: "120px",
                height: "15px",
                marginRight: "10px",
              }}
            ></div>
          </div>
          <button
            id="btn_copy"
            title="Copy Wallet Address"
            style={{ cursor: "pointer" }}
          >
            Copy
          </button>
        </h4>
      </div>
    </>
  );
};

export default AuthorSkeleton;
