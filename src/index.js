import { createRoot } from 'react-dom/client';
import NavShell from './components/NavShell';
import './style.css';

function init() {
	const wrap = document.getElementById( 'adminmenuwrap' );
	if ( ! wrap || ! window.wpNavData ) {
		return;
	}

	// Replace the native menu markup with our React root.
	wrap.innerHTML = '<div id="wn-root"></div>';
	createRoot( document.getElementById( 'wn-root' ) ).render(
		<NavShell data={ window.wpNavData } />
	);
}

// Footer scripts may run before or after DOMContentLoaded depending on the browser.
if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', init );
} else {
	init();
}
