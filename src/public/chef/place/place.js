import _ from 'lodash';

export default function($scope, placeFactory) {

    placeFactory.getPlaces($scope);

    const { createPlace } = placeFactory;

    $scope.createPlace = _.partial(createPlace, $scope);
}