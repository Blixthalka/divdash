import moment from "moment/moment";




export const demoDividends = () => {
    const years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

    const stocks = [{
        name: "Investor B",
        isin: "SE0015811955",
        months: [5, 11],
        dividend: 3,
        num: 50,
        factor: 10
    },
    {
        name: "Swedbank A",
        isin: "SE0000242455",
        months: [3],
        dividend: 7,
        num: 40,
        factor: 10
    },
    {
        name: "Cibus Nordic Real Estate",
        isin: "SE0010832204",
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        dividend: 10,
        num: 23,
        factor: 30
    },
    {
        name: "NIBE Industrier B",
        isin: "SE0015988019",
        months: [5],
        dividend: 0.33,
        num: 23,
        factor: 20
    },
    {
        name: "Axfood",
        isin: "SE0006993770",
        months: [3, 9],
        dividend: 4,
        num: 47,
        factor: 10
    },
    {
        name: "Evolution",
        isin: "SE0012673267",
        months: [4],
        dividend: 22,
        num: 3,
        factor: 20
    },
    {
        name: "Sagax D",
        isin: "SE0009161052",
        months: [3, 6, 9, 12],
        dividend: 4,
        num: 100,
        factor: 1
    },
    {
        name: "Kabe B",
        isin: "SE0000107724",
        months: [5, 11],
        dividend: 8,
        num: 40,
        factor: 7
    },
    {
        name: "Inwido",
        isin: "SE0006220018",
        months: [5],
        dividend: 4,
        num: 70,
        factor: 12
    },
    {
        name: "Realty Income REIT",
        isin: "US7561091049",
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        dividend: 20,
        num: 40,
        factor: 2
    },
    {
        name: "NP3 Fastigheter Pref",
        isin: "SE0010820514",
        months: [1, 4, 7, 10],
        dividend: 4,
        num: 120,
        factor: 1
    },
    {
        name: "LVMH",
        isin: "FR0000121014",
        months: [4, 12],
        dividend: 50,
        num: 2,
        factor: 2
    },
    {
        name: "Resurs Holding",
        isin: "SE0007665823",
        months: [4, 9],
        dividend: 1,
        num: 200,
        factor: 10
    },
    {
        name: "Latour B",
        isin: "SE0010100958",
        months: [5],
        dividend: 2,
        num: 20,
        factor: 1
    },
    {
        name: "Öresund",
        isin: "SE0008321608",
        months: [5, 11],
        dividend: 3,
        num: 15,
        factor: 2
    },
    {
        name: "Nordea Bank Abp",
        isin: "FI4000297767",
        months: [3],
        dividend: 9,
        num: 200,
        factor: 10
    },
    {
        name: "Handelsbanken A",
        isin: "SE0007100599",
        months: [3],
        dividend: 4,
        num: 300,
        factor: 14
    },]


    return years.flatMap((year, yearIndex) => {
        return stocks.flatMap(stock => {
            return stock.months.map(month => {
                const quantity = stock.num + (yearIndex * stock.factor)
                const dividend = (stock.dividend + (yearIndex / 2)) / stock.months.length

                let dat = Math.floor(Math.random() * 27) + 1
                if (dat < 10) {
                    dat = "0" + dat
                }
                let mo = month;
                if (mo < 10) {
                    mo = "0" + mo
                }
                return {
                    name: stock.name,
                    isin: stock.isin,
                    date: moment("" + year + "-" + mo + "-" + dat, "YYYY-MM-DD"),
                    amount: Math.round(dividend * quantity),
                    tag: "avanza"
                }
            })
        })
    })
}