import { createRoot } from 'react-dom/client';
import NavShell from './components/NavShell';
import StarButton from './components/StarButton';
import { isExactItemActive } from './components/NavShell';
import './style.css';

function init() {
	const { menuItems = [], currentPage = {}, favorites = [] } = window.wnNavData ?? {};

	// ── Main nav ──────────────────────────────────────────────
	// Append our root rather than replacing innerHTML. This keeps #adminmenu
	// in the DOM so WordPress's common.js can read menu state and call
	// window.wpNavMenuClassChange with valid data — required by Jetpack and
	// other plugins that override that function.
	const wrap = document.getElementById( 'adminmenuwrap' );
	if ( wrap && window.wnNavData ) {
		const wn = document.createElement( 'div' );
		wn.id = 'wn-root';
		wrap.appendChild( wn );
		createRoot( wn ).render( <NavShell data={ window.wnNavData } /> );
	}

	// ── Star button ───────────────────────────────────────────
	const heading = document.querySelector( '.wp-heading-inline' );
	if ( ! heading || ! window.wnNavData ) return;

	// Find the menu item for the current page using the same active-state
	// logic as the nav, so plugin pages (admin.php?page=xxx) match correctly.
	let matchedItem = menuItems.find( ( m ) => isExactItemActive( m, currentPage ) );
	if ( ! matchedItem ) {
		for ( const item of menuItems ) {
			const child = ( item.children || [] ).find( ( c ) => isExactItemActive( c, currentPage ) );
			if ( child ) {
				matchedItem = child;
				break;
			}
		}
	}

	if ( ! matchedItem ) return;

	const slug            = matchedItem.slug;
	const initialFavorited = favorites.some( ( f ) => f.slug === slug );

	const starRoot = document.createElement( 'span' );
	starRoot.id    = 'wn-star-root';
	heading.insertAdjacentElement( 'afterend', starRoot );

	createRoot( starRoot ).render(
		<StarButton
			slug={ slug }
			label={ matchedItem.label }
			icon={ slug }
			initialFavorited={ initialFavorited }
		/>
	);
}

// Footer scripts may run before or after DOMContentLoaded depending on the browser.
if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', init );
} else {
	init();
}
