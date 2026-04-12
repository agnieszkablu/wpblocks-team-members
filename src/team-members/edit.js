import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit() {
	return (
		<div { ...useBlockProps() }>
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
