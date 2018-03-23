/** @format */

/**
 * External dependencies
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import UrlPreview from 'blocks/url-preview';
import { getCurrentLayoutFocus } from 'state/ui/layout-focus/selectors';
import { getCurrentPreviewType } from 'state/ui/preview/selectors';

class SitePreview extends Component {
	render() {
		return <UrlPreview showPreview={ this.props.showPreview } />;
	}
}

SitePreview.propTypes = {
	currentPreviewType: PropTypes.string,
	showPreview: PropTypes.bool,
};

SitePreview.defaultProps = {
	currentPreviewType: 'site-preview',
	showPreview: false,
};

const mapStateToProps = state => ( {
	currentPreviewType: getCurrentPreviewType( state ),
	showPreview: getCurrentLayoutFocus( state ) === 'preview',
} );

export default connect( mapStateToProps )( SitePreview );
