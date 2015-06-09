define(["app"], function(app) {
    app.factory('MusicService', function($resource) {
        return $resource('/music/:id/:simple', {
            id: '@id'
        }, {
            'query': {
                method: 'GET',
                isArray: false,
                cache: false
            },
            update: {
                method: 'PUT'
            },
            getSimple: {
                method: "GET"
            }
        });
    });
});