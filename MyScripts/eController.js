
app.controller('AddController', function ($scope, personInfoService, $location) {
    //The Gender Object

    $scope.date = '2000-03-12'

    $scope.selectedGender = "Male";
    $scope.gender = ["Male", "Female"];

    //The Title object
    $scope.selectedtitle = "Mr.";
    $scope.title = ["Mr.", "Mrs.", "Ms.", "Master"];

    $scope.IsSameAddress = false;

    //Function to Reset Scope variables
    function initialize() {
        $scope.PersonId = 0;
        $scope.FirstName = "";
        $scope.MiddleName = "";
        $scope.LastName = "";
        $scope.BirthDate = "";
        $scope.Age = 0;
        $scope.CurrentAddress = "";
        $scope.PermanentAddress = "";
        $scope.Occupation = "";
        $scope.Email = "";
        $scope.MobileNo = "";
        $scope.DisablesPermanentAddress = false;
    }

    //The function to specify the Current and Permanent Address as Same
    $scope.SameAddress = function () {
        if ($scope.IsSameAddress) {
            $scope.PermanentAddress = $scope.CurrentAddress;
            $scope.DisablesPermanentAddress = true;
        }
        else {
            $scope.PermanentAddress = "";
            $scope.DisablesPermanentAddress = false;
        }
    };

    //Function to Calculate Age
    function calculateAge(dateString) {
        var currentday = new Date();
        var bDate = new Date(dateString);
        var age = currentday.getFullYear() - bDate.getFullYear();
        var mt = currentday.getMonth() - bDate.getMonth();
        if (mt < 0 || (mt === 0 && currentday.getDate() < bDate.getDate())) {
            age--;
        }
        return age;
    }

    $scope.getAge = function () {
        $scope.Age = calculateAge($scope.BirthDate);
    }

    //Function to Submit the form
    $scope.submitForm = function () {
        var Person = {};
        Person.Title = $scope.selectedtitle;
        Person.FirstName = $scope.FirstName;
        Person.MiddleName=$scope.MiddleName;
        Person.LastName = $scope.LastName;
        Person.Gender = $scope.selectedGender;
        Person.BirthDate = new Date(Date.parse($scope.BirthDate, "dd-mm-yy"));
        Person.Age = calculateAge($scope.BirthDate);
        Person.CurrentAddress=$scope.CurrentAddress;
        Person.PermanentAddress=$scope.PermanentAddress;
        Person.Occupation=$scope.Occupation;
        Person.Email=$scope.Email;
        Person.MobileNo=$scope.MobileNo;

        var promisePost = personInfoService.postInfo(Person);
        promisePost.then(function (d) {
            $scope.PersonId = d.data.PersonId;
        }, function (err) {
            alert("Some Error Occured ");
        });
    };
    //Function to Cancel Form
    $scope.cancelForm = function () {
        $scope.selectedGender = "Male";
        $location.path('List');
        initialize();
    };
});

app.directive('dateInputTime',

     function (dateFilter) {

         return {

             require: 'ngModel',

             template: '<input type="date"></input>',

             replace: true,



             link: function (scope, elm, attrs, ngModelCtrlVal) {
                 var dt = new Date();

                 ngModelCtrlVal.$formatters.unshift(function (val) {

                     return dateFilter(dt, 'dd/MM/yyyy');

                 });


                 ngModelCtrlVal.$parsers.unshift(function (val) {

                     return new Date(val);

                 });

             },

         };

     });
