function toGeo(str) {
	tmp = str.split('.', 3);
	result = parseFloat(parseFloat(tmp[0]) + (((parseFloat(tmp[1]) * 60) + parseFloat(tmp[2])) / 3600));
	return result;
}
