/**
 * Icon maps — keyed by WP menu slug.
 * Import from @wordpress/icons (bundled via webpack.config.js).
 */
import {
	home,
	styles,
	verse,
	image,
	page,
	comment,
	plugins,
	brush,
	layout,
	code,
	pencil,
	widget,
	navigation,
	typography,
	settings,
	seen,
	media,
	link,
	shield,
	people,
	tool,
	connection,
	starFilled,
} from '@wordpress/icons';

/** Top-level sidebar items */
export const SLUG_ICONS = {
	'index.php':               home,
	'themes.php':              styles,
	'edit.php':                verse,
	'upload.php':              image,
	'edit.php?post_type=page': page,
	'edit-comments.php':       comment,
	'plugins.php':             plugins,
};

/** Drilldown panel items — Design & Settings */
export const DRILL_ICONS = {
	// Design / Appearance
	'themes.php':                    brush,
	'site-editor.php':               layout,
	'theme-editor.php':              code,
	'customize.php':                 pencil,
	'widgets.php':                   widget,
	'nav-menus.php':                 navigation,
	'themes.php?page=gutenberg-fonts':  typography,
	'admin.php?page=font-library-wp-admin': typography,
	'font-library-wp-admin':            typography,
	'font-library.php':                 typography,

	// Settings
	'options-general.php':    settings,
	'options-writing.php':    pencil,
	'options-reading.php':    seen,
	'options-discussion.php': comment,
	'options-media.php':      media,
	'options-permalink.php':  link,
	'options-privacy.php':    shield,
	'users.php':                        people,
	'tools.php':                        tool,
	'options-connectors.php':           connection,
	'ai':                               starFilled,
};
