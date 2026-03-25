import { chevronLeft } from '@wordpress/icons';
import { isItemActive } from './NavShell';
import { DRILL_ICONS } from '../icons';

function DrillItem( { slug, url, label, currentPage, active } ) {
	const icon = DRILL_ICONS[ slug ] ?? null;
	return (
		<a
			href={ url }
			className={ `wn-drill__item${ active ? ' wn-drill__item--active' : '' }` }
		>
			{ icon && (
				<span className="wn-item__icon wn-item__icon--wp" aria-hidden="true">
					{ icon }
				</span>
			) }
			<span className="wn-item__label">{ label }</span>
		</a>
	);
}

export default function NavDrilldown( { entry, currentPage, onBack } ) {
	const { label, description, item, firstItemLabel, additionalItems = [] } = entry;
	const children = item?.children || [];

	return (
		<div className="wn-drill">
			<div className="wn-drill__header">
				<button
					className="wn-drill__back"
					onClick={ onBack }
					aria-label="Back to main navigation"
				>
					<span className="wn-drill__back-icon" aria-hidden="true">
						{ chevronLeft }
					</span>
				</button>
				<span className="wn-drill__title">{ label }</span>
			</div>

			{ description && (
				<p className="wn-drill__description">{ description }</p>
			) }

			<ul className="wn-drill__list">
				{ item && firstItemLabel && (
					<li>
						<DrillItem
							slug={ item.slug }
							url={ item.url }
							label={ firstItemLabel }
							currentPage={ currentPage }
							active={ isItemActive( { ...item, children: [] }, currentPage ) }
						/>
					</li>
				) }

				{ children.map( ( child ) => (
					<li key={ child.slug }>
						<DrillItem
							slug={ child.slug }
							url={ child.url }
							label={ child.label }
							currentPage={ currentPage }
							active={ isItemActive( child, currentPage ) }
						/>
					</li>
				) ) }

				{ additionalItems.map( ( addl ) => (
					<li key={ addl.slug }>
						<DrillItem
							slug={ addl.slug }
							url={ addl.url }
							label={ addl.label }
							currentPage={ currentPage }
							active={ isItemActive( addl, currentPage ) }
						/>
					</li>
				) ) }
			</ul>
		</div>
	);
}
