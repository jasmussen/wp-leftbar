import { create } from '@wordpress/icons';
import { isExactItemActive, isItemActive } from './NavShell';
import { SLUG_ICONS } from '../icons';

export default function NavItem( { item, currentPage, showIcon = false } ) {
	const active         = isExactItemActive( item, currentPage );
	const hasActiveChild = ! active && isItemActive( item, currentPage );
	const hasChildren    = item.children?.length > 0;

	const wpIcon = SLUG_ICONS[ item.slug ] ?? null;

	return (
		<li className={ `wn-item${ active ? ' wn-item--active' : '' }` }>
			<div className="wn-item__row">
				<a href={ item.url } className="wn-item__link">
					{ wpIcon ? (
						<span className="wn-item__icon wn-item__icon--wp" aria-hidden="true">
							{ wpIcon }
						</span>
					) : (
						<LegacyIcon icon={ item.icon } />
					) }
					<span className="wn-item__label">{ item.label }</span>
				</a>
				{ item.addNewUrl && (
					<a
						href={ item.addNewUrl }
						className="wn-item__add-new"
						aria-label={ `Add new ${ item.label }` }
						title={ `Add new ${ item.label }` }
					>
						<span className="wn-item__add-new-icon" aria-hidden="true">{ create }</span>
					</a>
				) }
			</div>

			{ hasChildren && ( active || hasActiveChild ) && (
				<ul className="wn-item__children">
					{ item.children.map( ( child ) => (
						<li key={ child.slug }>
							<a
								href={ child.url }
								className={ `wn-item__child-link${ isExactItemActive( child, currentPage ) ? ' wn-item__child-link--active' : '' }` }
							>
								{ child.label }
							</a>
						</li>
					) ) }
				</ul>
			) }
		</li>
	);
}

function LegacyIcon( { icon } ) {
	if ( ! icon || icon === 'none' || icon === 'div' ) return null;

	if ( icon.startsWith( 'dashicons-' ) ) {
		return (
			<span className="wn-item__icon wn-item__icon--legacy" aria-hidden="true">
				<span className={ `dashicons ${ icon }` } />
			</span>
		);
	}

	if ( icon.startsWith( 'data:image' ) || icon.startsWith( 'http' ) ) {
		return (
			<span className="wn-item__icon wn-item__icon--legacy" aria-hidden="true">
				<span className="wn-item__icon--mask" style={ { '--icon-src': `url(${ icon })` } } />
			</span>
		);
	}

	if ( icon.startsWith( '<svg' ) ) {
		return (
			<span
				className="wn-item__icon wn-item__icon--legacy"
				aria-hidden="true"
				dangerouslySetInnerHTML={ { __html: icon } }
			/>
		);
	}

	return null;
}
