"use strict";
$(function () {

	var id;

	var chl = function () {
		// すでに表示しているhighlightコードは削除
		$('.chl').remove();

		var codetype = $('select.code-type').val();

		var script;
		if (/html/.test(codetype)) {
			script = $('<source>');
		} else {
			script = $('<script>');
		}

		script.attr('type', "code/" + codetype)
			.attr('title', `sample code`);

		$('body').append(script);

		script.html($('textarea').val());

		CodeHighlight.execute();
	};

	$('select.code-type').on('change', chl);

	$('textarea').on('keydown', function () {
		if (id) clearTimeout(id);
		id = setTimeout(chl, 500);
	});

	chl();
});