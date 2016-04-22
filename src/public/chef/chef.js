import _ from 'lodash';

export default function($scope, chefFactory) {

    chefFactory.getPlaces($scope);

    const { createPlace } = chefFactory;

    $scope.createPlace = _.partial(createPlace, $scope);
}