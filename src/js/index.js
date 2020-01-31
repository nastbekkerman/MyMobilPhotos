import Masonry from 'masonry-layout';


window.$ = window.jQuery = require('jquery')
const fancybox = require('@fancyapps/fancybox')
import '@fancyapps/fancybox/dist/jquery.fancybox.min.css';

$(document).ready(function () {
  const elem = $('#gallery'); // DOM элемент jQuery с ID = gallery

  if (elem.length !== 0) {
    const dataName = elem.data('gallery');
    $.ajax({
      url: 'http://localhost:3062/gallery',
      data: {
        name: dataName
      },
      dataType: 'JSONP'
    }).done(function (response) {
      if (response.length > 0) {
        let content = ''; // переменная для картинок
        response.forEach(item => {
          content = content + `<a href="./img/${item.image}" class="gallery-item" data-fancybox="gallery" ><img src="./img/${item.thumb}" /></a>`;
        });
        elem.append(content); // добавление картинок в блок
        setTimeout(function () {
          var msnry = new Masonry(elem[0], {
            itemSelector: '.gallery-item'
          });
        }, 300);

        $('[data-fancybox="gallery"]').fancybox({
        });
      }
    }).fail(function (jqXHR, textStatus) {
      console.error('error load AJAX data', jqXHR, textStatus);
    });
  }
})