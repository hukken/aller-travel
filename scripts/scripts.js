var changeLength = function(l, a, s) {
	if (s > l.getAttribute(a)) {
		// if s i greater
		for (var i = l.getAttribute(a); i <= s; i++) {
			l.setAttribute(a, i);
		}
	}

	if (s < l.getAttribute(a)) {
		for (var i = l.getAttribute(a); i > s; i--) {
			l.setAttribute(a, i);
		}
	}
};

var generateLine = function(length, p, c, ending = false) {
	var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	var svgNS = svg.namespaceURI;
	svg.classList.add('chart');
	var line = document.createElementNS(svgNS, 'line');
	var x1 = 4;
	var x2;
	if ('rain' === c) {
		x2 = (100 / 30) * Number(length) + '%';
	} else if ('sun' === c) {
		x2 = (100 / 24) * Number(length) + '%';
	} else if ('temp' === c) {
		x2 = (100 / 35) * Number(length) + '%';
	} else if ('car' === c || 'walk' === c) {
		// Travel distance to POI – max is 60 mins
		x2 = (100 / 60) * Number(length) + '%';
	}

	line.setAttribute('x1', x1);
	line.setAttribute('x2', x2);
	line.setAttribute('y1', 10);
	line.setAttribute('y2', 10);
	if (ending) {
		//Create group
		var g = document.createElementNS(svgNS, 'g');
		svg.setAttribute('width', x1);

		//Create start bar
		var start = document.createElementNS(svgNS, 'line');
		start.setAttribute('x1', x1);
		start.setAttribute('x2', x1);
		start.setAttribute('y1', 3);
		start.setAttribute('y2', 17);

		//Create end bar
		var end = document.createElementNS(svgNS, 'line');
		end.setAttribute('x1', x2);
		end.setAttribute('x2', x2);
		end.setAttribute('y1', 3);
		end.setAttribute('y2', 17);

		//Append elements to group and add attributes
		g.appendChild(start);
		g.appendChild(line);
		g.appendChild(end);
		g.classList.add('line');

		//Append group to SVG
		svg.appendChild(g);
		var span = p.getElementsByTagName('span');
		span[0].style.left = x2;
		p.insertBefore(svg, span[0]);
	} else {
		line.classList.add('weather-bar', 'bar-' + c);
		var line2 = document.createElementNS(svgNS, 'line');
		line2.setAttribute('x1', 4);
		line2.setAttribute('x2', '100%');
		line2.setAttribute('y1', 10);
		line2.setAttribute('y2', 10);
		line2.classList.add('secondary-bar');
		svg.appendChild(line2);
		svg.appendChild(line);
		p.appendChild(svg);
	}
};

var weather_group = document.querySelectorAll('.weather-group');
for (var i = 0; i < weather_group.length; i++) {
	var month_data = weather_group[i].querySelectorAll('.weather-data');
	for (var j = 0; j < month_data.length; j++) {
		// line = month_data[j].getElementsByTagName('line')[0];
		// changeLength(line, 'x2', 45);
		var data_parent = month_data[j];
		var data_type = month_data[j].classList[1];
		var data_value = data_parent.dataset.value;
		//console.log(data_type, data_value);
		generateLine(data_value, data_parent, data_type);
	}
}

var poi = document.querySelectorAll('.poi-data');
for (var j = 0; j < poi.length; j++) {
	// line = poi[j].getElementsByTagName('line')[0];
	// changeLength(line, 'x2', 45);
	var data_type = poi[j].dataset.type;
	var data_value = poi[j].dataset.value;
	console.log(data_type, data_value);
	generateLine(data_value, poi[j], data_type, true);
}
