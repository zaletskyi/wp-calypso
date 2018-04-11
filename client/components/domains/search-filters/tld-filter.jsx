/** @format */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Gridicon from 'gridicons';
// import { pick, noop } from 'lodash';

/**
 * Internal dependencies
 */
import FormLabel from 'components/forms/form-label';
import FormFieldset from 'components/forms/form-fieldset';
import Popover from 'components/popover';
import Button from 'components/button';

export default class TldFilterControl extends Component {
	static propTypes = {
		onChange: PropTypes.func.isRequired,
		onFiltersReset: PropTypes.func.isRequired,
		onFiltersSubmit: PropTypes.func.isRequired,
		tlds: PropTypes.arrayOf( PropTypes.string ),
	};

	state = {
		showPopover: false,
	};

	togglePopover = () => {
		this.setState( {
			showPopover: ! this.state.showPopover,
		} );
	};

	render() {
		const { tlds, translate } = this.props;
		const hasFilterValue = tlds.length > 0;
		return (
			<div className="search-filters__more-filters">
				<Button
					primary={ hasFilterValue }
					ref={ button => ( this.button = button ) } // eslint-disable-line react/jsx-no-bind
					onClick={ this.togglePopover }
				>
					{ translate( 'More Filters' ) }
					<Gridicon icon="chevron-down" size={ 24 } />
				</Button>

				{ this.state.showPopover && this.renderPopover() }
			</div>
		);
	}

	renderPopover() {
		const { tlds, translate } = this.props;
		console.log( tlds, translate ); // eslint-disable-line

		return (
			<Popover
				autoPosition={ false }
				className="search-filters__popover"
				context={ this.button }
				isVisible={ this.state.showPopover }
				onClose={ this.togglePopover }
				position="bottom right"
			>
				<FormFieldset className="search-filters__checkboxes-fieldset">
					<FormLabel
						className="search-filters__label"
						htmlFor="search-filters-show-exact-matches-only"
					>
						{ /*
						<FormInputCheckbox
							className="search-filters__checkbox"
							checked={ tlds }
							id="search-filters-show-exact-matches-only"
							name="showExactMatchesOnly"
							onChange={ this.handleOnChange }
							value="showExactMatchesOnly"
						/>
						<span className="search-filters__checkbox-label">
							{ translate( 'Show exact matches only' ) }
						</span>
						*/ }
					</FormLabel>
				</FormFieldset>
			</Popover>
		);
	}
}
