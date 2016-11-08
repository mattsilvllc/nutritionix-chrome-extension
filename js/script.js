'use strict';

var calculateCalories = function(info, tab) {
    chrome.tabs.executeScript({
        code: "window.getSelection().toString();"
    }, function(selection) {
        // selectionText contains text including line breaks
        var selectionText = selection[0];

        /**
         * Get Serving Size
         */
        var servingSize = 1;

        if (info.menuItemId.indexOf("NixCalcSrv") > -1) {
            servingSize = info.menuItemId[info.menuItemId.length - 1];
        }
        // End


        chrome.tabs.create({
            url: 'https://www.nutritionix.com/natural-demo?q=' + selectionText.split('\n').join('%0D%0A') + '&lineDelimited=true' + '&s=' + servingSize,
        });
    });
};

// Main Menu Item
chrome.contextMenus.create({
    id: 'NixCalc',
    title: 'Calculate Recipe',
    contexts: ['selection'],
    // onclick: calculateCalories
}, function() {
    if (chrome.runtime.lastError) {
        console.log('extension:error: ', chrome.runtime.lastError);
    }
});

// Create child menu items for Serving Size
(function childMenuItems(maxItems) {
    var i = 1;
    for (i = 1; i <= maxItems; i++) {
        chrome.contextMenus.create({
            id: 'NixCalcSrv' + i,
            parentId: 'NixCalc',
            title: i + (i > 1 ? ' Servings' : ' Serving'),
            contexts: ['selection'],
            onclick: calculateCalories
        }, function() {
            if (chrome.runtime.lastError) {
                console.log('extension:error: ', chrome.runtime.lastError);
            }
        });
    }
})(8);
