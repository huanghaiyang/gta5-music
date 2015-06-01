define(["app"], function(app) {
    app.factory('MusicService', function($resource) {
        return $resource('/system/music/:id', {
            id: '@id'
        }, {
            'query': {
                method: 'GET',
                isArray: true,
                cache: false
            }
        });
    });
});