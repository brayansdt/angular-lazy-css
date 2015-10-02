'use strict';

angular.module('lazyCss.module', [])

.directive('cssGroups', ['$rootScope', '$compile', 
	function($rootScope, $compile) {
		return {
			templateUrl: 'components/angular-css-lazy/cssGroupsTemplate.html',
			restrict: 'EA',
			link: ['scope', 'elem', function(scope, elem){
				//FIXME put this code in a template and use templateUrl
				/**
				var html = '<link rel="stylesheet"'+
						      'ng-repeat="(routeCtrl, cssUrl) in routeStyles"'+
						      'ng-href="{{cssUrl}}" />';

		      	//compiling template
		      	$compile(angular.element(html))(scope);
				*/
				scope.styles = {};

				$rootScope.$on('$routeChangeStart', function(e, next, current){
					//earases the current css group
					if(current && current.$$route && current.$$route.cssGroup){
						if(!angular.isArray(current.$$route.cssGroup)){
                            current.$$route.cssGroup = [current.$$route.cssGroup];
                        }
                        angular.forEach(current.$$route.cssGroup, function(sheet){
                            delete scope.styles[sheet];
                        });
					}

					//adds new css group to styles
					if(next && next.$$route && next.$$route.cssGroup){
                        if(!angular.isArray(next.$$route.cssGroup)){
                            next.$$route.cssGroup = [next.$$route.cssGroup];
                        }
                        angular.forEach(next.$$route.cssGroup, function(sheet){
                            scope.styles[sheet] = sheet;
                        });
                    }
				});
			}]
		}
	}
]);

var cssGroupModule = angular.module('cssGroupModule', []);
  cssGroupModule.directive('cssGroups', ['$rootScope','$compile',
    function($rootScope, $compile){
        return {
            templateUrl: 'cssGroupTemplate.html',
            restrict: 'EA',
            link: function(scope, elem){
                scope.routeStyles = {};
                $rootScope.$on('$routeChangeStart', function (e, next, current) {

                    if(current && current.$$route && current.$$route.css){
                        if(!angular.isArray(current.$$route.css)){
                            current.$$route.css = [current.$$route.css];
                        }
                        angular.forEach(current.$$route.css, function(sheet){
                            delete scope.routeStyles[sheet];
                        });
                    }
                    if(next && next.$$route && next.$$route.css){
                        if(!angular.isArray(next.$$route.css)){
                            next.$$route.css = [next.$$route.css];
                        }
                        angular.forEach(next.$$route.css, function(sheet){
                            scope.routeStyles[sheet] = sheet;
                        });
                    }

                });
            }
        };
    }
  ]);