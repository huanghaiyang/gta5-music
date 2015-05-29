define(["usermenu"], function(app) {
    app.factory('userService', function($resource) {
        return $resource('/system/user/:menus', {
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