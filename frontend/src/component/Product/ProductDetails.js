import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, newReview, } from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { useHistory, useParams } from 'react-router-dom';

const ProductDetails = ({ match }) => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const params = useParams();

  const { product, error } = useSelector((state) => state.productDetails);
  const { success, error: reviewError } = useSelector((state) => state.newReview);
  const { isAuthenticated } = useSelector((state) => state.user);

  const options = { value: product.ratings, readOnly: true, precision: 0.5, };

  const [quantity, setQuantity] = useState(0);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [size, setSize] = useState('');

  const increaseQuantity = () => {
    if (size === "Small") {
      if (product.SmallStock <= quantity) return;
      const qty = quantity + 1;
      setQuantity(qty);
    }
    else if (size === "Medium") {
      if (product.MediumStock <= quantity) return;
      const qty = quantity + 1;
      setQuantity(qty);
    }
    else if (size === "Large") {
      if (product.LargeStock <= quantity) return;
      const qty = quantity + 1;
      setQuantity(qty);
    }
  };

  const decreaseQuantity = () => {
    if (size === "Small" || size === "Medium" || size === "Large") {
      if (1 >= quantity) return;
      const qty = quantity - 1;
      setQuantity(qty);
    }
  }

  const addToCartHandler = () => {

    if (!isAuthenticated) {
      history.push('/login');
      alert.error('Please login before adding to cart');
    } else {
      if (size === "") {
        alert.error("Please choose you size")
      } else {
        if (size === "Small") {
          dispatch(addItemsToCart(params.id, quantity, size, product.name, product.price, product.SmallStock));
          alert.success("Item Added To Cart");
        }
        else if (size === "Medium") {
          dispatch(addItemsToCart(params.id, quantity, size, product.name, product.price, product.MediumStock));
          alert.success("Item Added To Cart");
        }
        else if (size === "Large") {
          dispatch(addItemsToCart(params.id, quantity, size, product.name, product.price, product.LargeStock));
          alert.success("Item Added To Cart");
        }
      }
    }
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert, reviewError, success]);

  return (
    <Fragment>
      <Fragment>
        <MetaData title={`${product.name} -- ARTOFTRI`} />
        <div className="ProductDetails">
          <div>
            <Carousel>
              {product.images &&
                product.images.map((item, i) => (
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
              <h2>{product.name}</h2>
              <p>Product # {product._id}</p>
            </div>
            <div className="detailsBlock-2">
              <Rating {...options} />
              <span className="detailsBlock-2-span">
                {" "}
                ({product.numOfReviews} Reviews)
              </span>
            </div>
            <div className="detailsBlock-3">
              <h1>{`???${product.price}`}</h1>
              <select value={size} onChange={(e) => setSize(e.target.value)} className="size-options">
                <option hidden>Select size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
              <div className="detailsBlock-3-1">
                <div className="quantity-block">
                  <button onClick={decreaseQuantity}>-</button>
                  <p>{quantity}</p>
                  <button onClick={increaseQuantity}>+</button>
                </div>
                <button
                  className="addToCart-btn"
                  disabled={product.Stock < 1 ? true : false}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </div>

              <p>
                Status:
                <b className={product.Stock < 3 ? "redColor" : "greenColor"}>
                  {product.Stock < 3 ? "OutOfStock" : "InStock"}
                </b>
              </p>
            </div>

            <div className="detailsBlock-4">
              Description: <p>{product.description}</p>
            </div>

            <button onClick={submitReviewToggle} className="submitReview submitReview-btn">
              Submit Review
            </button>
          </div>
        </div>

        <h3 className="reviewsHeading">REVIEWS</h3>

        <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
        >
          <DialogTitle>Submit Review</DialogTitle>
          <DialogContent className="submitDialog">
            <Rating
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              size="large"
            />

            <textarea
              className="submitDialogTextArea"
              cols="30"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </DialogContent>
          <DialogActions>
            <Button onClick={submitReviewToggle} color="secondary">
              Cancel
            </Button>
            <Button onClick={reviewSubmitHandler} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        {product.reviews && product.reviews[0] ? (
          <div className="reviews">
            {product.reviews &&
              product.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
          </div>
        ) : (
          <p className="noReviews">No Reviews Yet</p>
        )}
      </Fragment>
    </Fragment>
  );
};

export default ProductDetails;
