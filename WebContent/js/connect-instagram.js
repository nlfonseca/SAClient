function getInfoInstagram(value, type, isInput, callUrl) {
    var clientID = 'e8eae0ce6526431ba3edccfea322a05e';
    var apiHostInstagram = 'https://api.instagram.com';
    var dataURL = '';

    if (callUrl) {
        dataURL = callUrl;
    }
    else {
        dataURL = apiHostInstagram + '/v1/' + type + '/' + value + '/media/recent?callback=?&client_id=' + clientID;
    }

    $('.loader').fadeIn();

    $.ajax({
        type: 'POST',
        dataType: 'jsonp',
        url: dataURL
    })
    .done(function(data) {
        // setup load more
        
        // dados
        var $dataInsta = data.data;

        // verificação (se apaga os 20 que estao ou nao)
        if (isInput == true) { $('#container-photos').html(''); }
        
        if ($dataInsta != undefined && $dataInsta.length > 0) {
            var nextURL = data.pagination.next_url;

            $.each( $dataInsta, function(key, dados) {

                var photo = {
                    count: { 
                        likes: dados.likes.count,
                        comments: dados.comments.count
                    },
                    avatar: dados.user.profile_picture,
                    photo: dados.images.low_resolution.url,
                    url: dados.link,
                    id: dados.id
                };

                var addPhotos = $('#container-photos').append(' <div class="col-md-3 col-sm-4 col-xs-6 section-row container-photos__item">'+
                                                    '<div class="photo-wrapper" data-id="' + photo.id +'">'+
                                                        '<div class="photo" style="background-image: url(' + photo.photo  +');"></div>'+
                                                        '<div class="photo__info">' + 
                                                            '<div class="photo__likes">' + photo.count.likes + '</div>'+
                                                            '<div class="photo__comments">' + photo.count.comments + '</div>'+
                                                         '</div>'+
                                                    '</div>'+
                                                '</div>');

                //se for pela primeira vez faz efeito
                if(isInput)
                    addPhotos.hide().slideDown('slow');
            });
            
        
            if (type == "users" && isInput == true) {

                var content = '';

                var photoUser = $dataInsta[0].user.profile_picture;
                var username = $dataInsta[0].user.username;
                var website = $dataInsta[0].user.website;

                content += '<div class="header-user">';
                content += '<img class="header-user__photo" src="' + photoUser + '" alt="' + username + '" />';
                content += '<p class="header-user__username">' + username + '</p>';
                content += '</div>';

                if (website != '') {
                    content += '<div class="header-user--right">';
                    content += '<p class="header-user__website"><a href="' + website + '">' + website + '</a></p>';
                    content += '</div>';
                }

                $('.userBox').append(content);
            } else {
                $('.header').addClass('header--hidden').hide('normal');
                $('.search-box').addClass('search-box--fixed');
            }

            $('.error').fadeOut();

            // click na foto
            $('.photo-wrapper').on('click', function() {
                var id = $(this).data('id');

                openPopup(id, $dataInsta);
            });

            $('.load-more').data('value', value);
            $('.load-more').data('type', type);
            $('.load-more').data('nexturl', nextURL);

        } else {

            $('.userBox').hide();
            $('.error').fadeIn();
            $('.container-fluid').hide();
        }

        $('.loader').fadeOut();
        $('.load-more').hide().show('slow');
    })
    .fail(function(data) {
        console.log("ERRO!");
        $('.loader').fadeOut();
    });
}

$(function() {
    $('.search-tag').on('keypress', function(e) {
        if(e.which == 13) {
            $('body').removeClass('show-menu');
            getInfoInstagram($(this).val(), "tags", true);
        }
    });

    // loadmore
    $('.load-more').click(function() {
        getInfoInstagram($(this).data('value'), $(this).data('type'), false, $(this).data('nexturl'));
    });
});