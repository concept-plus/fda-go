module.exports = {
    disabled: false,
    //Global vars - use variables defined in globalsModule.js file by client.global.VARIABLE_NAME
    'Access URL': function(client) {
        client
            .url(client.launchUrl)
            .waitForElementVisible('body', 1000)
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
			.useXpath()
		    .verify.containsText('h1',client.globals.srchCrit2)
            .verify.elementPresent(client.globals.loadingIndID);
		
        
    },

	'Verify Search header is getting displayed on the side panel': function(client) {
		client
		    .useXpath()
		     .verify.containsText('//div/div/div/div/div/h3',srchhdrtitle)
			 .verify.title(clients.globals.srchhdrtitle)
			// pause(1000);
	},

	 'Enter drug brand in search panel': function(client){
		 client
		      
			   .useXpath() 
			   .setValue('//div/div/div/div/div[2]/form/input',client.globals.srchCrit4)
 			   .click('//div/div/div/div/div[2]/form/button')
			   .useCss() //Repointing to the default locator
			   .verify.containsText('h1',client.globals.srchCrit4)
			
			  
    },

	'Enter drug substance in search panel': function(client){
		client
		   
		    .useXpath()
			.setValue('//div/div/div/div/div[2]/form/input',client.globals.srchCrit3)
		    .click('//div/div/div/div/div[2]/form/button')
			.useCss()
			.verify.containsText('h1',client.globals.srchCrit3)
			
	},


    'Close Client': function(client) {
        client.end();
    }


};