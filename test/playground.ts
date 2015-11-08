/// <reference path="../typings/jquery/jquery.d.ts" />
"use strict";

declare var CHL;

$(() => {

	$('button').on('click', () => {
		// すでに表示しているhighlightコードは削除
		$('.chl').remove();

		let codetype = $('select.code-type').val();

		let script = $('<script>')
			.attr('type', `code/${codetype}`)
			.attr('title', `sample code`);

		$('body').append(script);

		script.html($('textarea').val());

		new CHL.CodeHighLight().execute();
	});

	$('button').click();
});