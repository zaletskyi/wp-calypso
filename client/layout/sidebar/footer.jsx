/** @format */

/**
 * External dependencies
 */

import React from 'react';
import { localize } from 'i18n-calypso';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

const SidebarFooter = ( { children } ) => (
	<div className="sidebar__footer">
		{ children }
	</div>
);

const mapState = () => ( { isHappychatButtonVisible: false } );

export default connect( mapState )( localize( SidebarFooter ) );
