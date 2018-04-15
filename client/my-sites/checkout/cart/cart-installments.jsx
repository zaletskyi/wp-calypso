/** @format */

/**
 * External dependencies
 */

import React from 'react';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import FormRadiosBar from 'components/forms/form-radios-bar';
import FormLabel from 'components/forms/form-label';
import analytics from 'lib/analytics';
import { applyInstallments } from 'lib/upgrades/actions';

class CartInstallments extends React.Component {
	static displayName = 'CartInstallments';

	constructor( props ) {
		super( props );
		const installments = props.cart.installments,
			cartHadInstallmentsBeforeMount = props.cart.installments > 1;

		this.state = {
			isInstallmentsFormShowing: cartHadInstallmentsBeforeMount,
			hasSubmittedInstallments: cartHadInstallmentsBeforeMount,
			installmentsInputValue: installments.toString(),
			userChangedInstallments: false,
		};
	}

	componentWillReceiveProps( nextProps ) {
		if ( ! this.state.userChangedInstallments ) {
			this.setState( { installmentsInputValue: nextProps.cart.installments.toString() } );
		}
	}

	handleInstallmentsInput = event => {
		this.setState( {
			userChangedInstallments: true,
			installmentsInputValue: event.target.value,
		} );

		analytics.tracks.recordEvent( 'calypso_checkout_installments_submit', {
			installments: this.state.installmentsInputValue,
		} );

		applyInstallments( event.target.value );

		this.setState( {
			userChangedInstallments: false,
			hasSubmittedInstallments: true,
		} );
	};

	getInstallmentsForm = () => {
		if (
			! this.state.isInstallmentsFormShowing ||
			this.props.cart.installments_plans.length === 0
		) {
			return;
		}

		return (
			<form>
				<FormLabel htmlFor="installments_number">
					{ this.props.translate( 'Installment Payments' ) }
				</FormLabel>
				<FormRadiosBar
					id="installments_number"
					checked={ this.state.installmentsInputValue }
					isThumbnail={ false }
					items={ this.props.cart.installments_plans }
					onChange={ this.handleInstallmentsInput }
				/>
			</form>
		);
	};

	render() {
		return <div className="cart__cart-installments">{ this.getInstallmentsForm() }</div>;
	}
}

export default localize( CartInstallments );
