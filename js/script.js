'use strict';

var calculateCalories = function(info, tab) {
    chrome.tabs.create({
        url: 'https://www.nutritionix.com/natural-demo?q=' + info.selectionText,
    });
};

chrome.contextMenus.create({
    id: 'NixCalc',
    title: 'Calculate Recipe',
    contexts: ['selection'],
    onclick: calculateCalories
}, function() {
    console.log('extension:error: ', chrome.runtime.lastError);
});
