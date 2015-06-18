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

ObjectUtils.randomSort = function(a, b) {
	return Math.random() > .5 ? -1 : 1; //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}

module.exports = ObjectUtils;