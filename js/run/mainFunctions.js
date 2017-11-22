const ipc = require('electron').ipcRenderer;

$('#showSettings').click(() =>
{
	ipc.sendSync('syncshowSettings');
});

$('.chip-all').click(() => {
	hideSidebars();
	emptyChannelsAndContent();
	$('.chip').removeClass('active');
	$('.chip-all').addClass('active');
});

$('.chip-discord').click(() =>
{
	showAllSidebars();
	emptyChannelsAndContent();
	$('.chip').removeClass('active');
	$('.chip-discord').addClass('active');
});

$('.chip-facebook').click(() =>{
	showOneSidebar();
	emptyChannelsAndContent();
	$('.chip').removeClass('active');
	$('.chip-facebook').addClass('active');
});

$('.chip-irc').click(() =>
{
	showAllSidebars();
	emptyChannelsAndContent();
	$('.chip').removeClass('active');
	$('.chip-irc').addClass('active');
});

$('.chip-telegram').click(() => {
	showAllSidebars();
	emptyChannelsAndContent();
	$('.chip').removeClass('active');
	$('.chip-telegram').addClass('active');
});

$('.chip-whatsapp').click(() =>
{
	showOneSidebar();
	emptyChannelsAndContent();
	$('.chip').removeClass('active');
	$('.chip-whatsapp').addClass('active');
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