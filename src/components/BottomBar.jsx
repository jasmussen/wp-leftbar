import { createPortal } from 'react-dom';
import { menu, verse, cog } from '@wordpress/icons';

export default function BottomBar( { adminUrl, isNavOpen, onMenuToggle, onSettings, settingsActive } ) {
	return createPortal(
		<>
			{ isNavOpen && (
				<div
					className="wn-nav-overlay"
					onClick={ onMenuToggle }
					aria-hidden="true"
				/>
			) }
			<div className="wn-bottombar" role="navigation" aria-label="Quick actions">
				<button
					className={ `wn-bottombar__btn${ isNavOpen ? ' wn-bottombar__btn--active' : '' }` }
					onClick={ onMenuToggle }
					aria-label="Menu"
					aria-expanded={ isNavOpen }
				>
					<span className="wn-bottombar__icon" aria-hidden="true">{ menu }</span>
					<span className="wn-bottombar__label">Menu</span>
				</button>
				<a
					className="wn-bottombar__btn"
					href={ `${ adminUrl }post-new.php` }
					aria-label="New post"
				>
					<span className="wn-bottombar__icon" aria-hidden="true">{ verse }</span>
					<span className="wn-bottombar__label">New post</span>
				</a>
				<button
					className={ `wn-bottombar__btn${ settingsActive ? ' wn-bottombar__btn--active' : '' }` }
					onClick={ onSettings }
					aria-label="Settings"
				>
					<span className="wn-bottombar__icon" aria-hidden="true">{ cog }</span>
					<span className="wn-bottombar__label">Settings</span>
				</button>
			</div>
		</>,
		document.body
	);
}
