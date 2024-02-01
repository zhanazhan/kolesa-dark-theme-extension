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
