/**
 * Module variables
 *
 * @format
 */

const sections = [
	{
		name: 'reader',
		paths: [ '/', '/read' ],
		module: 'reader',
		secondary: true,
		group: 'reader',
	},
	{
		name: 'reader',
		paths: [ '/read/feeds/[^\\/]+/posts/[^\\/]+', '/read/blogs/[^\\/]+/posts/[^\\/]+' ],
		module: 'reader/full-post',
		secondary: false,
		group: 'reader',
		css: 'reader-full-post',
	},
	{
		name: 'reader',
		paths: [ '/discover' ],
		module: 'reader/discover',
		secondary: true,
		group: 'reader',
	},
	{
		name: 'reader',
		paths: [ '/following' ],
		module: 'reader/following',
		secondary: true,
		group: 'reader',
	},
	{
		name: 'reader',
		paths: [ '/tags', '/tag' ],
		module: 'reader/tag-stream',
		secondary: true,
		group: 'reader',
	},
	{
		name: 'reader',
		paths: [ '/activities' ],
		module: 'reader/liked-stream',
		secondary: true,
		group: 'reader',
	},
	{
		name: 'reader',
		paths: [ '/read/search', '/recommendations' ],
		module: 'reader/search',
		secondary: true,
		group: 'reader',
	},
	{
		name: 'reader',
		paths: [ '/read/list' ],
		module: 'reader/list',
		secondary: true,
		group: 'reader',
	},
	{
		name: 'reader',
		paths: [ '/read/conversations' ],
		module: 'reader/conversations',
		secondary: true,
		group: 'reader',
	},
	{
		name: 'login',
		paths: [ '/log-in' ],
		module: 'login',
		enableLoggedOut: true,
		secondary: false,
		isomorphic: true,
		css: 'login',
	},
];

module.exports = sections;
