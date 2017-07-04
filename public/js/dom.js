var View = function (m) {
  return { $type: 'option', value: m.code, $text: m.name };
};

var SelectTag = {
  $type: 'select',
  class: 'form-control',
  name: 'bank_code',
  required: true,
  _banks: [],
  $init: function () {
    this._fetchBanks();
  },

  _fetchBanks: function () {
    fetch('https://api.paystack.co/bank').then(function (response) {
     return response.json();
    }).then(function (data) {
     this._refresh(data.data);
    }.bind(this));
  },

  _refresh: function (result) {
    this._banks = result;
  },

  $components: [
   {
    $type: 'option',
    value: '',
    $text: 'Select bank',
  },
  ],
  $update: function () {
    this.$components = this.$components.concat(this._banks.map(View));
  },
};

var Form = {
  $type: 'form',
  action: 'https://api.paystack.co/bank/resolve',
  target: 'response',
  $components: [
   {
    $type: 'div',
    class: 'form-group',
    $components: [SelectTag],
  }, {
    $type: 'div',
    class: 'form-group',
    $components: [
     {
      $type: 'input',
      type: 'text',
      required: true,
      placeholder: 'Account number',
      class: 'form-control',
      name: 'account_number',
    },
    ],
  }, {
    $type: 'div',
    class: 'form-group',
    $components: [
     {
      $type: 'input',
      type: 'submit',
      class: 'form-control btn btn-info',
      value: 'Submit',
    },
    ],
  },
  ],
};

var FormContainer = {
  $type: 'div',
  class: 'col-sm-6',
  $components: [Form],
};

var IframeContainer = {
  $type: 'div',
	class: "col-sm-6",
	$components: [
		{
			$type: "iframe",
			name: "response",
			style: "width:100%"
		}
	]
};

var el = {
	$cell: true,
	class: "container",
	style: "margin-top: 50px;",
	$components: [
		{
			class: "row",
			$components: [FormContainer, IframeContainer]
		}
	]
}
