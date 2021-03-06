$(document).ready(init);

function init() {
	var map;
	var mapOption = { 
		div: '#map', 
		zoom: 12,
		lat: 23.37, 
		lng: 116.71,
		streetViewControl: false,
		overviewMapControl: false,
		panControl: false,
		scaleControl: true,
		scaleControlOptions: {
			position: google.maps.ControlPosition.RIGHT_BOTTOM
		},
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			position: google.maps.ControlPosition.TOP_LEFT
		},
		zoomControl: true,
		zoomControlOptions: {
			position: google.maps.ControlPosition.TOP_RIGHT
		},
	};
	map = new GMaps(mapOption);

	addMarker(map);
}

function addMarker(map) {
	var marker;
	var infowindow = new google.maps.InfoWindow();

	{% for point in points %}
	marker = GMaps.prototype.createMarker({
		lat: {{ point.latitude }},
		lng: {{ point.longitude }},
		title: "{{ point }}"
	});
	marker.id = {{ point.id }}
	map.addMarker(marker);
	addListerner(marker, infowindow);

	{% endfor %}
}

function addListerner(marker, infowindow) {
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title);
		infowindow.open(marker.get('map'), marker);
		display_point(marker.id)
	});
}

function display_point(id) {
	Dajaxice.gmap.display_point(Dajax.process,{'point_id':id})
}
