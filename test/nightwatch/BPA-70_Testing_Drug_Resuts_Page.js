module.exports = {
    disabled: true,
    //Global vars - use variables defined in globalsModule.js file by client.global.VARIABLE_NAME
    'Access URL': function(client) {
        client
            .url(client.launchUrl)
            .waitForElementVisible('body', 1000);
    },
    'Enter Search': function(client) {
        client
            .verify.elementPresent(client.globals.srchbxID)
            .setValue(client.globals.srchbxID, client.globals.srchCrit2)
            .assert.valueContains(client.globals.srchbxID, client.globals.srchCrit2);
    },
    'Verify Loading Indicator with Screen Shots': function(client) {
        client
            .click(client.globals.srchbtnID)
            .verify.elementPresent('h1')
            .verify.containsText('h1',client.globals.srchCrit2);
        client.globals.TakeSS(client, 'BPA-70-search_results_loading_indicator');
    },

    'Close Client': function(client) {
        client.end();
    }


};