import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Edit( { attributes, setAttributes } ) {

	const { name, bio } = attributes;

	const onChangeName = ( value ) => {
		setAttributes( { name: value } );
	}

	const onChangeBio = ( value ) => {
		setAttributes( { bio: value } );
	}

	return (
		<div { ...useBlockProps() }>
			<RichText
				tagName="h4"
				value={ name }
				onChange={ onChangeName }
				placeholder={ __( 'Name', 'team-member' ) }
				allowedFormats={[]}//Disable all formatting options for the name field
			/>
			<RichText
				tagName="p"
				value={ bio }
				onChange={ onChangeBio }
				placeholder={ __( 'Bio', 'team-member' ) }
				allowedFormats={[]}//Disable all formatting options for the bio field
			/>
		</div>
	);
}
