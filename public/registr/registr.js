//controller
app.controller('RegistrController', ['$scope', '$rootScope', '$state', '$http', function ($scope, $rootScope, $state, $http) {
    $scope.newUser = {};
    $scope.login = {};
    $scope.invalidForm = false;
    $scope.alert = function () {
        $scope.invalidForm = true;
    };
    $scope.sendLoginReq = function () {
        var data = {
            email: $scope.login.email,
            pwd: $scope.login.pwd
        };
        $http.post('/api/login', data)
            .success(function (res) {
                if (!res.email) $scope.loginFail = res;
                else {
                    $rootScope.user = res;
                    $rootScope.loggedIn = true;
                    $state.go('listing');
                }
            })
            .error(function (err) {
                console.log(err);
            });
    };
    $scope.signupSubmit = function () {
        var data = {
            email: $scope.newUser.email,
            pwd: $scope.newUser.cpwd,
            fullname: $scope.newUser.fullname
        };
        $http.post('api/signup', data)
            .success(function (res) {
                $scope.signupRes = res;
            })
            .err(function (err) {
                console.log(err);
            });
    };
}]);

//directives
app.directive('pwdCheck', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            ctrl.$parsers.unshift(function (pwd) {
                scope.validLen = pwd.length >= 8;
                scope.hasCapitalLetter = /[A-Z]/.test(pwd) ? true : undefined;
                scope.hasLowercaseLetter = /[a-z]/.test(pwd) ? true : undefined;
                scope.hasNumber = /\d/.test(pwd) ? true : undefined;
                if ((scope.validLen && scope.hasCapitalLetter && scope.hasLowercaseLetter && scope.hasNumber) || !pwd.length) {
                    //only return the password when it's valid
                    ctrl.$setValidity('pwdCheck', true);
                    return pwd;
                } else {
                    ctrl.$setValidity('pwdCheck', false);
                    return undefined;
                }
            });
        }
    };
});

app.directive('pwdMatch', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            ctrl.$parsers.unshift(function (cpwd) {
                scope.pwdMatch = cpwd === scope.newUser.pwd;
                if (scope.pwdMatch) {
                    ctrl.$setValidity('pwdMatch', true);
                    return cpwd;
                } else {
                    ctrl.$setValidity('pwdMatch', false);
                    return undefined;
                }
            });
        }
    };
});