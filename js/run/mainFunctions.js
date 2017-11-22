const ipc = require('electron').ipcRenderer;
const ServiceHandler = require('../lib/ServiceHandler.js');

$('#showSettings').click(() =>
{
	ipc.sendSync('syncshowSettings');
});

$('.chip-all').click(() => {
	hideSidebars();
	emptyChannelsAndContent();
	$('.chip').removeClass('active');
	$('.chip-all').addClass('active');
	ipc.sendSync('setService', ServiceHandler.SERVICE.ALLE);
	$('#whatsappContent').hide();
});

$('.chip-discord').click(() =>
{
	showAllSidebars();
	emptyChannelsAndContent();
	$('.chip').removeClass('active');
	$('.chip-discord').addClass('active');
	ipc.sendSync('setService', ServiceHandler.SERVICE.ALLE);
	$('#whatsappContent').hide();
});

$('.chip-irc').click(() =>
{
	showAllSidebars();
	emptyChannelsAndContent();
	$('.chip').removeClass('active');
	$('.chip-irc').addClass('active');
	ipc.sendSync('setService', ServiceHandler.SERVICE.IRC);
	$('#whatsappContent').hide();
});

$('.chip-telegram').click(() => {
	showAllSidebars();
	emptyChannelsAndContent();
	$('.chip').removeClass('active');
	$('.chip-telegram').addClass('active');
	ipc.sendSync('setService', ServiceHandler.SERVICE.TELEGRAM);
	$('#whatsappContent').hide();
});

$('.chip-whatsapp').click(() =>
{
	hideSidebars();
	emptyChannelsAndContent();
	$('.chip').removeClass('active');
	$('.chip-whatsapp').addClass('active');
	ipc.sendSync('setService', ServiceHandler.SERVICE.WHATSAPP);
	$('#whatsappContent').show();
	$('#whatsappContent webview').get(0).reload(true);

});

$('.chip-facebook').click(() =>{
	showOneSidebar();
	emptyChannelsAndContent();
	$('.chip').removeClass('active');
	$('.chip-facebook').addClass('active');
	ipc.sendSync('setService', ServiceHandler.SERVICE.FACEBOOK);
	$('#whatsappContent').hide();
});


function hideSidebars()
{
	$('body').css({
		'grid-template-areas': '"header header header" "main main main"'
	});

	$('#outerSidebar').css('display', 'none');
	$('#innerSidebar').css('display', 'none');
}

function showOneSidebar()
{
	$('body').css({
		'grid-template-areas': '"header header header" "osidebar main main"'
	});

	$('#outerSidebar').css('display', 'grid');
	$('#innerSidebar').css('display', 'none');
}

function showAllSidebars()
{
	$('body').css({
		'grid-template-areas': '"header header header" "osidebar isidebar main"'
	});

	$('#outerSidebar').css('display', 'grid');
	$('#innerSidebar').css('display', 'grid');
}

function emptyChannelsAndContent()
{
	$('#innerSidebar').empty();
	$('#outerSidebar').empty();
	$('main').empty();
}