import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import OwlCarousel from "react-owl-carousel";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  const fetchCollections = async () => {
    try {
      const response = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setCollections(response.data);
    } catch (error) {
      console.error("Error fetching hot collections:", error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [collections.length]);

  return (
    <section id="section-collections" className="w-screen no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
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
              ? Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index}>
                      <div className="nft_coll">
                        <div className="">
                          <div
                            className="lazy img-fluid skeleton-box"
                            style={{ width: "300px", height: "200px" }}
                          ></div>
                        </div>
                        <div className="nft_coll_pp">
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
                        <div
                          className="nft_coll_info"
                          style={{ marginBottom: "-15px" }}
                        >
                          <div
                            className="skeleton-box"
                            style={{ height: "20px", width: "80px" }}
                          ></div>
                        </div>
                        <div className="nft_coll_info">
                          <div
                            className="skeleton-box"
                            style={{ height: "15px", width: "50px" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))
              : collections.map((collection) => (
                  <div key={collection.nftId}>
                    <div className="nft_coll">
                      <div className="">
                        <Link to={`/item-details/${collection.nftId}`}>
                          <img
                            src={collection.nftImage}
                            className="lazy img-fluid"
                            alt={`NFT ${collection.title}`}
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${collection.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={collection.authorImage}
                            alt={`${
                              collection.authorName || "Author"
                            } profile picture`}
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>ERC-{collection.code}</span>
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

export default HotCollections;
