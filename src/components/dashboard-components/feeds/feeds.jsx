import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import axios from "axios";

const Feeds = () => {
  const [feeds, setFeeds] = useState([]);
  let feedsData = [];

  useEffect(() => {
    axios.get("http://localhost:1337/feeds").then((resp) => {
      setFeeds(resp.data);
    });
  }, []);

  feeds.forEach((feed, i) => {
    let type = "";
    switch (feed.type) {
      case "bell":
        type = "far fa-bell";

        break;

      case "server":
        type = "ti-server";

        break;

      case "cart":
        type = "ti-shopping-cart";

        break;

      case "user":
        type = "ti-user";

        break;

      default:
        break;
    }

    feedsData[i] = {
      severity: `feed-icon bg-${feed.severity}`,
      message: feed.message,
      time: feed.time,
      type: type,
    };
  });

  return (
    <Card>
      <CardBody>
        <CardTitle>Feeds</CardTitle>
        <div className="feed-widget">
          <ul className="list-style-none feed-body m-0 pb-3">
            {feedsData.map((feed, index) => (
              <li className="feed-item" key={index}>
                <div className={feed.severity}>
                  <i className={feed.type}></i>
                </div>{" "}
                {feed.message}{" "}
                <span className="ml-auto font-12 text-muted">{feed.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardBody>
    </Card>
  );
};

export default Feeds;
