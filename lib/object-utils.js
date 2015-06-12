var ObjectUtils = {};

ObjectUtils.parseInt = function(obj) {
	var result = null;
	if (Object.prototype.toString.call(obj) === '[object Array]') {
		result = [];
		for (var i = 0; i < obj.length; i++) {
			result[i] = obj[i] === null || obj[i] === "" || typeof obj[i] === "undefined" ? undefined : parseInt(obj[i]);
		}
	}
	return result;
};

module.exports = ObjectUtils;