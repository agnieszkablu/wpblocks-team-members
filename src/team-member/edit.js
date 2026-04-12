import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
	return (
		<div { ...useBlockProps() }>
			<p>{ __( 'Hello World, this is the team member block!' ) }</p>
		</div>
	);
}
