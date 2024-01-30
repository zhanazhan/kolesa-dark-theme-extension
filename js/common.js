const initHide = (selectors) => {
    var maxTrials = 10;
    var trialCounts = 0;
    var interval = null;

    const hideAd = () => {
        if (maxTrials < trialCounts) {
            clearInterval(interval);
            return;
        }
        selectors.forEach((elem) => {
            $(elem).hide();
        });
        trialCounts++;
    };
    interval = setInterval(hideAd, 2000);
};
const initUnhide = (selectors) => {
    var maxTrials2 = 1;
    var trialCounts2 = 0;
    var interval2 = null;
    const unhide = () => {
        if (maxTrials2 < trialCounts2) {
            clearInterval(interval2);
            return;
        }
        selectors.forEach((elem) => {
            const $elem = $(elem);
            const val = $elem.text().trim().replace('T', ' ').replace('+06:00', '');
            $(elem).text(val).show();
            const $elem2 = $(elem);
            !$elem2.hasClass('reset-hot-time') && $elem2.addClass('reset-hot-time');
        });
        trialCounts2++;
    };
    unhide();
    interval2 = setInterval(unhide, 2000);
};
