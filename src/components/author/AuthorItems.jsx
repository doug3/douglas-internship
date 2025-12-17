import React from "react";
import LargeCard from "../global/LargeCard";
import LargeSkeleton from "../global/LargeSkeleton";

const AuthorItems = ({ authorCollection, authorImage, authorId }) => {
  const nftCollection = authorCollection || [];

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {nftCollection.length > 0
            ? nftCollection.map((nftItem) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={nftItem.id}
                >
                  <LargeCard item={nftItem} authorImage={authorImage} authorId={authorId}/>
                </div>
              ))
            :
          new Array(8).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <LargeSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
