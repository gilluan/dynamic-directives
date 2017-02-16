'use strict';

angular.module('app', []).component('cpForm', {
  template: '<div ng-form="$ctrl.formName" ng-class="$ctrl.type" novalidate>\n      <h3>Formulario Valido: {{$ctrl.formName.$valid}}</h3>\n      <div class="tab-content" ng-transclude></div>\n      <button value="ss" ng-if="$ctrl.formName.$valid">Teste</button>\n    </div>',
  transclude: true,
  bindings: {
    name: '@',
    type: '@?',
    model: '<ngModel',
    options: '<',
    properties: '='
  },
  controller: function controller($scope) {
    this.$onInit = function () {
      this.formName = this.name || 'defaultForm';
      this.type = this.type ? 'form-' + this.type : '';
    };

    this.$postLink = function () {
      if (!angular.isDefined(this.properties)) {
        this.properties = {};
      }
      this.properties.form = this.formName;
    };

    // (function() {

    // })();
  }
})
//Componente feito somente para demonstração de outros componentes entre o form e o componente em ação
.component('cpMeio', {
  template: '<div class="meio">\n      <div ng-transclude></div>\n    </div>',
  transclude: true,
  bindings: {},
  controller: function controller($scope) {}
})

//Diretiva responsável por colocar os atributos angular dinamicamente
.directive('cpAtt', function ($compile, $timeout) {
  //método para ignorar os atributos que será removidos do HTML final
  function isIgnorarAtributo(key, toIgnore) {
    return ['toIgnore'].concat(toIgnore).some(function (item) {
      return item === key;
    });
  }

  //Método que prepara os atributos que serão renderizados no HTML
  //attrs: atributos do componente que serão manipulados
  //obj: atributos do componente para manipulação
  function prepararAtributos(attrs, obj) {
    for (var key in obj.$attr) {
      if (!isIgnorarAtributo(key, obj.toIgnore)) {
        attrs.$set(obj.$attr[key].replace('cp', 'ng'), obj[key]);
      }
    }
  }
  return {
    restrict: 'A',
    terminal: true, // solution to duplicate items in select
    priority: 1000, // solution to duplicate items in select
    link: function link(scope, element, attrs, ctrl) {
      prepararAtributos(attrs, scope.$ctrl.attrs);
      //Anula o cp-att para não entrar em loop
      attrs.$set('cpAtt', null);
      //Compilando o elemento a ser exibido no HTML final
      $compile(element)(scope);
    }
  };
}).component('cpCheckbox', {
  bindings: {
    ngModel: '=',
    label: '@?',
    name: '@?'
  },
  require: {
    form: '^form',
    cpForm: '^^cpForm'
  },
  template: '\n    <input \n      name="{{$ctrl.name}}" \n      ng-model="$ctrl.ngModel" \n      type="checkbox" \n      cp-att="$ctrl.attrs"/>\n  ',
  controller: function controller($scope, $element, $attrs) {
    this.$onInit = function () {
      this.attrs = $attrs;
      this.attrs.toIgnore = ['ngModel'];
    };
  }
}).component('cpRadio', {
  bindings: {
    ngModel: '=',
    label: '@?',
    name: '@?'
  },
  require: {
    form: '^form',
    cpForm: '^^cpForm'
  },
  template: '\n    <input \n      name="{{$ctrl.name}}" \n      ng-model="$ctrl.ngModel" \n      type="radio" \n      cp-att="$ctrl.attrs"/>\n  ',
  controller: function controller($scope, $element, $attrs) {
    this.$onInit = function () {
      this.attrs = $attrs;
      this.attrs.toIgnore = ['ngModel'];
    };
  }
}).component('cpEmail', {
  bindings: {
    ngModel: '=',
    label: '@?',
    name: '@?'
  },
  require: {
    form: '^form',
    cpForm: '^^cpForm'
  },
  template: '\n    <input\n      name="{{$ctrl.name}}" \n      ng-model="$ctrl.ngModel" \n      type="email" \n      cp-att="$ctrl.attrs"/>\n  ',
  controller: function controller($scope, $element, $attrs) {
    this.$onInit = function () {
      this.attrs = $attrs;
      this.attrs.toIgnore = ['ngModel'];
    };
  }
}).component('cpUrl', {
  bindings: {
    ngModel: '=',
    label: '@?',
    name: '@?'
  },
  require: {
    form: '^form',
    cpForm: '^^cpForm'
  },
  template: '\n    <input \n      name="{{$ctrl.name}}" \n      ng-model="$ctrl.ngModel" \n      type="url" \n      cp-att="$ctrl.attrs"/>\n  ',
  controller: function controller($scope, $element, $attrs) {
    this.$onInit = function () {
      this.attrs = $attrs;
      this.attrs.toIgnore = ['ngModel'];
    };
  }
}).component('cpTime', {
  bindings: {
    ngModel: '=',
    label: '@?',
    name: '@?'
  },
  require: {
    cpForm: '^^cpForm'
  },
  template: '\n    <input \n      name="{{$ctrl.name}}" \n      ng-model="$ctrl.ngModel" \n      type="time" \n      cp-att="$ctrl.attrs"/>\n  ',
  controller: function controller($scope, $element, $attrs) {
    this.$onInit = function () {
      this.attrs = $attrs;
      this.attrs.toIgnore = ['ngModel'];
    };
  }
}).component('cpNumber', {
  bindings: {
    ngModel: '=',
    label: '@?',
    name: '@?'
  },
  require: {
    form: '^form',
    cpForm: '^^cpForm'
  },
  template: '\n    <input \n      name="{{$ctrl.name}}" \n      ng-model="$ctrl.ngModel" \n      type="number" \n      cp-att="$ctrl.attrs"/>\n  ',
  controller: function controller($scope, $element, $attrs) {
    this.$onInit = function () {
      this.attrs = $attrs;
      this.attrs.toIgnore = ['ngModel'];
    };
  }
}).component('cpRange', {
  bindings: {
    ngModel: '=',
    label: '@?',
    name: '@?'
  },
  require: {
    form: '^form',
    cpForm: '^^cpForm'
  },
  template: '\n    <input \n      name="{{$ctrl.name}}" \n      ng-model="$ctrl.ngModel" \n      type="range"\n      cp-att="$ctrl.attrs"/>\n  ',
  controller: function controller($scope, $element, $attrs) {
    this.$onInit = function () {
      this.attrs = $attrs;
      this.attrs.toIgnore = ['ngModel'];
    };
  }
}).component('cpInputList', {
  bindings: {
    ngModel: '=',
    label: '@?',
    name: '@?'
  },
  require: {
    form: '^form',
    cpForm: '^^cpForm'
  },
  template: '\n    <input \n      name="{{$ctrl.name}}" \n      ng-list\n      ng-model="$ctrl.ngModel" \n      cp-att="$ctrl.attrs"/>\n  ',
  controller: function controller($scope, $element, $attrs) {
    this.$onInit = function () {
      this.attrs = $attrs;
      this.attrs.toIgnore = ['ngModel', 'ngList'];
    };
  }
}).component('cpInputText', {
  bindings: {
    ngModel: '=',
    label: '@?',
    name: '@?'
  },
  require: {
    form: '^form',
    cpForm: '^^cpForm'
  },
  template: '\n    <input \n      name="{{$ctrl.name}}" \n      class="input" \n      ng-model="$ctrl.ngModel" \n      type="text" \n      cp-att="$ctrl.attrs"/>\n  ',
  controller: function controller($scope, $element, $attrs) {
    this.$onInit = function () {
      this.attrs = $attrs;
      this.attrs.toIgnore = ['ngModel'];
    };
  }
})

//Componente de select para abstração
.component('cpSelect', {
  restrict: 'E',
  bindings: {
    cpDefaultOptionText: '@?',
    ngModel: '=',
    label: '@?',
    cpChange: '<?'
  },
  require: {
    form: '^form',
    cpForm: '^^cpForm'
  },
  template: '\n  <select \n    name="outro-select" \n    ng-model="$ctrl.ngModel"\n    ng-change="$ctrl.change()"\n    cp-att="$ctrl.attrs">\n    <option value="" ng-if="$ctrl.showOptionText()">{{$ctrl.cpDefaultOptionText}}</option>\n  </select>\n',
  controller: function controller($scope, $element, $attrs) {
    this.$onInit = function () {
      //Importante colocar os atributos no escopoe
      this.attrs = $attrs;
      //Importante adicionar os campos de ignore de cada atributo
      this.attrs.toIgnore = ['ngModel', 'cpChange'];
    };
    //Responsavel por visualizar o select default do componente
    this.showOptionText = function () {
      return angular.isDefined(this.cpDefaultOptionText);
    };

    //Criado para atualizar a mudança do change na chamada para não mostrar o valor antigo
    this.change = function () {
      if (this.cpChange) {
        this.cpChange(this.ngModel);
      }
    };
  }
}).controller('Ctrl', function ($scope) {

  //Contador referente ao teste de performance
  (function () {
    $scope.items = [];
    for (var i = 0; i < 1000; i++) {
      $scope.items.push(i);
    }
  })();
  //Propriedades para controle do formulario, model, atributos e eventos
  $scope.properties = {
    availableOptions: [{ id: '1', name: 'Option A' }, { id: '2', name: 'Option B' }],
    events: {
      click: function click(objAtualizado) {
        console.log(objAtualizado || 'falta selecionar');
      },
      blur: function blur() {
        alert('blur');
      }
    }
  };

  $scope.options = {
    click: function click(objAtualizado) {
      console.log(objAtualizado || 'falta selecionar');
    },
    blur: function blur() {
      alert('blur');
    },
    availableOptions: [{ id: '1', name: 'Option A' }, { id: '2', name: 'Option B' }]
  };
  $scope.model = {
    //exemplo de model que já vem selecionado um valor
    input: 'gilluanssss',
    select: { id: "1", name: "Option A" },
    color: {
      name: 'red'
    },
    "check": "YES"
  };
});