import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    speed: 1000,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    on: {
        click: function () {
            this.slideNext();
        },
    },
});