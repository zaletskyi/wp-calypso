/**
 * @format
 * @jest-environment jsdom
 */

/**
 * External dependencies
 */
import page from 'page';
import React from 'react';
import { externalRedirect } from 'lib/route';
import { identity, noop } from 'lodash';
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import { JetpackConnectMain } from '../main';

const REQUIRED_PROPS = {
	checkUrl: noop,
	confirmJetpackInstallStatus: noop,
	dismissUrl: noop,
	getJetpackSiteByUrl: noop,
	isRequestingSites: false,
	jetpackConnectSite: undefined,
	recordTracksEvent: noop,
	translate: identity,
};

jest.mock( 'page', () => ( {
	redirect: jest.fn(),
} ) );

jest.mock( 'lib/route/path', () => ( {
	externalRedirect: jest.fn(),
} ) );

describe( 'JetpackConnectMain', () => {
	beforeEach( () => {
		externalRedirect.mockReset();
		page.redirect.mockReset();
	} );

	describe( 'cleanUrl', () => {
		test( 'should prepare entered urls for network access', () => {
			const cleanUrl = new JetpackConnectMain( REQUIRED_PROPS ).cleanUrl;
			const results = [
				{ input: '', expected: '' },
				{ input: 'a', expected: 'http://a' },
				{ input: 'example.com', expected: 'http://example.com' },
				{ input: '  example.com   ', expected: 'http://example.com' },
				{ input: 'http://example.com/', expected: 'http://example.com' },
				{ input: 'eXAmple.com', expected: 'http://example.com' },
				{ input: 'example.com/wp-admin', expected: 'http://example.com' },
			];

			results.forEach( ( { input, expected } ) => expect( cleanUrl( input ) ).toBe( expected ) );
		} );
	} );

	describe( 'makeSafeRedirectionFunction', () => {
		test( 'should make a function that can calls the wrapper function', () => {
			const component = shallow( <JetpackConnectMain { ...REQUIRED_PROPS } /> );
			const innerFunc = jest.fn();
			const wrapperFunc = component.instance().makeSafeRedirectionFunction( innerFunc );
			expect( () => wrapperFunc() ).not.toThrow();
		} );

		test( 'should protect against multiple calls', () => {
			const innerFunc = jest.fn();
			const component = shallow( <JetpackConnectMain { ...REQUIRED_PROPS } /> );
			const wrapperFunc = component.instance().makeSafeRedirectionFunction( innerFunc );
			wrapperFunc();
			wrapperFunc();
			wrapperFunc();
			expect( innerFunc ).toHaveBeenCalledTimes( 1 );
		} );
	} );

	describe( 'goToPluginActivation', () => {
		test( 'should fire redirect', () => {
			const component = shallow( <JetpackConnectMain { ...REQUIRED_PROPS } /> );
			component.instance().goToPluginActivation( 'example.com' );

			expect( externalRedirect ).toHaveBeenCalledTimes( 1 );
			expect( externalRedirect.mock.calls[ 0 ] ).toMatchSnapshot();
		} );

		test( 'should dispatch analytics', () => {
			const url = 'example.com';
			const spy = jest.fn();
			const component = shallow(
				<JetpackConnectMain { ...REQUIRED_PROPS } recordTracksEvent={ spy } />
			);
			spy.mockReset();
			component.instance().goToPluginActivation( url );

			expect( spy ).toHaveBeenCalledTimes( 1 );
			expect( spy.mock.calls[ 0 ] ).toMatchSnapshot();
		} );
	} );

	describe( 'goToPluginInstall', () => {
		test( 'should fire redirect', () => {
			const component = shallow( <JetpackConnectMain { ...REQUIRED_PROPS } /> );
			component.instance().goToPluginInstall( 'example.com' );

			expect( externalRedirect ).toHaveBeenCalledTimes( 1 );
			expect( externalRedirect.mock.calls[ 0 ] ).toMatchSnapshot();
		} );

		test( 'should dispatch analytics', () => {
			const url = 'example.com';
			const spy = jest.fn();
			const component = shallow(
				<JetpackConnectMain { ...REQUIRED_PROPS } recordTracksEvent={ spy } />
			);
			spy.mockReset();
			component.instance().goToPluginInstall( url );

			expect( spy ).toHaveBeenCalledTimes( 1 );
			expect( spy.mock.calls[ 0 ] ).toMatchSnapshot();
		} );
	} );

	describe( 'goToRemoteAuth', () => {
		test( 'should fire redirect', () => {
			const component = shallow( <JetpackConnectMain { ...REQUIRED_PROPS } /> );
			component.instance().goToRemoteAuth( 'example.com' );

			expect( externalRedirect ).toHaveBeenCalledTimes( 1 );
			expect( externalRedirect.mock.calls[ 0 ] ).toMatchSnapshot();
		} );

		test( 'should dispatch analytics', () => {
			const url = 'example.com';
			const spy = jest.fn();
			const component = shallow(
				<JetpackConnectMain { ...REQUIRED_PROPS } recordTracksEvent={ spy } />
			);
			spy.mockReset();
			component.instance().goToRemoteAuth( url );

			expect( spy ).toHaveBeenCalledTimes( 1 );
			expect( spy.mock.calls[ 0 ] ).toMatchSnapshot();
		} );
	} );

	describe( 'goToPlans', () => {
		test( 'should fire redirect', () => {
			const component = shallow( <JetpackConnectMain { ...REQUIRED_PROPS } /> );
			component.instance().goToPlans( 'example.com' );

			expect( page.redirect ).toHaveBeenCalledTimes( 1 );
			expect( page.redirect ).toHaveBeenCalledWith( '/jetpack/connect/plans/example.com' );
		} );

		test( 'should redirect to a site slug', () => {
			const url = 'https://example.com/sub-directory-install';
			const component = shallow( <JetpackConnectMain { ...REQUIRED_PROPS } /> );
			component.instance().goToPlans( url );

			expect( page.redirect ).toHaveBeenCalledWith(
				'/jetpack/connect/plans/example.com::sub-directory-install'
			);
		} );

		test( 'should dispatch analytics', () => {
			const url = 'example.com';
			const spy = jest.fn();
			const component = shallow(
				<JetpackConnectMain { ...REQUIRED_PROPS } recordTracksEvent={ spy } />
			);
			spy.mockReset();
			component.instance().goToPlans( url );

			expect( spy ).toHaveBeenCalledTimes( 1 );
			expect( spy.mock.calls[ 0 ] ).toMatchSnapshot();
		} );
	} );
} );
