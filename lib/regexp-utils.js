var RegExpUtils = {};

RegExpUtils.parse = function(str) {
	return str.replace(/(\(|\)|\\|\/|\{|\}|\^|\$|\*|\|\+|\?|\[|\]|\||\.)/, "\\$1" );
};

module.exports = RegExpUtils;