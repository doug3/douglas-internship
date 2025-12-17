import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const authorIdNumber = useParams().authorIdNumber;
  const apiUrl = `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorIdNumber}`;

  const [authorData, setAuthorData] = useState([]);
  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setAuthorData(response.data);
      } catch (error) {
        console.error("Error fetching author data:", error);
      }
    };

    fetchAuthorData();
  }, [authorData.length, apiUrl]);

  const copyButton = () => {
    const walletText = document.getElementById("wallet").innerText;
    navigator.clipboard.writeText(walletText);
    alert("Wallet address copied to clipboard!");
  };

  const followButton = () => {
    const followersCount = document.getElementsByClassName("profile_follower")[0];
    let followersNumber = followersCount.innerText.split(" ")[0].replace(/,/g, '');
    followersNumber = parseInt(followersNumber, 10);
    const followBtn = document.getElementById("btn_follow");
    if (followBtn.innerText === "Follow") {
      followersNumber += 1;
      followBtn.innerText = "Unfollow";
    } else {
      if (followersNumber) {followersNumber -= 1;}
      followBtn.innerText = "Follow";
    }
    followersCount.innerText = `${followersNumber} followers`;
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorData.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorData.authorName}
                          <span className="profile_username">
                            @{authorData.tag}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {authorData.authorWallet}
                          </span>
                          <button
                            id="btn_copy"
                            title="Copy Text"
                            onClick={copyButton}
                            style={{ cursor: "pointer" }}
                          >
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {authorData.followers} followers
                      </div>
                        <button className="btn-main" id="btn_follow" style={{ cursor: "pointer" }} onClick={followButton}>
                          Follow
                        </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorCollection={authorData.nftCollection} authorImage={authorData.authorImage} authorId={authorData.authorId}/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
