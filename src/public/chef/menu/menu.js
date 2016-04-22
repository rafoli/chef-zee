import _ from 'lodash';

export default function($scope, $stateParams, menuFactory) {

    menuFactory.getMenus($scope, $stateParams.chefId);

    const { createMenu } = menuFactory;

    $scope.createMenu = _.partial(createMenu, $scope, $stateParams.chefId);
}