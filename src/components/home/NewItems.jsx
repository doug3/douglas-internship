import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import CountdownTimer from "../global/CountdownTimer";
import LargeCard from "../global/LargeCard";
import LargeSkeleton from "../global/LargeSkeleton";

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
                  <LargeSkeleton key={index} />
                ))
              : collections.map((item) => (
                  <LargeCard key={item.nftId} item={item} />
                ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
