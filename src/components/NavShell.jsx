import { useState, useMemo } from 'react';
import { cog } from '@wordpress/icons';
import NavFolder from './NavFolder';
import NavItem from './NavItem';
import NavDrilldownItem from './NavDrilldownItem';
import NavDrilldown from './NavDrilldown';

function buildNavTree( menuItems, config ) {
	const assignedSlugs = new Set();

	const folders = ( config.folders || [] ).map( ( folder ) => {
		if ( folder.type === 'top-level' || folder.type === 'drilldown' ) {
			const item = menuItems.find( ( m ) => m.slug === folder.slug );
			if ( item ) assignedSlugs.add( item.slug );

			// Collect any extra top-level items to append to the drilldown list.
			const additionalItems = ( folder.additionalSlugs || [] ).map( ( slug ) => {
				const found = menuItems.find( ( m ) => m.slug === slug );
				if ( found ) assignedSlugs.add( slug );
				return found;
			} ).filter( Boolean );

			return { ...folder, item, additionalItems };
		}

		const configSlugs = new Set( folder.slugs || [] );
		const items = [];

		menuItems.forEach( ( item ) => {
			if ( configSlugs.has( item.slug ) ) {
				items.push( item );
				assignedSlugs.add( item.slug );
			}
		} );

		if ( folder.includeCPTs ) {
			menuItems.forEach( ( item ) => {
				if (
					! assignedSlugs.has( item.slug ) &&
					item.slug.startsWith( 'edit.php?post_type=' ) &&
					item.slug !== 'edit.php?post_type=page'
				) {
					items.push( item );
					assignedSlugs.add( item.slug );
				}
			} );
		}

		return { ...folder, items };
	} );

	return folders.map( ( folder ) => {
		if ( ! folder.catchRemaining ) return folder;
		const remaining = menuItems.filter( ( m ) => ! assignedSlugs.has( m.slug ) );
		return { ...folder, items: [ ...( folder.items || [] ), ...remaining ] };
	} );
}

function effectiveSlug( currentPage ) {
	const { file, postType, taxonomy } = currentPage;
	if ( postType ) return `${ file }?post_type=${ postType }`;
	if ( taxonomy ) return `${ file }?taxonomy=${ taxonomy }`;
	return file;
}

export function isExactItemActive( item, currentPage ) {
	const slug = effectiveSlug( currentPage );
	const { page } = currentPage;
	if ( item.slug === slug ) return true;
	if ( page && ( item.slug === page || item.slug === `admin.php?page=${ page }` ) ) return true;
	return false;
}

export function isItemActive( item, currentPage ) {
	if ( isExactItemActive( item, currentPage ) ) return true;
	const slug = effectiveSlug( currentPage );
	const { page } = currentPage;
	return ( item.children || [] ).some(
		( child ) =>
			child.slug === slug ||
			( page && ( child.slug === page || child.slug === `admin.php?page=${ page }` ) )
	);
}

const FOOTER_ICONS = {
	settings: cog,
};

export default function NavShell( { data } ) {
	const { menuItems = [], config = {}, currentPage = {} } = data;

	const navTree = useMemo( () => buildNavTree( menuItems, config ), [ menuItems, config ] );

	const mainEntries   = navTree.filter( ( e ) => e.placement !== 'footer' );
	const footerEntries = navTree.filter( ( e ) => e.placement === 'footer' );

	const [ drilldown, setDrilldown ] = useState( () =>
		navTree.find(
			( e ) => e.type === 'drilldown' && e.item && isItemActive( e.item, currentPage )
		) ?? null
	);

	function openDrilldown( entry ) {
		setDrilldown( ( prev ) => ( prev?.id === entry.id ? null : entry ) );
	}

	return (
		<>
			<div className="wn-panels">
				<div className={ `wn-panel wn-panel--main${ drilldown ? ' wn-panel--shifted' : '' }` }>
					<nav className="wn-nav" role="navigation" aria-label="Admin Navigation">
						<ul className="wn-nav__list">
							{ mainEntries.map( ( entry ) => {
								if ( entry.type === 'top-level' ) {
									return entry.item ? (
										<NavItem
											key={ entry.id }
											item={ entry.item }
											currentPage={ currentPage }
											showIcon
										/>
									) : null;
								}

								if ( entry.type === 'drilldown' ) {
									return entry.item ? (
										<NavDrilldownItem
											key={ entry.id }
											entry={ entry }
											currentPage={ currentPage }
											onDrilldown={ () => openDrilldown( entry ) }
										/>
									) : null;
								}

								return (
									<NavFolder
										key={ entry.id }
										folder={ entry }
										currentPage={ currentPage }
									/>
								);
							} ) }
						</ul>
					</nav>
				</div>

				<div className={ `wn-panel wn-panel--drill${ drilldown ? ' wn-panel--active' : '' }` }>
					{ drilldown && (
						<NavDrilldown
							entry={ drilldown }
							currentPage={ currentPage }
							onBack={ () => setDrilldown( null ) }
						/>
					) }
				</div>
			</div>

			{ footerEntries.length > 0 && (
				<footer className="wn-footer">
					<div className="wn-footer__start">
						{ footerEntries.map( ( entry ) => {
							const icon = FOOTER_ICONS[ entry.id ] ?? cog;
							const active = drilldown?.id === entry.id ||
								( ! drilldown && entry.item && isItemActive( entry.item, currentPage ) );
							return (
								<button
									key={ entry.id }
									className={ `wn-footer__btn${ active ? ' wn-footer__btn--active' : '' }` }
									onClick={ () => openDrilldown( entry ) }
									aria-label={ entry.label }
									aria-expanded={ drilldown?.id === entry.id }
								>
									<span className="wn-footer__btn-icon" aria-hidden="true">{ icon }</span>
								</button>
							);
						} ) }
					</div>
					<div className="wn-footer__end">
						{ /* reserved for future items */ }
					</div>
				</footer>
			) }
		</>
	);
}
