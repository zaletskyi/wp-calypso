/** @format */
/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { localize } from 'i18n-calypso';
import { noop } from 'lodash';
import Gridicon from 'gridicons';

/**
 * Internal Dependencies
 */
import Dialog from 'components/dialog';
import FormLabel from 'components/forms/form-label';
import FormInputCheckbox from 'components/forms/form-checkbox';

class RenameSiteConfirmationDialog extends PureComponent {
	static propTypes = {
		isVisible: PropTypes.bool.isRequired,
		onConfirm: PropTypes.func.isRequired,
		onClose: PropTypes.func.isRequired,
	};

	static defaultProps = {
		onConfirm: noop,
		currentDomainSuffix: '.wordpress.com',
		newDomainSuffix: '.wordpress.com',
	};

	state = {
		isConfirmationChecked: false,
	};

	toggleConfirmationChecked = () => {
		this.setState( {
			isConfirmationChecked: ! this.state.isConfirmationChecked,
		} );
	};

	onConfirm = closeDialog => {
		this.props.onClose();
		this.props.onConfirm( this.props.targetSite, closeDialog );
	};

	onClose = () => {
		this.props.onClose();
		this.setState( {
			isConfirmationChecked: false,
		} );
	};

	render() {
		const {
			disabledDialogButtons,
			isVisible,
			newDomainName,
			newDomainSuffix,
			currentDomainName,
			currentDomainSuffix,
			translate,
		} = this.props;
		const buttons = [
			{
				action: 'cancel',
				label: translate( 'Cancel' ),
				disabled: disabledDialogButtons,
			},
			{
				action: 'confirm',
				label: translate( 'Change Site Address' ),
				onClick: this.onConfirm,
				disabled: disabledDialogButtons || ! this.state.isConfirmationChecked,
				isPrimary: true,
			},
		];

		return (
			<Dialog
				className="simple-site-rename-form__dialog"
				isVisible={ isVisible }
				buttons={ buttons }
				onClose={ this.onClose }
			>
				<h1>{ translate( "Let's Review" ) }</h1>
				<p>
					{ translate(
						'You are about to change your domain name. Once changed, ' +
							'your previous domain name will be unavailable for you or anyone else.'
					) }
				</p>
				<div className="simple-site-rename-form__confirmation-detail">
					<Gridicon icon="cross-circle" size={ 18 } className="simple-site-rename-form__copy-red" />
					<p className="simple-site-rename-form__confirmation-detail-copy">
						<strong className="simple-site-rename-form__copy-red">{ currentDomainName }</strong>
						{ currentDomainSuffix }
						<br />
						{ translate( 'Will be removed and unavailable for use.' ) }
					</p>
				</div>
				<div className="simple-site-rename-form__confirmation-detail">
					<Gridicon
						icon="checkmark-circle"
						size={ 18 }
						className="simple-site-rename-form__copy-green"
					/>
					<p className="simple-site-rename-form__confirmation-detail-copy">
						<strong className="simple-site-rename-form__copy-green">{ newDomainName }</strong>
						{ newDomainSuffix }
						<br />
						{ translate( 'Will be your new primary domain.' ) }
					</p>
				</div>
				<h1>{ translate( 'Check the box to confirm' ) }</h1>
				<FormLabel>
					<FormInputCheckbox
						checked={ this.state.isConfirmationChecked }
						onChange={ this.toggleConfirmationChecked }
					/>
					<span>{ translate( "I've double-checked and understand there is no undo." ) }</span>
				</FormLabel>
			</Dialog>
		);
	}
}

export default localize( RenameSiteConfirmationDialog );
