import React, { useState, useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const itemIdNumber = useParams().itemIdNumber;
  const apiUrl = `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${itemIdNumber}`;
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(apiUrl);
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchItem();
  }, [item?.length, itemIdNumber, apiUrl]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {item === null ? (
                <>
                  <div className="col-md-6 text-center">
                    <div
                      className="skeleton-box nft-image img-fluid img-rounded mb-sm-30"
                      style={{ width: "100%", height: "500px" }}
                    ></div>
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <div
                        className="skeleton-box"
                        style={{ width: "80%", height: "40px" }}
                      ></div>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          <div
                            className="skeleton-box"
                            style={{ width: "40px", height: "20px" }}
                          ></div>
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          <div
                            className="skeleton-box"
                            style={{ width: "40px", height: "20px" }}
                          ></div>
                        </div>
                      </div>
                      <div
                        className="skeleton-box" 
                        style={{
                          width: "100%",
                          height: "80px",
                          marginBottom: "20px",
                        }}
                      ></div>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
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
                            <div className="author_list_info">
                              <div
                                className="skeleton-box"
                                style={{ width: "100px", height: "20px" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
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
                            <div className="author_list_info">
                              <div
                                className="skeleton-box"
                                style={{ width: "100px", height: "20px" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <div
                            className="skeleton-box"
                            style={{
                              width: "60px",
                              height: "20px",
                              display: "inline-block",
                              marginLeft: "10px",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={item.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>{item.title}</h2>
                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {item.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {item.likes}
                        </div>
                      </div>
                      <p>{item.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${item.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={item.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${item.ownerId}`}>
                                {item.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${item.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={item.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${item.creatorId}`}>
                                {item.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{item.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              ;
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
