import testImg1 from '@/assets/img/test-img1.png'
import testImg2 from '@/assets/img/test-img2.png'

export const testSoldOut = 'sold out'
const test = [
    {
        name: `pizza ${testSoldOut}`,
        img: testImg1,
        type: 'wallet',
        detail: 'Double All-In Overload',
        price: 525738,
        salePrice: 1000,
        soldOut: false
    },
    {
        name: 'greenwich voucher',
        img: testImg2,
        type: 'voucher',
        detail: 'Double All-In Overload',
        price: 525738,
        salePrice: 8000,
        soldOut: false
    },
    {
        name: 'pizza wallet',
        img: testImg1,
        type: 'wallet',
        detail: 'Double All-In Overload',
        price: 525738,
        salePrice: 1000,
        soldOut: true
    },
    {
        name: 'greenwich wallet',
        img: testImg2,
        type: 'wallet',
        detail: 'Double All-In Overload',
        price: 525738,
        salePrice: 20000,
        soldOut: false
    },
]

export const totalProduct = Array.from({ length: 16 }, (_, index) => ({
    ...test[index % test.length],
    id: index,
    name: `${test[index % test.length].name}${index + 1}`,
    salePrice: test[index % test.length].salePrice + index * 100,
}));

export const initDetailData = {
    name: '',
    img: '',
    type: 'wallet',
    detail: '',
    price: 0,
    salePrice: 0,
    soldOut: false,
}