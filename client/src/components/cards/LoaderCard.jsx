import React from "react";
import { Skeleton } from "antd";

const LoaderCard = ({ count }) => {
  const productSkeleton = () => {
    let totalCard = [];

    for (let i = 0; i < count; i++) {
      totalCard.push(
        <div className="col-md-12 col-lg-6 col-xl-4" key={totalCard}>
          <div className="card">
            <div className="card-body">
              <div className="dimmer active">
                <div>
                  <div></div>
                  <div></div>
                  <Skeleton active avatar></Skeleton>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>,
      );
    }

    return totalCard;
  };

  return <div className="row pb-5">{productSkeleton()}</div>;
};

export default LoaderCard;
