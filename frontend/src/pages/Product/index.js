import classNames from 'classnames/bind';

import styles from './Product.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faStar as filledStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as normalStar } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';

import request from '../../utils/request';

import { default as ProductComp } from '../../components/Product';
import PopupMessage from '../../components/PopupMessage';

const cx = classNames.bind(styles);

function Product() {
    const [product, setProduct] = useState(null);
    const [capacity, setCapacity] = useState(100);
    const [amount, setAmount] = useState(0);
    const [section, setSection] = useState('info');
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    const [relatedProduct, setRelatedProduct] = useState([]);

    const [messages, setMessages] = useState([]);
    const [header, setHeader] = useState('');
    const [popup, setPopup] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await request.get('/products/search', { params: { _id: id } });

                setProduct(res.data.products[0]);
            } catch (err) {
                setProduct(null);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await request.get('/productsReviews/search', {
                    params: {
                        productId: id,
                    },
                });
                console.log(res.data.reviews);
                setReviews(res.data.reviews);
            } catch (err) {
                setReviews(null);
            }
        };

        fetchReviews();
    }, [id]);

    useEffect(() => {
        const fetchRelatedProduct = async () => {
            try {
                const res = await request.get('/products/search', { params: { category: product.category } });

                const products = res.data.products;

                setRelatedProduct(products.filter((related) => related._id !== product._id));
            } catch (err) {}
        };

        fetchRelatedProduct();
    }, [product]);

    const handleBuy = async () => {
        await handleAddToCart();
        navigate('/delivery');
    };

    const handleAddToCart = async () => {
        try {
            const res = await request.post('/addToCart', {
                productId: product._id,
                productName: product.name,
                productPrice: product.price - (product.price * product.discount) / 100,
                quantity: amount,
            });

            if (res.data.message === '') {
                setMessages([product.name, 'Quantity: ' + amount]);
                setHeader('Product added to cart');
            } else {
                setMessages([res.data.message]);
            }
        } catch (err) {
            setMessages(['An error occurred while adding to cart! Please try again']);
        }

        setPopup(true);
    };

    return (
        <div className={cx('wrapper')}>
            {product && (
                <div className={cx('container')}>
                    <span className={cx('path')}>
                        Home / Perfume / <b>{product.name}</b>
                    </span>
                    <div className={cx('product-content')}>
                        <img src={product.avatar} className={cx('main-image')} />
                        {product.discount !== 0 && <div className={cx('discount-label')}>-{product.discount}%</div>}
                        <div className={cx('product-info')}>
                            <span className={cx('product-name')}>{product.name}</span>
                            <div className={cx('product-price')}>
                                <span className={cx('product-new-price')}>
                                    {(product.price - (product.price * product.discount) / 100).toLocaleString(
                                        'it-IT',
                                        { style: 'currency', currency: 'VND' },
                                    )}
                                </span>
                                {product.discount !== 0 && (
                                    <span className={cx('product-old-price')}>
                                        ({product.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                        )
                                    </span>
                                )}
                            </div>
                            <div className={cx('product-description')}>
                                <span className={cx('description-header')}>Description</span>
                                <div className={cx('description-detail')}>
                                    Brand: {product.brand}
                                    <br />
                                    Type: {product.category}
                                    <br />
                                    Origin: {product.origin || 'France'}
                                    <br />
                                    Scent: {product.scent}
                                </div>
                            </div>

                            <div className={cx('capacity')}>
                                <span className={cx('capacity-header')}>Capacity</span>
                                <div className={cx('capacity-buttons')}>
                                    <button
                                        className={cx('capacity-btn', { selected: capacity === 50 })}
                                        onClick={() => setCapacity(50)}
                                    >
                                        50ml
                                    </button>
                                    <button
                                        className={cx('capacity-btn', { selected: capacity === 100 })}
                                        onClick={() => setCapacity(100)}
                                    >
                                        100ml
                                    </button>
                                </div>
                            </div>

                            <div className={cx('quantity')}>
                                <span className={cx('quantity-header')}>Quantity</span>
                                <div className={cx('quantity-buttons')}>
                                    <button
                                        className={cx('quantity-btn', { disabled: amount <= 0 })}
                                        onClick={() => setAmount((prev) => prev - 1)}
                                    >
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                    <div className={cx('quantity-label')}>{amount}</div>
                                    <button
                                        className={cx('quantity-btn', { disabled: amount >= product.amount })}
                                        onClick={() => setAmount((prev) => prev + 1)}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                            </div>

                            <div className={cx('cart-buttons')}>
                                <button
                                    className={cx('cart-btn', 'addToCart-btn', { disabled: amount === 0 })}
                                    onClick={handleAddToCart}
                                >
                                    ADD TO CART
                                </button>
                                <button
                                    className={cx('cart-btn', 'buy-btn', { disabled: product.amount === 0 })}
                                    onClick={handleBuy}
                                >
                                    BUY NOW
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('more-info')}>
                        <span className={cx('more-info-header')}>PRODUCT INFORMATION</span>
                        <div className={cx('more-info-buttons')}>
                            <button
                                className={cx('more-info-btn', { selected: section === 'info' })}
                                onClick={() => setSection('info')}
                            >
                                More infomation
                            </button>
                            <button
                                className={cx('more-info-btn', { selected: section === 'reviews' })}
                                onClick={() => setSection('reviews')}
                            >
                                Reviews
                            </button>
                        </div>

                        {section === 'info' && <div className={cx('info')}>{product.description}</div>}
                        {section === 'reviews' && (
                            <div className={cx('reviews')}>
                                {reviews.length > 0 &&
                                    reviews.slice(0, 2).map((review, index) => (
                                        <div key={index} className={cx('review')}>
                                            <div className={cx('review-info')}>
                                                <div className={cx('review-avatar')}>{review.userId.name[0]}</div>
                                                <span className={cx('review-name')}>{review.userId.name}</span>
                                                <span className={cx('review-stars')}>
                                                    {[1, 2, 3, 4, 5].map((value) => (
                                                        <span key={value} className={cx('star-icon')}>
                                                            <FontAwesomeIcon
                                                                icon={value > review.stars ? normalStar : filledStar}
                                                            />
                                                        </span>
                                                    ))}
                                                </span>
                                                <span className={cx('review-date')}>
                                                    Posted on {new Date(review.date).toLocaleDateString()}
                                                </span>
                                            </div>

                                            <div className={cx('review-content')}>{review.content}</div>
                                        </div>
                                    ))}
                            </div>
                        )}

                        {section === 'info' && (
                            <div className={cx('related-products')}>
                                <span className={cx('related-products-header')}>RELATED PRODUCTS</span>
                                {relatedProduct.length > 0 &&
                                    relatedProduct.slice(0, 6).map((related, index) => (
                                        <div key={index} className={cx('related-product')}>
                                            <ProductComp product={related} />
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {popup && (
                <PopupMessage
                    image={product.avatar}
                    header={header}
                    messageRow={messages}
                    callback={(e) => {
                        e.preventDefault();

                        setPopup(false);
                    }}
                />
            )}
        </div>
    );
}

export default Product;
