var $searchWord = '';
var $userID = '';

function constructModal(user, photo, usersComments, numLikes, numComments, numViews) {
	var modal = '';

    modal += '<div class="modal-body clearfix">';

    // content body
    modal += '<img class="modalPhoto" src="' + photo + '" />';

    
    modal += '<div class="comments">';
    modal += '<div class="comments__content">';
    if (usersComments != null) {

	    for (var i = usersComments.length - 1; i >= 0; i--) {
	    	modal += '<div class="user">';
	    	modal += '<a class="user-link-profile" data-id="' + usersComments[i]['id'] + '" data-username="' + usersComments[i]['username'] + '">';
	    	modal += '<img class="photoUser" src="data:image/jpeg;base64,' + usersComments[i]['photo'] + '" alt="' + usersComments[i]['username'] + '" />';
	    	modal += '</a>';
	    	modal += '<a class="userLink user-link-profile" href="#" data-id="' + usersComments[i]['id'] + '" data-username="' + usersComments[i]['username'] + '">' + usersComments[i]['username'] + '</a>';
	    	modal += '<p class="userComment">' + usersComments[i]['comment'] + '</p>';
	    	modal += '</div>';
	    }
	}
    //close content
    modal += '</div>';
    
    //insert comments
    modal += '<div class="comments__insert">';
    modal += '<textarea class="comment__input" placeholder="Insert your comment"></textarea>';
    modal += '</div>';
    
    // close comments
    modal += '</div>';
    
    modal += '</div>';
    // close body

  	modal += '<div class="mFooter">';
    
    // content footer
    modal += '<div class="userPost">';
    modal += '<a href="#" class="user-link-profile" data-id="' + user['id'] + '" data-username="' + user['username'] + '">';
    modal += '<img class="userPostPhoto" src="' + user['photo'] + '" />';
    modal += '</a>';
    modal += '<a href="#" class="userPostName user-link-profile" data-id="' + user['id'] + '" data-username="' + user['username'] + '">' + user['username'] + '</a>';
    modal += '</div>';

	return modal;
}


function openPhoto(photo) {
	var photoId = photo.data('id');
	var dataURL = "http://localhost:8080/INSTAGRAMALIKE/media/" + photoId + "/comments";

	$.ajax({
        type: 'GET',
        dataType: 'json',
        url: dataURL
    })
    .done(function(data) {
        var userComments = [];
        var numLikes = photo.data('numlikes');
        var numComments = photo.data('numcomments');
        var numViews = photo.data('numviews');
        var photoFile = photo.find('img').attr('src');
        var arrayComments = [];
        var user = [];
        
        user['id'] = photo.data('owner-id');
        user['username'] = photo.data('owner-name');
        user['photo'] = 'img/avatar.png';

        if (data != undefined) {
        	var $dataInsta = data.comments;
        	
        	for (var i = 0; i < $dataInsta.length; i++) {
        		arrayComments[i] = [];
        		arrayComments[i]['username'] = $dataInsta[i].username;
        		arrayComments[i]['photo'] = $dataInsta[i].photoUser;
        		arrayComments[i]['id'] = $dataInsta[i].UID;
        		arrayComments[i]['comment'] = $dataInsta[i].text;
        	}
        }
        
        var modal = constructModal(user, photoFile, arrayComments, numLikes, numComments, numViews);
		
    	$('#mContent').html('');
		$('#mContent').append(modal);
		$('#modal-photo').modal('show');
		
		postView(photo.find('.photo__views'));
		
		$('.comment__input').on('keypress', function(e) {
			if (e.which === 13) {
				postComment($(this), photo);
			}
		});
		
		$('.user-link-profile').on('click', function(e) {
			$('#modal-photo').removeClass('in');
			$('body').removeClass('modal-open');
			$('.modal-backdrop').hide();
            getData($(this), 'other');
		});
    });
}

function postLike(photo) {
	$userID = $('.profile-username').attr('data-userid');
	
	var photoID = photo.parents('.photo-wrapper').data('id');
	
	var dataURL = 'http://localhost:8080/INSTAGRAMALIKE/media/addlike?pId=' + photoID + '&uId=' + $userID;
	
	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: dataURL
    })
    .done(function(data) {
    	photo.addClass('photo__likes--on');
    	
    	var v = photo.text();
    	photo.text(parseInt(v,10) + 1);
    })
    .fail(function(data) {
        console.log("ERRO!");
    });
}

function postComment(comment, photo) {
	var com = comment.val();
	var photoId = photo.data('id');
	$userID = $('.profile-username').attr('data-userid');
	comment.val(null);
	
	var dataURL = 'http://localhost:8080/INSTAGRAMALIKE/media/comment/' + photoId + '/' + $userID + '/' + com;
	
	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: dataURL
    })
    .done(function(data) {
    	if(data != null) {
	    	var addCom = '';
	    	
	    	addCom += '<div class="user">';
	    	addCom += '<span data-id=' + $userID + '">';
	    	addCom += '<img class="photoUser" src="img/avatar.png" alt="' + $('.profile-username').text() + '" />';
	    	addCom += '</span>';
	    	addCom += '<span class="userLink" data-id=' + $userID + '">' + $('.profile-username').text() + '</span>';
	    	addCom += '<p class="userComment">' + com + '</p>';
	    	addCom += '</div>';
	    	
	    	$('.comments__content').prepend(addCom);
	    	var v = photo.find('.photo__comments').text();
	    	photo.find('.photo__comments').text(parseInt(v,10) + 1);
    	}
    })
    .fail(function(data) {
        console.log("ERRO!");
    });
}

function postView(photo) {
	$userID = $('.profile-username').attr('data-userid');
	
	var photoID = photo.parents('.photo-wrapper').data('id');
	
	var dataURL = 'http://localhost:8080/INSTAGRAMALIKE/media/addview?pId=' + photoID + '&uId=' + $userID;
	
	$.ajax({
        type: 'POST',
        dataType: 'json',
        url: dataURL
    })
    .done(function(data) {
    	var v = photo.text();
    	photo.text(parseInt(v,10) + 1);
    })
    .fail(function(data) {
        console.log("ERRO!");
    });
}

function getData(tagname, type) {
	$('body').removeClass('show-menu');
	$userID = $('.profile-username').attr('data-userid');
	$searchWord = tagname;
	var dataURL = '';
	
	$('#container-photos').html('');
	
	if(tagname !== null && (type == 'tags' || type == 'users')) {
		$('#page-name').text('Search');
	    $('.content__subtitle').html('<h2 id="tags" class="search-type">Tags</h2>' +
	    							 '<h2 id="users" class="search-type">Users</h2>')
		
	    $('.search-type').removeClass('content__subtitle--active');
	    if(type === 'tags') {
	    	$('#tags').addClass('content__subtitle--active');
	    } else if(type === 'users') {
	    	$('#users').addClass('content__subtitle--active');
	    	type= 'users/search';
	    }
	    
		// type of search
		$('.search-type').on('click', function(e) {
			getData($searchWord, $(this).attr('id'));
	    });
		
	    dataURL = 'http://localhost:8080/INSTAGRAMALIKE/' + type + '/' + tagname;
	} else if(tagname == null && type === 'self') {
		$('#page-name').text('Profile');
		$('.content__subtitle').html('');
		
		dataURL = 'http://localhost:8080/INSTAGRAMALIKE/users/self?userid=' + $userID;
	} else if(type === 'other') {
		$('#page-name').text(tagname.data('username'));
		$('.content__subtitle').html('');
		console.log("user:"+ tagname.data('username') + "id" + tagname.data('id'));
		dataURL = 'http://localhost:8080/INSTAGRAMALIKE/users/self?userid=' + tagname.data('id');
	}
	
	
	$.ajax({
        type: 'GET',
        dataType: 'json',
        url: dataURL
    })
    .done(function(data) {
        
        if (data != undefined && data != "Error" ) {
        	
        	if (data.users != undefined) {
        		var $dataInsta = data.users;
        		
        		$.each( $dataInsta, function(key, dados) {
            		var isLiked = '';
            		
            		var user = {
            			id: dados.id,
            			avatar: dados.photoFile,
            			username: dados.username
                    };

            		var addPhotos = $('#container-photos').append(' <div class="col-md-3 col-sm-4 col-xs-6 section-row container-photos__item">'+
                            '<div class="photo-wrapper" data-id="' + user.id  + '" data-username="' + user.username + '">'+
                            	'<img class="photo" src="data:image/jpeg;base64,' + user.avatar + '" />'+
                                '<div class="photo__info">' + 
                                    '<div class="photo__username">' + user.username + '</div>'+
                                 '</div>'+
                            '</div>'+
                        '</div>');
            		
            		
            	});
            	// click na foto
                $('.photo-wrapper').on('click', function() {
                	getData($(this), 'other');
                });
        	} else {
        		var $dataInsta = data.photos;
                
            	$.each( $dataInsta, function(key, dados) {
            		var isLiked = '';
            		
            		var photo = {
            			date: dados.date,
            			id: dados.id,
            			ownerid: dados.ownerId,
            			ownerusername: dados.ownerUsername,
            			photo: dados.photo,
            			tags: dados.tags,
            			likes: dados.likes,
            			comments: dados.comments,
            			views: dados.views
                    };
            		
            		var contLikes = 0;
            		
            		if (photo.likes !== undefined) {
            			for (var i = 0; i < photo.likes.length; i++) {
            				if (photo.likes[i] === $userID) {
    	        				isLiked = ' photo__likes--on';
    	        			}
    	        			contLikes++;
            			}
            		}
            		
            		var addPhotos = $('#container-photos').append(' <div class="col-md-3 col-sm-4 col-xs-6 section-row container-photos__item">'+
                            '<div class="photo-wrapper" data-owner-id="' + photo.ownerusername  + '" data-owner-name="' + photo.ownerusername  + '" data-id="' + photo.id +'" data-numlikes="' + contLikes + '" data-numcomments="' + photo.comments + '" data-numviews="' + photo.views + '">'+
                            	'<img class="photo" src="data:image/jpeg;base64,' + photo.photo + '" />'+
                                '<div class="photo__info">' + 
                                    '<div class="photo__likes' + isLiked + '">' + contLikes + '</div>'+
                                    '<div class="photo__comments">' + photo.comments + '</div>'+
                                    '<div class="photo__views">' + photo.views + '</div>'+
                                 '</div>'+
                            '</div>'+
                        '</div>');
            		
            		
            	});
            	// click na foto
                $('.photo-wrapper').on('click', function() {
                    openPhoto($(this));
                });
                
                //click like
            	$('.photo__likes').on('click', function(e) {
            		e.stopPropagation();
            		//e.stopImmediatePropagation();
            		postLike($(this));
            	});
        	}
        }
    })
    .fail(function(data) {
        console.log("ERRO!");
    });
}

function uploadPhoto() {
	$('#modal-file').modal('show');
}

(function($){
	// get photos of user
	getData(null, 'self');
	
	// search
	$('#search-tag').on('keypress', function(e) {
        if(e.which == 13) {
    	    getData($(this).val(), 'tags');
        }
    });
	
	// Upload photo
	$('.upload-photo').on('click', function() {
		uploadPhoto();
    });
})(jQuery);