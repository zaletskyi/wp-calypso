/** @format */

/**
 * External dependencies
 */

import PropTypes from 'prop-types';
import React from 'react';

/**
 * Internal dependencies
 */
import CartItems from 'my-sites/checkout/cart/cart-items';
import CartCoupon from 'my-sites/checkout/cart/cart-coupon';
import CartTotal from 'my-sites/checkout/cart/cart-total';
import CartInstallments from 'my-sites/checkout/cart/cart-installments';

class CartBody extends React.PureComponent {
	constructor( props ) {
		super( props );
	}

	render() {
		const { cart, collapse, selectedSite, showCoupon, showInstallments } = this.props;

		return (
			<div className="cart-body">
				<CartItems collapse={ collapse } cart={ cart } selectedSite={ selectedSite } />
				{ showInstallments && <CartInstallments cart={ cart } /> }
				<CartTotal cart={ cart } />
				{ showCoupon && <CartCoupon cart={ cart } /> }
			</div>
		);
	}
}

CartBody.propTypes = {
	collapse: PropTypes.bool,
};

CartBody.defaultProps = {
	collapse: false,
	showCoupon: false,
	showInstallments: false,
};

export default CartBody;
