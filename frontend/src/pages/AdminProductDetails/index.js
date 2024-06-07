import classNames from 'classnames/bind';

import styles from './AdminProductDetails.module.scss';
import { useEffect, useState } from 'react';
import request from '../../utils/request';

const cx = classNames.bind(styles);

function AdminProductDetails({ productId = '664ac407c6e342cb70f105f9' }) {
    const [product, setProduct] = useState({
        name: '',
        brand: '',
        category: '',
        price: '',
        amount: 0,
        description: '',
        avatar: '',
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await request.get('/products/search', {
                    params: {
                        _id: productId,
                    },
                });

                console.log(data);
            } catch (error) {}
        };

        if (productId) {
            fetchProduct();
        }
    }, []);

    return <div></div>;
}

export default AdminProductDetails;
