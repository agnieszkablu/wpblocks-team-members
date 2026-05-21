import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaPlaceholder } from '@wordpress/block-editor';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import { Spinner, withNotices } from '@wordpress/components';

function Edit( { attributes, setAttributes, noticeOperations, noticeUI } ) {

	const { name, bio, id, url, alt } = attributes;

	const [blobUrl, setBlobUrl] = useState();

	const onChangeName = ( newName ) => {
		setAttributes( { name: newName } );
	}

	const onChangeBio = ( newBio ) => {
		setAttributes( { bio: newBio } );
	}

	const onSelectImage = ( media ) => {
		if ( ! media || ! media.url ) {
			setAttributes( { url: undefined, alt: '', id: undefined } );
			return;
		}

		setAttributes( { url: media.url, alt: media.alt, id: media.id } );
	}

	const onSelectURL = ( newURL ) => {
		setAttributes( { url: newURL, alt: '', id: undefined } );
	}

	const onError = ( message ) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( message );
	}

	useEffect( () => {
		if( !id && isBlobURL( url ) ) {
			setAttributes( {
				url: undefined,
				alt: ''
			} );
		}
	}, [] );

	useEffect( () => {
		if ( isBlobURL( url ) && url !== blobUrl ) {
			setBlobUrl( url );
		} else {
			revokeBlobURL( blobUrl );
			setBlobUrl( undefined );
		}
	}, [ url ] );

	return (
		<div { ...useBlockProps() }>
			{url && <div className={`wp-block-blocks-team-member-img ${ isBlobURL( url ) ? 'is-loading' : '' }`}>
				{isBlobURL( url ) && <Spinner />}
				{url && !isBlobURL( url ) && (
					<img src={ url } alt={ alt } id={ id } style={ { maxWidth: '100%' } } />
				)}
			</div> }
			<MediaPlaceholder
				icon="format-image"
				onSelect={ onSelectImage }
				onSelectURL={ onSelectURL }
				allowedTypes={ [ 'image' ] }
				accept='image/*'
				onError={ onError }
				disableMediaButtons={ url }
				notices={ noticeUI }
			/>
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

export default withNotices( Edit );
