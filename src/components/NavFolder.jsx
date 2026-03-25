import { useState } from 'react';
import { chevronDownSmall } from '@wordpress/icons';
import NavItem from './NavItem';

export default function NavFolder( { folder, currentPage } ) {
	const { id, label, items = [] } = folder;

	const [ isOpen, setIsOpen ] = useState( () => {
		try {
			const stored = localStorage.getItem( `wn-folder-${ id }` );
			return stored !== null ? stored === 'true' : true; // default open
		} catch {
			return true;
		}
	} );

	function toggle() {
		const next = ! isOpen;
		setIsOpen( next );
		try {
			localStorage.setItem( `wn-folder-${ id }`, String( next ) );
		} catch {}
	}

	if ( ! items.length ) return null;

	return (
		<li className={ `wn-folder${ isOpen ? ' wn-folder--open' : '' }` }>
			<button
				className="wn-folder__trigger"
				onClick={ toggle }
				aria-expanded={ isOpen }
				aria-controls={ `wn-folder-${ id }` }
			>
				<span className="wn-folder__label">{ label }</span>
				<span className="wn-folder__chevron" aria-hidden="true">{ chevronDownSmall }</span>
			</button>

			{ isOpen && (
				<ul className="wn-folder__items" id={ `wn-folder-${ id }` }>
					{ items.map( ( item ) => (
						<NavItem
							key={ item.slug }
							item={ item }
							currentPage={ currentPage }
						/>
					) ) }
				</ul>
			) }
		</li>
	);
}
