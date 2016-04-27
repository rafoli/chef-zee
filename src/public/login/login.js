import _ from 'lodash';

export default function($location, $rootScope, $scope, loginFactory) {

    const { login } = loginFactory;

    $scope.login = _.partial(login, $location, $rootScope, $scope);
}