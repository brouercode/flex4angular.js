angular.module('flex4angular.util.maxchar', [])
/**
 * Diretiva para não permitir o usário digitar mais caracteres do que o permitido
 * EX:
 *		<input type="text" class="form-control" data-fa-maxchar="4" />
 */
.directive('faMaxchar',
	function() {
		return {
			link: function(scope, element, attrs) {
				var maxlength = Number(attrs.faMaxchar);
				//controla o conteúdo ao usuário pressionar as teclas
				element.bind('keypress', function(event) {
					var el = event.target;
					if (el.value.length - (el.selectionEnd - el.selectionStart) >= maxlength && event.keyCode != 13 && event.keyCode != 9) {
						event.preventDefault();
					}
				});
				//Controla o conteúdo colado
				element.bind('paste', function(event) {
					var oldVal = event.target.value;
					var start = event.target.selectionStart;
					var end = event.target.selectionEnd;
					setTimeout(function() {
						var value = event.target.value;
						if (value.length > maxlength) {
							var qtdNewChar = value.length - oldVal.length;
							var transformedInput = value.substring(0, start) + value.substring(start, start + maxlength - oldVal.length + (end - start)) + value.substring(end + qtdNewChar, oldVal.length + qtdNewChar);
							event.target.value = transformedInput;
							return transformedInput;
						}
					}, 0);
				});
			}
		};
	}
);