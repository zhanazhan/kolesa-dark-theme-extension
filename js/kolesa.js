const writeWhatsUpKolesa = async () => {
    while (true) {
        const exist = Array.from(document.querySelectorAll('.social-button-alike'));
        if (exist.length > 0) {
            break;
        }
        await sleep(2000);
        Array.from(document.querySelectorAll('.seller-phones__phones-list li')).forEach((node) => socialInserter(node, 'kolesa'));
    }
}

const drawTable = (tableSelector, data) => {
    const id = 'table' + Math.floor(Math.random() * 1000);
    $(tableSelector).append($('<table/>').attr('id', id).addClass('datatable'));
    const tbl_head = document.createElement("thead");
    $.each(['#', 'Остаток', 'Платеж', 'Оплачено'], function () {
        const tbl_row = tbl_head.insertRow();
        $.each(this, function (k, v) {
            const cell = tbl_row.insertCell();
            cell.appendChild(document.createTextNode(v.toString()));
        });
    });
    const tbl_body = document.createElement("tbody");
    $.each(data, function () {
        const tbl_row = tbl_body.insertRow();
        $.each(this, function (k, v) {
            const cell = tbl_row.insertCell();
            cell.appendChild(document.createTextNode(v.toString()));
        });
    });
    $(`#${id}`).append(tbl_body);
}

const formatCurrency = (total) => {
    let neg = false;
    if(total < 0) {
        neg = true;
        total = Math.abs(total);
    }
    const price = (neg ? "-" : '') + parseFloat(total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
    return price.substring(0, price.indexOf('.')).replaceAll(',', ' ') + ' ₸';
}

const generateCreditDetails = (carPrice, downPayment, monthlyPayment, monthsCount) => {
    let remainingAmount = carPrice - downPayment;
    let totalPaid = downPayment;
    let creditDetails = [];

    for (let month = 1; month <= monthsCount; month++) {
        creditDetails.push({
            month: month,
            remainingAmount: remainingAmount.toFixed(0),
            monthlyPayment: monthlyPayment.toFixed(0),
            totalPaid: totalPaid.toFixed(0)
        });

        totalPaid += monthlyPayment;
        remainingAmount -= monthlyPayment;
    }

    const interestRate = ((totalPaid - carPrice) / carPrice) * 100;

    return [{
            name: 'Цена авто',
            overPayment: formatCurrency(carPrice)
        },{
            name: 'Первоначальный взнос',
            overPayment: formatCurrency(downPayment)
        },{
            name: 'Заемные средства',
            overPayment: formatCurrency(carPrice - downPayment)
        },{
            name: 'Погашение за месяцев',
            overPayment: monthsCount
        },{
            name: 'Ежемесячно',
            overPayment: formatCurrency(monthlyPayment)
        },{
            name: 'Сумма ежемесячных',
            overPayment: formatCurrency(totalPaid - downPayment)
        },{
            name: 'Переплата',
            overPayment: formatCurrency(totalPaid - carPrice)
        },
        {
            name: 'Процент',
            interestRate: (interestRate/ (monthsCount / 12)).toFixed(2) + '%'
        }];
}

const drawCredTable = (tableContainer) => {
    const offersCredit = $('#calcMonthPay');
    const invalidForm = $('.form-invalid');
    if (!offersCredit || invalidForm) return;
    const monthly = parseInt($('#calcMonthPay').text().replaceAll(' ', ''));
    const carPrice = parseInt($('#userPrice').val().replaceAll(' ', ''));
    const downPayment = parseInt($('#initPay').val().replaceAll(' ', ''));
    const monthsCount = parseInt($('#creditMonth label[class="month-radio__label js__radio-item active"] input').val());
    const credDetails = generateCreditDetails(carPrice, downPayment, monthly, monthsCount);
    drawTable(tableContainer, credDetails);
}


$(() => {
    const selectors = [
        '.place-vip_newauto'
    ];
    initHide(selectors);
    $('.seller-phones__show-button').click(() => {
        setTimeout(writeWhatsUpKolesa, 1000);
    });
    const tableContainer = '.datatable-container';
    setTimeout(() => {
        $('.offer__sidebar-sticky-wrap').append($('<div/>').attr('id', 'datatable-container').addClass('datatable-container'));
        drawCredTable(tableContainer);
    }, 3000);
    let timer;
    const refreshTable = () => {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            $(tableContainer).empty();
            drawCredTable(tableContainer);
        }, 1000);
    };

    $('.a-calculator__wrap').on('click', () => refreshTable());
    $('.a-calculator__wrap input').on('blur', () => refreshTable());
});
