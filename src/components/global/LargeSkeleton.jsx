import React from "react";

const LargeSkeleton = ({ index }) => {
  return (
    <div key={index}>
      <div className="nft__item">
        <div className="author_list_pp">
          <div
            className="lazy pp-coll skeleton-box"
            style={{
              border: "1px solid #ccc",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
            }}
          ></div>
          <i className="fa fa-check"></i>
        </div>

        <div className="nft__item_wrap">
          <div className="nft__item_extra">
            <div className="nft__item_buttons">
              <button>Buy Now</button>
              <div className="nft__item_share">
                <h4>Share</h4>
                <a href="" target="_blank" rel="noreferrer">
                  <i className="fa fa-facebook fa-lg"></i>
                </a>
                <a href="" target="_blank" rel="noreferrer">
                  <i className="fa fa-twitter fa-lg"></i>
                </a>
                <a href="">
                  <i className="fa fa-envelope fa-lg"></i>
                </a>
              </div>
            </div>
          </div>
          <div
            className="lazy nft__item_preview skeleton-box"
            style={{ width: "280px", height: "320px" }}
          ></div>
        </div>
        <div className="nft__item_info">
          <div
            className="skeleton-box"
            style={{ height: "20px", width: "140px" }}
          ></div>
          <div className="nft__item_price">
            <div
              className="lazy nft__item_price skeleton-box"
              style={{ height: "15px", width: "90px" }}
            ></div>
          </div>
          <div className="nft__item_like">
            <div
              className="lazy skeleton-box"
              style={{ height: "15px", width: "30px" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LargeSkeleton;
