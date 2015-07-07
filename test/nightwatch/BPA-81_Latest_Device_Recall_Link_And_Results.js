
module.exports = {
    disabled: false,
    //Global vars - use variables defined in globalsModule.js file by client.global.VARIABLE_NAME
    'Access URL': function(client) {
        client
            .url(client.launchUrl)
            .waitForElementVisible('body', 1000);
    },
	'Verify 3 recall links are present': function(client) {
        client
		    .pause(1000)
            .verify.elementPresent(client.globals.drgRclBtnID)
			.verify.elementPresent(client.globals.dvcRclBtnID)
			.verify.elementPresent(client.globals.fdRclBtnID)
    },
    'Verify text above links': function(client) {
        client
            .verify.elementPresent(client.globals.recallLblID)
			.verify.containsText(client.globals.recallLblID,client.globals.recalllinkTxt)
        client.globals.TakeSS(client, 'BPA-81- recall_links_mainpage');
   },
    'Click on device recall link': function(client) {
        client
		    .click(client.globals.dvcRclBtnID)
            .pause(1000);
    },
	'Verify device recall results page': function(client) {
        client
			.verify.elementPresent('h1')
			.verify.containsText('h1',client.globals.devrecallTxt)
            .pause(1000);

        client.globals.TakeSS(client, 'BPA-81-drug_recall_results');
    },
    'Verify device recall results table is present': function(client) {
        client
			.verify.elementPresent(client.globals.recallresTblID)
            //.pause(1000);

        client.globals.TakeSS(client, 'BPA-81-Device Search Result');
    },
    'Close Client': function(client) {
        client.end();
    }


};