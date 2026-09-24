import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';
import socialIcons from './social-icons';

export default function Save( { attributes } ) {
	const { name, bio, url, alt, id, socialLinks } = attributes;

	return (
		<div {...useBlockProps.save()}>
			{ url && (
				<a href={ url }>
					<img src={ url } alt={ alt } id={ id } className={ id ? `wp-image-${ id }` : null }/>
				</a>
			) }
			{name && (<RichText.Content tagName="h4" value={ name } /> ) }
			{ bio && ( <RichText.Content tagName="p" value={ bio } /> ) }
			{ socialLinks.length > 0 && (
				<div className="wp-block-wpblocks-team-members-social-links">
					<ul>
						{ socialLinks.map( ( link, index ) => (
							<li key={ index } className="team-member-social-link">
								<a href={ link.link } target="_blank" rel="noopener noreferrer">
									<Icon icon={ socialIcons[ link.icon ] } />
								</a>
							</li>
						) ) }
					</ul>
				</div>
			) }
		</div>
	);
}
