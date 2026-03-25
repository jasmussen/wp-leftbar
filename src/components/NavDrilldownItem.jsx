import { isItemActive } from './NavShell';
import { SLUG_ICONS } from '../icons';

export default function NavDrilldownItem( { entry, currentPage, onDrilldown } ) {
	const active  = entry.item ? isItemActive( entry.item, currentPage ) : false;
	const wpIcon  = entry.item ? ( SLUG_ICONS[ entry.item.slug ] ?? null ) : null;

	return (
		<li className={ `wn-item wn-item--drilldown${ active ? ' wn-item--active' : '' }` }>
			<div className="wn-item__row">
				<button className="wn-item__link wn-item__link--drill" onClick={ onDrilldown }>
					{ wpIcon && (
						<span className="wn-item__icon wn-item__icon--wp" aria-hidden="true">
							{ wpIcon }
						</span>
					) }
					<span className="wn-item__label">{ entry.label }</span>
				</button>
			</div>
		</li>
	);
}
