import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LargeCard from "../../components/global/LargeCard";
import LargeSkeleton from "../../components/global/LargeSkeleton";

const apiBaseUrl =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

let apiUrl = apiBaseUrl;

const ExploreItems = () => {
  const [collections, setCollections] = useState([]);

  const fetchCollections = async () => {
    try {
      const response = await axios.get(apiUrl);
      setCollections(response.data);
    } catch (error) {
      console.error("Error fetching new items:", error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [collections.length]);

  const [itemsToShow, setItemsToShow] = useState(8);
  const loadMore = document.getElementById("loadmore");

  loadMore?.addEventListener("click", () => {
    if (itemsToShow + 4 >= collections.length) {
      loadMore.style.display = "none";
      setItemsToShow(collections.length);
    } else {
      setItemsToShow(itemsToShow + 4);
    }
  });

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    apiUrl = `${apiBaseUrl}?filter=${filterValue}`;
    fetchCollections();
  };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {collections.length === 0
        ? Array(8)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", backgroundSize: "cover" }}
              >
                <LargeSkeleton />
              </div>
            ))
        : collections.slice(0, itemsToShow).map((item) => (
            <div
              key={item.nftId}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <LargeCard item={item} />
            </div>
          ))}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
