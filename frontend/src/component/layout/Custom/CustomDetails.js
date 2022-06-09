import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "../../Product/ProductDetails.css";
import { useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../MetaData";
import axios from "axios"
import { useParams, useHistory } from "react-router-dom"
import { addCustomToCart } from "../../../actions/cartAction";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();

  const { id } = useParams();
  const loading = false
  const [customDetails, setCustomDetails] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  const addToCartHandler = () => {
    dispatch(addCustomToCart(customDetails.custom._id, customDetails.custom.Stock, customDetails.custom.description.slice(0,customDetails.custom.description.length)));
    alert.success("Item Added To Cart");
    history.push('/cart');
  };

  useEffect(() => {
    const customDetails = async () => {
      try {
        const data = await axios.get(`/api/v1/custom/details/${id}`)
        setCustomDetails(data.data)
        console.log(data.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    customDetails();

  }, [dispatch, alert,id]);

  return (
    <Fragment>
      {loading ?
        <Loader />
        :
        <>
          {isLoading ? <h1>Please Wait</h1> :
            customDetails &&
            <Fragment>
              <MetaData title={`Custom Design -- ARTOFTRI`} />
              <div className="ProductDetails">
                <div>
                  <Carousel>
                    {customDetails.custom.images.map((item, i) => (
                      <img
                        className="CarouselImage"
                        key={i}
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    ))}
                  </Carousel>
                </div>
                <div>
                  <div className="detailsBlock-1">
                    <h2>{customDetails.custom.name}</h2>
                    <p>Custom # {customDetails.custom._id}</p>
                  </div>
                  <div className="detailsBlock-3">
                    <h1>{`₱${customDetails.custom.price}`}</h1>
                    <span>Size Ordered: { customDetails.custom.description.slice(0,1).toUpperCase() + '' + customDetails.custom.description.slice(1,customDetails.custom.description.length) }</span>
                    <div className="detailsBlock-3-1">
                      <div className="detailsBlock-3-1-1">
                        <span className="quantity-order-btn">Quantity Ordered: {customDetails.custom.Stock} pcs.</span>
                      </div>
                      <button
                        className="custom-add-to-cart-btn"
                        disabled={customDetails.custom.Stock < 1 ? true : false}
                        onClick={addToCartHandler}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  <div className="detailsBlock-4">
                    Description : <p>This is a t-shirt that you designed. By Ordering this product, this will make you feel aesthetic</p>
                  </div>
                </div>
              </div>
            </Fragment>


          }

        </>
      }
    </Fragment>
  );
};

export default ProductDetails;
