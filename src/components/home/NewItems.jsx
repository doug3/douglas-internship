import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import CountdownTimer from "../global/CountdownTimer";

const NewItems = () => {
  const [collections, setCollections] = useState([]);

  const fetchCollections = async () => {
    try {
      const response = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setCollections(response.data);
    } catch (error) {
      console.error("Error fetching new items:", error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [collections.length]);


  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel
            className="owl-carousel"
            loop
            margin={10}
            nav
            items={4}
            dots={false}
            responsive={{
              0: { items: 1 },
              640: { items: 2 },
              768: { items: 3 },
              1000: { items: 4 },
            }}
          >
            {collections.length === 0
              ? new Array(4).fill(0).map((_, index) => (
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
                          ></div></div>
                        <div className="nft__item_like">
                          <div className="lazy skeleton-box" style={{ height: "15px", width: "30px" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : collections.map((item) => (
                  <div key={item.nftId}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={`Creator: ${item.authorName}`}
                        >
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {(item.expiryDate > Date.now()) && (   
                        <div className="de_countdown">
                          <CountdownTimer expiryDate={item.expiryDate} />
                        </div>
                      )}
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
                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${item.nftId}`}>
                          <h4>{item.title}</h4>
                        </Link>
                        <div className="nft__item_price">{item.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
