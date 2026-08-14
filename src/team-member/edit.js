import { useEffect, useState, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import socialIcons from './social-icons';
import { useBlockProps, RichText, MediaPlaceholder, BlockControls, MediaReplaceFlow, InspectorControls, store as blockEditorStore } from '@wordpress/block-editor';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import { useSelect } from '@wordpress/data';
import { usePrevious } from '@wordpress/compose';
import { Spinner, withNotices, ToolbarButton, PanelBody, TextareaControl, SelectControl, Icon, Tooltip } from '@wordpress/components';

function Edit( { attributes, setAttributes, noticeOperations, noticeUI, isSelected } ) {

	const { name, bio, id, url, alt, socialLinks } = attributes;

	const [blobUrl, setBlobUrl] = useState();

	const titleRef = useRef();

	const prevURL = usePrevious( url );

	const imageObject = useSelect( ( select ) => {
		if ( ! id ) {
			return null;
		}
		return select( 'core' ).getEntityRecord( 'postType', 'attachment', id );
	}, [ id ] );

	const imageSizes = useSelect( ( select ) => {
		return select( blockEditorStore ).getSettings().imageSizes;
	}, [] );

	const getImageSizeOptions = () => {
		if ( ! imageObject ) {
			return [];
		}
		const options = imageSizes.map( ( size ) => {
			const imageSize = imageObject.media_details.sizes[ size.slug ];

			if ( ! imageSize ) {
				return null;
			}

			return {
				label: size.name,
				value: imageSize.source_url,
			};
		} );

		return options.filter( Boolean );
	}

	const onChangeImageSize = () => ( newURL ) => {
		setAttributes( { url: newURL } );
	}

	const onChangeName = ( newName ) => {
		setAttributes( { name: newName } );
	}

	const onChangeBio = ( newBio ) => {
		setAttributes( { bio: newBio } );
	}

	const onChangeAlt = ( newAlt ) => {
		setAttributes( { alt: newAlt } );
	}

	const onSelectImage = ( media ) => {
		if ( ! media || ! media.url ) {
			setAttributes( { url: undefined, alt: '', id: undefined } );
			return;
		}

		setAttributes( { url: media.url, alt: media.alt, id: media.id } );
	}

	const removeImage = () => {
		setAttributes( { url: undefined, alt: '', id: undefined } );
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
	}, [ id, url ] );

	useEffect( () => {
		if ( isBlobURL( url ) && url !== blobUrl ) {
			setBlobUrl( url );
		} else {
			revokeBlobURL( blobUrl );
			setBlobUrl( undefined );
		}
	}, [ url, blobUrl ] );

	useEffect( () => {
		if( url && !prevURL ) {
			titleRef.current?.focus();
		}
	}, [ url, prevURL ] );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Image Settings', 'team-member' ) }>
					{id && (
							<SelectControl
								__next40pxDefaultSize
								label={ __( 'Image Size', 'team-member' ) }
								value={ url }
								options={ getImageSizeOptions() }
								onChange={ onChangeImageSize() }
							/>
						)
					}
					{ url && !isBlobURL( url ) && (
						<TextareaControl
							label={ __( 'Alt Text', 'team-member' ) }
							value={ alt }
							onChange={ onChangeAlt }
							help={ __( 'Describe the image for screen readers and search engines.', 'team-member' ) }
						/>
					) }
				</PanelBody>
			</InspectorControls>
			{ url && (
			 	<BlockControls group="inline">
					<MediaReplaceFlow
						onError={ onError }
						onSelect={ onSelectImage }
						onSelectURL={ onSelectURL }
						accept="image/*"
						allowedTypes={ [ 'image' ] }
						name={ <span className="components-toolbar__control" aria-label={ __( 'Replace image', 'team-member' ) }><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7z"/><path d="M21.41 11.58l-9-9C12.05 2.21 11.55 2 11 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-.55-.21-1.05-.59-1.42zM13 4.83L17.17 9H13V4.83zM19 19H5V5h5v4h4v10z"/></svg></span> }
					/>
					<ToolbarButton
						icon="no-alt"
						label={ __( 'Remove image', 'team-member' ) }
						onClick={ removeImage }
						disabled={ ! url }
					/>
				</BlockControls>
			) }
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
					ref={ titleRef }
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
				<div>
					<ul>
					{ socialLinks.map( ( link, index ) => (
						<li key={ index } className="team-member-social-link">
							<Icon icon={ socialIcons[ link.icon ] } />
							<a href={ link.url } target="_blank" rel="noopener noreferrer">{ link.url }</a>
						</li>
					) ) }
					{ isSelected && (
						<li className="wp-block-wpblocks-team-member-add-social-link">
							<Tooltip text={ __( 'Add Social Link', 'team-member' ) }>
								<button aria-label={ __( 'Add Social Link', 'team-member' ) }><Icon icon={ <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11 11V3h2v8h8v2h-8v8h-2v-8H3v-2z"/></svg> } /></button>
							</Tooltip>
						</li>
					) }
					</ul>
				</div>
			</div>
		</>
	);
}

export default withNotices( Edit );
