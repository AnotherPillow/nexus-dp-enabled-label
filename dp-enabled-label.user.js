// ==UserScript==
// @name        DP Enabled Label
// @namespace   Violentmonkey Scripts
// @match       https://www.nexusmods.com/stardewvalley/mods/*
// @grant       none
// @version     1.0
// @author      -
// @description Adds a more noticeable label to mods' descriptions to indicate if DP is enabled or not
// @grant       GM_addStyle
// ==/UserScript==

const ENABLED_HTML = `<i class="material-icons" style="font-size:18px;margin-right:4px;color: #27ae60">attach_money</i><span class="flex-copy">This mod <b>is opted in</b> to our mod rewards program.</span><div class="dp-enabled-label-wrap"></div>`
const DISABLED_HTML = `<i class="material-icons" style="font-size:18px;margin-right:4px;color: #eb5757">money_off</i><span class="flex-copy">This mod is currently <b>not</b> opted in to our mod rewards program.</span><div class="dp-enabled-label-wrap"></div>`

;(() => {
  const dropdown = document.querySelector(`.tab-description>.accordionitems>dl> dt[data-tracking*="View Permissions"] + dd`)
  const modHistory = document.querySelector(`.tab-description>.modhistory`)
  if (!dropdown || !modHistory || modHistory.querySelector('.material-icons')) return console.log(dropdown, modhistory); // possible not description tab, or is own mod

  const notOptedIn = dropdown.innerHTML.includes('This mod is <b>not</b> opted-in to receive Donation Points')
  const yesOptedIn = dropdown.innerHTML.includes('This mod is <b>opted-in</b> to receive Donation Points')

  GM_addStyle(`
    .modhistory.inline-flex { display: block !important; /*justify-content: flex-start; flex-wrap: wrap; */}
    /*.modhistory svg { width: 2em !important; height: 2em !important;  }*/
  .dp-enabled-label-wrap {
    width: 100%;
    height: 0;
  }
  .dp-enabled-label-wrap::before {
    content: ''; display: block; width: 100%; height: 0;
  }
`)

  if (notOptedIn) {
    modHistory.innerHTML = DISABLED_HTML + modHistory.innerHTML
  } else if (yesOptedIn) {
    modHistory.innerHTML = ENABLED_HTML + modHistory.innerHTML
  } else {
    console.log(dropdown, modHistory, notOptedIn, yesOptedIn)
  }

})()
