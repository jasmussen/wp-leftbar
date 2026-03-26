import { useState } from 'react';
import { Icon, starEmpty, starFilled } from '@wordpress/icons';
import { apiFavoriteAdd, apiFavoriteDelete } from '../api';

export default function StarButton( { slug, label, icon, initialFavorited } ) {
	const [ favorited, setFavorited ] = useState( initialFavorited );
	const [ busy, setBusy ]           = useState( false );

	async function toggle() {
		if ( busy ) return;
		setBusy( true );
		const next = ! favorited;
		try {
			if ( next ) {
				await apiFavoriteAdd( { slug, label, icon } );
			} else {
				await apiFavoriteDelete( slug );
			}
			setFavorited( next );
			window.dispatchEvent(
				new CustomEvent( 'wn:favorite-toggled', {
					detail: { slug, label, icon, favorited: next },
				} )
			);
		} catch ( err ) {
			console.error( err );
		} finally {
			setBusy( false );
		}
	}

	return (
		<button
			className={ `wn-star${ favorited ? ' wn-star--active' : '' }` }
			onClick={ toggle }
			disabled={ busy }
			aria-label={ favorited ? 'Remove from Favorites' : 'Add to Favorites' }
			aria-pressed={ favorited }
		>
			<Icon icon={ favorited ? starFilled : starEmpty } size={ 20 } />
		</button>
	);
}
