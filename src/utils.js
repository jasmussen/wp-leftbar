/**
 * Derive the effective slug for the current page from the currentPage object.
 * Handles standard pages, CPTs, taxonomies, and plugin pages (admin.php?page=xxx).
 */
export function effectiveSlug( { file, postType, taxonomy, page } ) {
	if ( postType ) return `${ file }?post_type=${ postType }`;
	if ( taxonomy ) return `${ file }?taxonomy=${ taxonomy }`;
	if ( page )     return page; // plugin pages: item.slug === page key, not 'admin.php'
	return file;
}
