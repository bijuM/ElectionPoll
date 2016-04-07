/// <reference path="angular.js" />
/// <reference path="rhaboo.min.js" />
var electionApp = angular.module('ElectionApp', ['ngRoute', 'ngStorage'])
                         .config(function ($routeProvider) {
                             $routeProvider.when('/questioner', {
                                 templateUrl: 'Questioner.html',
                                 controller: 'ElectionController'
                             })
                             .when('/Submitted', {
                                 templateUrl: 'Thankyou.html',
                                 controller: 'ElectionController'
                             })
                             .otherwise({ redirectTo: '/questioner' })
                         })
                        .factory('QuestionerFactory', function () {
                            var questions =
                            [
                               { "QuestionId": 1, "date": "07/04/2016", "Question": "Will PM Modi continue to be BJP's biggest weapon in these elections too?", "options": [{ "optionIndex": 1, "optionVal": 'Yes' }, { "optionIndex": 2, "optionVal": 'No' }, { "optionIndex": 3, "optionVal": 'Cant Say' }], "selectedValue": "" },
                               { "QuestionId": 2, "date": "08/04/2016", "Question": "What is the last letter in the english albhabet", "options": [{ "optionIndex": 1, "optionVal": 'A' }, { "optionIndex": 2, "optionVal": 'B' }, { "optionIndex": 3, "optionVal": 'C' }], "selectedValue": "" },
                            ];
                            return {
                                filteredByDate: $.grep(questions, function (i, n) { return i.date == "07/04/2016" })
                            }

                        })
                        .controller('ElectionController', function ($scope,$location, QuestionerFactory) {
                            //$scope.test = function getD() {
                            //  return $.get('', function (r) { return "10.11.23.45" });
                            //}(function () { }());


                            var store = Rhaboo.persistent('Questioners');
                            if (store.Questioners === undefined)
                                store.write('Questioners', []);
                            $scope.Questions = QuestionerFactory.filteredByDate;
                            $scope.optionA = 0;
                            $scope.optionAWidth = $scope.optionA + "%";
                            $scope.optionB = 0;
                            $scope.optionBWidth = $scope.optionB + "%";
                            $scope.optionC = 0;
                            $scope.optionCWidth = $scope.optionC + "%";
                            var counts = {
                                first: 0,
                                second: 0,
                                third: 0,
                                totalCount: 0
                            };
                            angular.forEach(store.Questioners, function (index, element) {
                                switch (index.SelectedAnswer) {
                                    case 1:
                                        counts.first += 1;
                                        counts.totalCount++;
                                        break;
                                    case 2:
                                        counts.second += 1;
                                        counts.totalCount++;
                                        break;
                                    case 3:
                                        counts.third += 1;
                                        counts.totalCount++;
                                        break;
                                }
                            });
                            $scope.optionA = (counts.first === 0) ? 0 : Math.round((counts.first * 100.0) / counts.totalCount);
                            $scope.optionAWidth = $scope.optionA + "%";
                            $scope.optionB = (counts.second === 0) ? 0 : Math.round((counts.second * 100.0) / counts.totalCount);
                            $scope.optionBWidth = $scope.optionB + "%";
                            $scope.optionC = (counts.third === 0) ? 0 : Math.round((counts.third * 100.0) / counts.totalCount);
                            $scope.optionCWidth = $scope.optionC + "%";

                            $scope.castVote = function (value) {
                                var userEntry = {
                                    ip: "12.34.56.78",
                                    QuestionId: 1,
                                    SelectedAnswer: $scope.Questions[0].selectedValue
                                };
                                store.Questioners.push(userEntry);
                                var counts = {
                                    first: 0,
                                    second: 0,
                                    third: 0,
                                    totalCount: 0
                                };
                                angular.forEach(store.Questioners, function (index, element) {
                                    switch (index.SelectedAnswer) {
                                        case 1:
                                            counts.first += 1;
                                            counts.totalCount++;
                                            break;
                                        case 2:
                                            counts.second += 1;
                                            counts.totalCount++;
                                            break;
                                        case 3:
                                            counts.third += 1;
                                            counts.totalCount++;
                                            break;
                                    }
                                });

                                $scope.optionA = (counts.first === 0) ? 0 : Math.round((counts.first * 100.0) / counts.totalCount);
                                $scope.optionAWidth = $scope.optionA + "%";
                                $scope.optionB = (counts.second === 0) ? 0 : Math.round((counts.second * 100.0) / counts.totalCount);
                                $scope.optionBWidth = $scope.optionB + "%";
                                $scope.optionC = (counts.third === 0) ? 0 : Math.round((counts.third * 100.0) / counts.totalCount);
                                $scope.optionCWidth = $scope.optionC + "%";

                                setTimeout(function () { $location.path("/Submitted"); }, 0);
                            }

                        });






