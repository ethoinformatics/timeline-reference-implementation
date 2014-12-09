var app = require('ethoinformatics-app');

app.setting('couch-base-url', 'http://ec2-54-84-90-63.compute-1.amazonaws.com:5984/');
app.setting('couch-username', 'ro');

var activityService = {
	getBeginTime: function(d){ return d.beginTime; },
	getEndTime: function(d){ return d.endTime; },
	start: function(d){ d.beginTime = new Date(); },
	stop: function(d){ d.endTime = new Date(); },
	locationUpdate: function(d, l){ 
		d.locations = d.locations || [];
		d.locations.push(l);
	},
};

var eventService = {
	getTimestamp: function(d) { return d.timestamp; },
	create: function(d){ d.timestamp = new Date(); },
	locationUpdate: function(d, l){ d.location = l; },
};

var observerActivity = app.createDomain({name:'observer-activity', label: 'Observer Activity'});
observerActivity.register('form-fields', require('./forms/observer-activity.json'));
observerActivity.register('activity', activityService);
observerActivity.register('short-description', function(d){
	return 'Observer Activity - ' + d.title;
});
observerActivity.register('child-domains', ['follow', 'sighting']);


var environment = app.createDomain({name: 'environment', label: 'Environment'});
environment.register('form-fields', require('./forms/environment.json'));
environment.register('activity', activityService);
environment.register('short-description', 'title');

var follow = app.createDomain({name: 'follow', label: 'Follow'});
follow.register('form-fields', require('./forms/follow.json'));
follow.register('activity', activityService);
follow.register('short-description', 'title');

var sighting = app.createDomain({name: 'sighting', label: 'Sighting'});
sighting.register('form-fields', require('./forms/sighting.json'));
sighting.register('event', eventService);
sighting.register('short-description', 'title');

module.exports = app.getRegistry();
