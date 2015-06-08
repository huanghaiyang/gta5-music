define(["app"], function(app) {
    app.factory('UserService', function($resource) {
        return $resource('/user/:menus', {
            menus: '@menus'
        }, {
            'query': {
                method: 'GET',
                isArray: true,
                cache: false
            }
        });
    });
});