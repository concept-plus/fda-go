module.exports = {
    disabled: false,
    //Global vars - use variables defined in globalsModule.js file by client.global.VARIABLE_NAME
    'Access URL': function(client) {
        client
            .url(client.launchUrl)
            .waitForElementVisible('body', 3000);
        //.maximizeWindow();
    },
    'Enter Search': function(client) {
        client
            .verify.elementPresent(client.globals.srchbxID)
            .setValue(client.globals.srchbxID, client.globals.srchCrit2)
            .assert.valueContains(client.globals.srchbxID, client.globals.srchCrit2);
    },
    'Verify Search term displayed on page': function(client) {
        client
            .click(client.globals.srchbtnID)
            .waitForElementPresent('#main-content h1', 1000)
            .verify.containsText('#main-content h1', client.globals.srchCrit2);
    },

    'Close Client': function(client) {
        client.end();
    }


};