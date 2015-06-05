define(["app"], function(app) {
    app.factory(
        'Paginator',
        function() {
            return function(config) {
                if (!config)
                    config = {};
                if (!config.resource) {
                    console.error('error : resource must not empty but now is ' + config.resource);
                    return;
                }
                if (!config.params)
                    config.params = {
                        page: 1,
                        size: 10
                    };

                var paginator = {
                    _data: null,
                    _resource: config.resource,
                    _params: config.params,
                    _load: function() {
                        var _self = this;
                        _self._resource.query(_self._params, function(data) {
                            _self._data = data;
                            _self.list = data.content; //数据内容
                            _self.totalPages = data.totalPages; //总页数
                            _self.last = data.last; //boolean 是否最后一页
                            _self.size = data.size; //每页的个数
                            _self.number = data.number; //页数 ，从0开始
                            _self.sort = data.sort; // 排序信息
                            _self.first = data.first; //boolean 是否第一个
                            _self.totalElements = data.totalElements; //
                            _self.numberOfElements = data.numberOfElements; //

                            // 为分页数据完成添加成功回调
                            if (config.successCallback) {
                                config.successCallback(data);
                            }
                        }, function(error) {
                            console.error("get data error :" + error);
                        });
                    },
                    goto: function(page) {
                        this._params.page = page;
                        this._load();
                    },
                    next: function() {
                        this.goto(this.getNumber() > this.getTotalPages() ? this.getTotalPages() - 1 : this.getNumber() + 1);
                    },
                    pre: function() {
                        this.goto(this.getNumber() > 0 ? this.getNumber() - 1 : 1);
                    },
                    firstPage: function() {
                        this.goto(1);
                    },
                    lastPage: function() {
                        this.goto(this.getTotalPages() - 1);
                    },
                    getList: function() {
                        return this.list;
                    },
                    getNumber: function() {
                        return this.number;
                    },
                    getTotalPages: function() {
                        return this.totalPages;
                    },
                    getSize: function() {
                        return this.size;
                    },
                    isLast: function() {
                        return this.last;
                    },
                    isFirst: function() {
                        return this.first;
                    },
                    fresh: function() {
                        this._load();
                    },
                    addParams: function(data) {
                        this._params = Fun.merge(data, this._params);
                    },
                    setParams: function(data) {
                        this._params = Fun.merge(data, config.params);
                    }
                };

                paginator._load();
                return paginator;
            }
        }
    );
});