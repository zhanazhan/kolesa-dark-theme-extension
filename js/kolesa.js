const writeWhatsUpKolesa = async () => {
    while (true) {
        const exist = Array.from(document.querySelectorAll('.social-button'));
        if (exist.length > 0) {
            break;
        }
        await sleep(2000);
        Array.from(document.querySelectorAll('.seller-phones__phones-list li')).forEach((node) => socialInserter(node, 'kolesa'));
    }
}


$(() => {
    const selectors = [
        '.place-vip_newauto'
    ];
    initHide(selectors);

    $('.seller-phones__show-button').click(() => {
        setTimeout(writeWhatsUpKolesa, 1000);
    });
});
