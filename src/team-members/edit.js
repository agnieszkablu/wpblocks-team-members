import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl  } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { columns } = attributes;
	const onChangeColumns = ( newColumns ) => {
		setAttributes( { columns: newColumns } );
	}

	return (
		<div { ...useBlockProps( {
			className: `has-${ columns }-columns`
		}) }>
			<InspectorControls>
				<PanelBody title={ __( 'Team Members Settings', 'team-members' ) }>
					<RangeControl
						label={ __( 'Columns', 'team-members' ) }
						value={ columns }
						onChange={ onChangeColumns }
						min={ 1 }
						max={ 6 }
					/>
				</PanelBody>
			</InspectorControls>
			<InnerBlocks
				allowedBlocks={['wpblocks/team-member']}
				template={[
					['wpblocks/team-member',
						// {
						// 	name: 'John Doe',
						// 	bio: 'A brief bio about John Doe.',
						// }
					],
					['wpblocks/team-member',
						// {
						// 	name: 'Jane Smith',
						// 	bio: 'A brief bio about Jane Smith.',
						// }
					]
				]}
				//templateLock="all"//user cannot add or remove blocks, but can edit existing ones
				// orientation="horizontal"
				// renderAppender={ false }
			 />
		</div>
	);
}
