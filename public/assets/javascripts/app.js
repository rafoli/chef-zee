/*globals angular, componentHandler */

var istto = "istto";

angular.module(istto, ["ngRoute",
  "istto.controllers",
  "istto.directives",
  "istto.services",
  "istto.filters",
  "LocalStorageModule",
  "ngLodash",
  "angular.filter"]);

angular.module(istto).config(function ($routeProvider, $locationProvider, localStorageServiceProvider) {
  var now = "?timestamp=" + Date.now();

  $routeProvider
    .when("/", {
      templateUrl: "templates/login/index.html" + now,
      controller: "LoginController"
    })

    .when("/logout", {
      templateUrl: "templates/login/index.html" + now,
      controller: "LogoutController"
    })

    .when("/places", {
      templateUrl: "templates/places/index.html" + now,
      controller: "PlacesController"
    })

    .when("/place/:placeId", {
      templateUrl: "templates/place/index.html" + now,
      controller: "PlaceController"
    });

  localStorageServiceProvider.setPrefix(istto);

}).run(function ($rootScope, $timeout, localStorageService, $location, AuthService, $window) {
  if (!AuthService.validateToken(localStorageService.get("authTokenWhen"), $location.url())) {
    localStorageService.clearAll();
    if ($window.location.hash !== '') $window.location.href = '/?timestamp=' + Date.now();
  }
});

var isttoApp = isttoApp || {};

isttoApp.Controllers = angular.module("istto.controllers", []);
isttoApp.Directives = angular.module("istto.directives", []);
isttoApp.Services = angular.module("istto.services", []);
isttoApp.Filters = angular.module("istto.filters", []);


angular.module(istto).directive('contenteditable', function() {
    var obj = {
        restrict:'A',
        replace:false,
        scope:false,
        require:'?ngModel',
        link:function(scope,element,attrs,ngModel){
            var oldVal;
            //Let's have spellcheck disabled by default
            !('spellcheck' in attrs) && attrs.$set('spellcheck','false'); 
            if(!ngModel){
                return;
            }
            /*
             * Let's create a function fired each time the model is
             * changed
             */
            ngModel.$viewChangeListeners.push(function(){
                console.log('Triggers each time the view is changed ');
            })
            
            // The below defines the function that willr render the view on model change
            ngModel.$render = function(){
                $(element).html(ngModel.$viewValue);                
            }
            
            //Event handler definition
            var downKeyHandler = function(e){
                if(e.keyCode === 13){ //Enter Key
                    e.preventDefault();
                    read();
                    $(element).blur();
                }
                
                if(e.keyCode === 27){ //Esc key
                    e.preventDefault();
                    if(oldVal && oldVal.length > 0){
                        ngModel.$setViewValue(oldVal);
                        ngModel.$render();
                        $(element).blur();
                    }
                    else{
                        ngModel.$setViewValue('');
                        
                        $(element).blur();
                    }
                }
                
                if(e.keyCode === 8){ //Del Key
                    if(ngModel.$viewValue.length==0){
                        e.preventDefault();
                    }
                }
            };
            
            var upKeyHandler = function(e){
                read(); //function is defined below and just extracts the innerhtml
            };
            
            var pasteHandler = function(e){
                scope.$apply(function(){
                    console.log('pasted');
                    e.preventDefault();
                var text = e.clipboardData.getData("text/plain");
                document.execCommand("insertHTML", false, text); 
                })             
            }
            
            var blurHandler = function(){
                $(element).unbind('keyup',upKeyHandler);
                $(element).unbind('keydown',downKeyHandler);
                $(element).get(0).removeEventListener('paste',pasteHandler);
            };
            
            //Set the events up
            
            $(element).focus(function(e){
                scope.$apply(function(){
                    if(typeof $(element).html() === 'string' && $(element).html().length>0 && ('modelnotempty' in attrs)){
                        oldVal = $(element).html();
                    }
                    $(element).keydown(downKeyHandler);
                    $(element).keyup(upKeyHandler);
                    $(element).get(0).addEventListener('paste',pasteHandler);
                })
            })
            
            $(element).blur(function(e){
                scope.$apply(blurHandler);
            })
            
            //INTITIALIZATION
            ngModel.$setPristine();
            function read(){
                scope.$apply(function(){
                    var html = $(element).html(); 
                    if (html === '<br>') {
                        html = '';
                    }
                    if (html.length==0 && oldVal && oldVal.length!==0) {
                        if (typeof oldVal !== 'undefined') {
                            html = oldVal;
                        }
                    } 
                    ngModel.$setViewValue(html);
                })
            }
        }
    }
    return obj;
});
