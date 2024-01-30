$(() => {
    const selectors = [
        '#place-vip',
        '.ns-advert',
        '.ddl_campaign'
    ];
    const maxTrials = 10;
    let trialCounts = 0;
    let interval = null;

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
    hideAd();
    interval = setInterval(hideAd, 2000);
});
