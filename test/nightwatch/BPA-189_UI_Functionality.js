module.exports = {
    disabled: false,
    //Global vars - use variables defined in globalsModule.js file by client.global.VARIABLE_NAME
    'Access URL': function(client) {
        client
            .url(client.launchUrl)
            .waitForElementVisible('body', 1000);
    },
    'Enter Search': function(client) {
        client
            .verify.elementPresent(client.globals.srchbxID)
            .setValue(client.globals.srchbxID, client.globals.srchCrit)
            .assert.valueContains(client.globals.srchbxID, client.globals.srchCrit);
    },
    'Verify Search Results with Screen Shots': function(client) {
        client
            .click(client.globals.srchbtnID)
			.pause(2000)
            .verify.containsText('h1',client.globals.srchCrit)
			.pause(2000)
        client.globals.TakeSS(client, 'BPA-189-search_results');
    },
    'Verify three tabs are present':  function(client) {
	    client
		    .pause(4000)
			.verify.elementPresent(client.globals.eventTabID)
			.verify.elementPresent(client.globals.labelTabID)
			.verify.elementPresent(client.globals.recallTabID)
	},
	'Verify filter is present':  function(client) {
	    client
		    .pause(4000)
			.verify.elementPresent('label')
	},
	    'Verify adverse events table is visible':  function(client) {
	    client
	        .pause(1000)
			.verify.visible(client.globals.eventResTblID)
	},
	'Click label tab and verify label table is visible':  function(client) {
	    client
			.click(client.globals.labelTabID)
			.pause(4000)
			.verify.visible(client.globals.labelResTblID)
	},
		'Click Recall tab and verify recall table is visible':  function(client) {
	    client
			.click(client.globals.recallTabID)
			.pause(4000)
			.verify.visible(client.globals.recallResTblID)
	},
	
	
	
    'Close Client': function(client) {
        client.end();
    }


};