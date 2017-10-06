var app = angular.module("c80App", ["ngRoute"]);

app.config(function ($routeProvider) {
				$routeProvider
								.when("/", {
								templateUrl: "views/c80List.html",
								controller: "HomeController"
				})
								.when("/addMember", {
												templateUrl: "views/addMember.html",
												controller: "C80ListController"
								})
								.when("/addMember/edit/:id/", {
												templateUrl: "views/addMember.html",
												controller: "C80ListController"
								})
								.otherwise({redirectTo: "/"})
			
})

app.service("C80Service", function () {
				var c80Service = [];

				c80Service.c80s = [
								{
												id: 1,
												completed: true,
												name: "Do Xuan Loc",
												account: "LocDX4",
												birthday: "8/7/1995"
								}, {
												id: 2,
												completed: true,
												name: "Quach Hai Dang",
												account: "DangQH",
												birthday: "5/4/1990"
								}, {
												id: 3,
												completed: true,
												name: "Nguyen Pham Anh Khoa",
												account: "KhoaNPA",
												birthday: "24/6/1990"
								}, {
												id: 4,
												completed: true,
												name: "Thach Thanh Binh",
												account: "BinhTT",
												birthday: "10/4/1994"
								}, {
												id: 5,
												completed: true,
												name: "Ho Duc Lam",
												account: "LamHD",
												birthday: "7/2/1995"
								}, {
												id: 6,
												completed: true,
												name: "Mai Anh Kiet",
												account: "KietMA",
												birthday: "4/12/1995"
								}, {
												id: 7,
												completed: true,
												name: "Nguyen Doan Phi Long",
												account: "LongNDP",
												birthday: "25/9/1995"
								}, {
												id: 8,
												completed: true,
												name: "Nguyen Thanh Co",
												account: "CoNT",
												birthday: "14/6/1995"
								}, {
												id: 9,
												completed: true,
												name: "Le Thanh Cong",
												account: "Cong",
												birthday: "1/11/1995"
								}, {
												id: 10,
												completed: true,
												name: "Nguyen Thanh Tien",
												account: "TienNT",
												birthday: "14/5/1995"
								}
				];

				c80Service.findById = function (id) {
								for (var item in c80Service.c80s) {
												if (c80Service.c80s[item].id === id) {
																console.log(c80Service.c80s[item]);
																return c80Service.c80s[item];
												}
								}
				};

				c80Service.getNewId = function () {
								if (c80Service.newId) {
												c80Service.newId++;
												return c80Service.newId;
								} else {
												var maxId = _.max(c80Service.c80s, function (entry) {
																return entry.id;
												})
												c80Service.newId = maxId.id + 1;
												return c80Service.newId;
								}
				};

				c80Service.removeMember = function(entry){
					var index = c80Service.c80s.indexOf(entry);
					c80Service.c80s.splice(index,1);
				}

				c80Service.save = function (entry) {
								var updateMember = c80Service.findById(entry.id);
								if (updateMember) {
												updateMember.completed = entry.completed;
												updateMember.name = entry.name;
												updateMember.account = entry.account;
												updateMember.birthday = entry.birthday;
								} else {
												entry.id = c80Service.getNewId();
												c80Service
																.c80s
																.push(entry);
								}

				};

				return c80Service;
});

app.controller("HomeController", [
				"$scope",
				"C80Service",
				function ($scope, C80Service) {
								$scope.c80s = C80Service.c80s;

								$scope.removeMember = function(entry){
									C80Service.removeMember(entry);
								}

				}
]);

app.controller("C80ListController", [
				"$scope",
				"$routeParams",
				"$location",
				"C80Service",
				function ($scope, $routeParams, $location, C80Service) {

								if (!$routeParams.id) {
												$scope.c80 = {
																id: 0,
																completed: false,
																name: "",
																account: "",
																birthday: ""
												};
								} else {
												$scope.c80 = _.clone(C80Service.findById(parseInt($routeParams.id)));
								}

								$scope.save = function () {
												C80Service.save($scope.c80);
												$location.path("/");
								}

								console.log($scope.c80s);
				}
]);