import classNames from 'classnames/bind';

import styles from './AdminProductDetails.module.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

import request from '../../utils/request';

const cx = classNames.bind(styles);

function AdminProductDetails({ productId = '' }) {
    const [product, setProduct] = useState({
        name: '',
        brand: '',
        category: '',
        price: '',
        discount: 0,
        amount: 0,
        description: '',
        avatar: '',
    });

    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await request.get('/products/search', {
                    params: {
                        _id: productId,
                    },
                });

                setProduct(res.data.products[0]);
            } catch (error) {}
        };

        if (productId) {
            fetchProduct();
        }
    }, []);

    const handleUploadImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImage(file);

            const reader = new FileReader();

            reader.onloadend = () => {
                setProduct((prev) => ({
                    ...prev,
                    avatar: reader.result,
                }));
            };

            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);

        try {
            const res = await request.post('/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <form className={cx('product-form')} method="POST" onSubmit={handleSubmit}>
                <div className={cx('form-group')}>
                    <label className={cx('form-label')}>Product name</label>
                    <input
                        name="name"
                        placeholder="Name"
                        value={product.name}
                        className={cx('form-input')}
                        onChange={handleInputChange}
                    />
                </div>

                <div className={cx('form-group')}>
                    <label className={cx('form-label')}>Brand</label>
                    <input
                        name="brand"
                        placeholder="Brand"
                        value={product.brand}
                        className={cx('form-input')}
                        onChange={handleInputChange}
                    />
                </div>

                <div className={cx('form-group')}>
                    <label className={cx('form-label')}>Category</label>
                    <input
                        name="category"
                        placeholder="Category"
                        value={product.category}
                        className={cx('form-input')}
                        onChange={handleInputChange}
                    />
                </div>

                <div className={cx('form-group')}>
                    <label className={cx('form-label')}>Price</label>
                    <input
                        name="price"
                        placeholder="Name"
                        value={product.price}
                        className={cx('form-input')}
                        onChange={handleInputChange}
                    />
                </div>

                <div className={cx('form-group')}>
                    <label className={cx('form-label')}>Discount percent</label>
                    <input
                        name="discount"
                        placeholder="Discount"
                        value={product.discount}
                        className={cx('form-input')}
                        onChange={handleInputChange}
                    />
                </div>

                <div className={cx('form-group')}>
                    <label className={cx('form-label')}>Image</label>
                    <div className={cx('image-section')}>
                        {product.avatar && <img className={cx('product-avatar')} src={product.avatar} />}

                        <button type="button" className={cx('form-input', 'image-button')}>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                className={cx('image-input')}
                                onChange={handleUploadImage}
                            />
                            <span className={cx('upload-icon')}>
                                {' '}
                                <FontAwesomeIcon icon={faUpload} />
                            </span>
                        </button>
                    </div>
                </div>

                <div className={cx('form-group')}>
                    <label className={cx('form-label')}>Description</label>
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={product.description}
                        className={cx('form-input')}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className={cx('submit-button')}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default AdminProductDetails;
