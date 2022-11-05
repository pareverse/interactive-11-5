const Link = {
	baseStyle: (props) => ({
		fontWeight: 'medium',
		color: props.active ? 'brand.default' : 'accent-1',
		transition: '.4s',
		_hover: {
			textDecoration: 'none',
			color: 'brand.default'
		}
	}),
	sizes: {
		sm: {
			fontSize: 'xs'
		},
		md: {
			fontSize: 'sm'
		},
		lg: {
			fontSize: 'lg'
		}
	},
	defaultProps: {
		size: 'md'
	}
}

export default Link
