module.exports = {
    /****************************/
    /**** Global Variables ******/
    /****************************/
    srchCrit: 'Aspirin',
    srchCrit2: 'Vicodin',
    srchCrit3: 'Acetaminophen',
    srchCrit4: 'Abacavir',
    srchCrit5: 'Motrin',
	srchhdrtitle: 'Search Drug',
	
    /****************************/
    /****** Landing Page ********/
    /****************************/
    srchbxID: '#search-box',
    srchbtnID: '#search-button',
    drgRclBtnID: '#drug-recall-button',
    dvcRclBtnID: '#device-recall-button',
    fdRclBtnID: '#food-recall-button',
    helpBtnID: '#help-main-page',
    recallLblID: '#recall-instructions',
    recalllinkTxt: '...or to view a list of the most recent drug, medical device, or food recalls select one of the links below.',

    /****************************/
    /********* Sidebar **********/
    /****************************/
    sbSrchBxID: '#search-button-sidebar',
    sbSrchBtnID: '#sidebar-search-box',

    /****************************/
    /****** Results Page ********/
    /****************************/
    loadingIndicatorID: '#loading',
    mnCntDivID: '#main_content',
    resultsTblID: '#recall-results-table',
    drgRecallTxt: 'Drug Recalls For The Last 60 Days',
    fdRecallTxt: 'Food Recalls For The Previous 12 Months',
    devRecallTxt: 'Device Recalls For The Previous 12 Months',
    recallResTblID: '#recall-results-table',
    eventTabID: '#event-tab',
    labelTabID: '#label-tab',
    recallTabID: '#recall-tab',
    eventResTblID: '#event-results-table',
    labelResTblID: '#label-results-table',
    recallResTblID: '#recall-results-table',


    /****************************/
    /******* Help Modal *********/
    /****************************/
    helpModalID: '#myModal',
    modalBodyCL: '.modal-body',
    closeBtnCl: '.close',
    helpIndexPgID: '#help-index-page',

    /****************************/
    /***** Global Fuctions ******/
    /****************************/

    //Function for taking the screenshots
    // How-to use:
    // client.globals.screenshots(pass_reference_to_client, pass_name_of_screenshot);
    // example:
    // client.globals.screenshots(client, 'BPA-75-search_results');

    TakeSS: function(client, name) {
        var viewport_widths = [767, 768, 1280, 1460];

        viewport_widths.forEach(function(width) {
            client
                .resizeWindow(width, 500)
                .saveScreenshot(client.screenshotsPath + name + width + '.png')
        });
    }


};