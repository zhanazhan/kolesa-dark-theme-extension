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

const sleep = ms => new Promise(r => setTimeout(r, ms));

const socialInserter = (node, from) => {
    const number = node.innerText.trim().replaceAll(' ', '');
    const classWhatsApp = from === 'kolesa'
        ? 'kl-ui-button kl-ui-button--green'
        : 'kr-btn kr-btn--auto kr-btn--green';
    const classTelega = from === 'kolesa'
        ? 'kl-ui-button kl-ui-button--blue'
        : 'kr-btn kr-btn--auto kr-btn--blue';
    const classAdditional = from === 'kolesa'
        ? ' social-button-alike'
        : ' social-button';
    const linkWhatsApp = $('<a/>')
        .attr('href', `https://wa.me/${number}`)
        .attr('target', '_blank')
        .attr('rel', 'nofollow')
        .addClass(classWhatsApp + ' ' + classAdditional)
        .text('✆ W')
    $(node).append(linkWhatsApp);
    const linkTelega = $('<a>')
        .attr('href', `https://t.me/${number}`)
        .attr('target', '_blank')
        .attr('rel', 'nofollow')
        .addClass(classTelega + ' ' + classAdditional + ' pr-4')
        .text('✆ T')
    $(node).append(linkTelega);
};

