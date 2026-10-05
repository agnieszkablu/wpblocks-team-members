import { createBlock, registerBlockType } from '@wordpress/blocks';
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: Edit,
	save: Save,
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/gallery' ],
				transform: ( { images, columns } ) => {
					const innerBlocks = images.map( ( { url, id, alt } ) =>
						createBlock( 'wpblocks/team-member', {
							url,
							id,
							alt
						} )
					);
					return createBlock("wpblocks/team-members", {
						columns: columns || 2,
					}, innerBlocks);
				},
			},
			{
				type: 'block',
				blocks: [ 'core/image' ],
				isMultiBlock: true,
				transform: ( attr ) => {
					const innerBlocks = attr.map( ( { url, id, alt } ) =>
						createBlock( 'wpblocks/team-member', {
							url,
							id,
							alt
						} )
					);
					return createBlock("wpblocks/team-members", {
						columns: attr.length > 3 ? 3 : attr.length,
					}, innerBlocks);
				},
			}
		]
	},
} );
