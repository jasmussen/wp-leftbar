const getHeaders = () => ( {
	'Content-Type': 'application/json',
	'X-WP-Nonce':   window.wnNavData?.restNonce ?? '',
} );

const baseUrl = () => window.wnNavData?.restUrl ?? '';

export async function apiFavoriteAdd( { slug, label, icon } ) {
	const res = await fetch( baseUrl() + 'favorites', {
		method:  'POST',
		headers: getHeaders(),
		body:    JSON.stringify( { slug, label, icon } ),
	} );
	if ( ! res.ok ) throw new Error( `wn: add favorite failed ${ res.status }` );
	return res.json();
}

export async function apiFavoriteDelete( slug ) {
	const res = await fetch( baseUrl() + 'favorites/' + encodeURIComponent( slug ), {
		method:  'DELETE',
		headers: getHeaders(),
	} );
	if ( ! res.ok ) throw new Error( `wn: delete favorite failed ${ res.status }` );
	return res.json();
}
