export default {
	onwarn: (warning, warn) => {
		// omit circular dependency warnings emitted from
		// "d3-*" packages and "@carbon/charts"
		if (warning.code === 'CIRCULAR_DEPENDENCY') {
			if (warning.ids.some((id) => /node_modules\/(d3-|@carbon\/charts)/.test(id))) {
				return
			}
		}

		// preserve all other warnings
		warn(warning)
	}
}