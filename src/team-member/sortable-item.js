import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import socialIcons from './social-icons';
import { Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function SortableItem(props) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition
	} =
		useSortable({ id: props.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	};

	return (
		<li
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={`team-member-social-link ${ props.isSelected && props.selectedLink === props.index ? 'is-selected' : '' }`}
		>
			<button
					aria-label={ __( 'Edit Social Link', 'team-member' ) }
					onClick={ () => props.setSelectedLink( props.index ) }
				>
					<Icon icon={ socialIcons[ props.icon ] ? socialIcons[ props.icon ] : socialIcons.github } />
				</button>
		</li>
	);
}
