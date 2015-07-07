module.exports = {
    disabled: false,
    //Global vars - use variables defined in globalsModule.js file by client.global.VARIABLE_NAME
    'Validate Help Link Displays on Main Page': function(client) {
        client
            .url(client.launchUrl)
            .waitForElementVisible('body', 1000)
            .verify.visible(client.globals.helpBtnID);
    },
    'Select Help Link and Validate Modal Displays on Main Page - With Content': function(client) {
        client
            .verify.visible(client.globals.helpBtnID)
            .click(client.globals.helpBtnID)
            .pause(500)
            .verify.visible(client.globals.helpModalID)
            .verify.visible(client.globals.modalBodyCL)
            .verify.visible(client.globals.closeBtnCl)
            .globals.TakeSS(client, 'BPA-204-Help_Link_Main_Page');
    },
    'Close Modal on Main Page': function(client) {
        client
            .verify.visible(client.globals.closeBtnCl)
            .click(client.globals.closeBtnCl);
    },
    'Validate Help Link Displays on Food Recall Screen': function(client) {
        client
            .waitForElementVisible(client.globals.fdRclBtnID, 1000)
            .verify.visible(client.globals.fdRclBtnID)
            .click(client.globals.fdRclBtnID)
            .waitForElementVisible(client.globals.resultsTblID, 1000)
            .verify.visible(client.globals.helpIndexPgID);
    },
    'Select Help Link and Validate Modal Displays on Food Recall Page - With Content & Then Close Help Modal': function(client) {
        client
            .verify.visible(client.globals.helpIndexPgID)
            .click(client.globals.helpIndexPgID)
            .pause(500)
            .verify.visible(client.globals.helpModalID)
            .verify.visible(client.globals.modalBodyCL)
            .verify.visible(client.globals.closeBtnCl)
            .globals.TakeSS(client, 'BPA-204-Help_Link_Index_Page');

    },
    'Close Modal on Index Page': function(client) {
        client
            .verify.visible(client.globals.closeBtnCl)
            .click(client.globals.closeBtnCl);
    },


    'Close Client': function(client) {
        client.end();
    }

};