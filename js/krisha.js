const writeWhatsUpKrisha = async () => {
    while (true) {
        const exist = Array.from(document.querySelectorAll('.social-button'));
        if (exist.length > 0) {
            break;
        }
        await sleep(2000);
        Array.from(document.querySelectorAll('.offer__contacts-phones p')).forEach((node) => socialInserter(node, 'krisha'));
    }
}


$(() => {
    const selectors = [
        '#place-vip',
        '.ns-advert',
        '.ddl_campaign',
        '.place-vip_newauto'
    ];
    initHide(selectors);

    $('.show-phones').click(() => {
        setTimeout(writeWhatsUpKrisha, 1000);
    });
});
