<?php
// This file is generated. Do not modify it manually.
return array(
	'team-member' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'wpblocks/team-member',
		'version' => '0.1.0',
		'title' => 'Team member',
		'parent' => array(
			'wpblocks/team-members'
		),
		'category' => 'media',
		'icon' => 'admin-users',
		'description' => 'A block to display team member.',
		'keywords' => array(
			'team',
			'member',
			'staff',
			'employee'
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'reusable' => false
		),
		'attributes' => array(
			'name' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => 'h4'
			),
			'bio' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => 'p'
			),
			'id' => array(
				'type' => 'number'
			),
			'alt' => array(
				'type' => 'string',
				'source' => 'attribute',
				'selector' => 'img',
				'attribute' => 'alt',
				'default' => ''
			),
			'url' => array(
				'type' => 'string',
				'source' => 'attribute',
				'selector' => 'img',
				'attribute' => 'src'
			),
			'socialLinks' => array(
				'type' => 'array',
				'default' => array(
					array(
						'url' => 'https://facebook.com',
						'icon' => 'facebook'
					),
					array(
						'url' => 'https://twitter.com',
						'icon' => 'twitter'
					),
					array(
						'url' => 'https://linkedin.com',
						'icon' => 'linkedin'
					)
				)
			)
		),
		'textdomain' => 'team-member',
		'editorScript' => 'file:./index.js'
	),
	'team-members' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'wpblocks/team-members',
		'version' => '0.1.0',
		'title' => 'Team members',
		'category' => 'media',
		'icon' => 'groups',
		'description' => 'A block to display team members.',
		'keywords' => array(
			'team',
			'members',
			'staff',
			'employees'
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide'
			)
		),
		'textdomain' => 'team-members',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js',
		'attributes' => array(
			'columns' => array(
				'type' => 'number',
				'default' => 2
			)
		)
	)
);
