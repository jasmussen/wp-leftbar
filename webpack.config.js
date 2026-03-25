/**
 * Extend @wordpress/scripts webpack config to bundle @wordpress/icons and
 * @wordpress/primitives rather than treating them as wp.* globals (which are
 * not loaded on general admin pages).
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );

const BUNDLE_INLINE = new Set( [ '@wordpress/icons', '@wordpress/primitives' ] );

const plugins = defaultConfig.plugins.filter(
	( plugin ) => plugin.constructor.name !== 'DependencyExtractionWebpackPlugin'
);

module.exports = {
	...defaultConfig,
	plugins: [
		...plugins,
		new DependencyExtractionWebpackPlugin( {
			requestToExternal( request ) {
				if ( BUNDLE_INLINE.has( request ) ) return false;
			},
		} ),
	],
};
