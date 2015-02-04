function constructModal( user, photo, usersComments, numLikes ) {
	var modal = '';

    modal += '<div class="modal-body clearfix">';

    // content body
    modal += '<img class="modalPhoto" src="' + photo + '" />';

    if (usersComments != null) {

    	modal += '<div class="comments">';

	    for (var i = 0; i < usersComments.length; i++) {
	    	modal += '<div class="user">';
	    	modal += '<a href="user.html?id=' + usersComments[i]['id'] + '">';
	    	modal += '<img class="photoUser" src="' + usersComments[i]['photo'] + '" alt="' + usersComments[i]['username'] + '" />';
	    	modal += '</a>';
	    	modal += '<a class="userLink" target="_blank" href="user.html?id=' + usersComments[i]['id'] + '">' + usersComments[i]['username'] + '</a>';
	    	modal += '<p class="userComment">' + usersComments[i]['comment'] + '</p>';
	    	modal += '</div>';
	    }

	    modal += '</div>';
	}

    modal += '</div>';
    // close body

  	modal += '<div class="mFooter">';
    
    // content footer
    modal += '<div class="userPost">';
    modal += '<a target="_blank" href="user.html?id=' + user['id'] + '">';
    modal += '<img class="userPostPhoto" src="' + user['photo'] + '" />';
    modal += '</a>';
    modal += '<a target="_blank" class="userPostName" href="user.html?id=' + user['id'] + '">' + user['username'] + '</a>';
    modal += '</div>';

    modal += '<div class="photo__likes photo__likes">';
    modal += numLikes;
    modal += '</div>';

	return modal;
}

function openPopup( id, arrayData ) {

	for (var i = 0; i < arrayData.length; i++) {

		var getId = arrayData[i].id;

		if (id == getId) {
			// user
			var user = [];
			user['username'] = arrayData[i].user.username;
			user['photo'] = arrayData[i].user.profile_picture;
			user['id'] = arrayData[i].user.id;

			// photo
			var photo = arrayData[i].images.standard_resolution.url;

			// comments
			var countComments = arrayData[i].comments.count;
			var fArrayComments = null;

			if (countComments > 0) {
				var arrayComments = arrayData[i].comments.data;
				fArrayComments = [];

				for (var j = 0; j < arrayComments.length; j++) {
					fArrayComments[j] = [];
					fArrayComments[j]['username'] = arrayComments[j].from.username;
					fArrayComments[j]['photo'] = arrayComments[j].from.profile_picture;
					fArrayComments[j]['comment'] = arrayComments[j].text;
					fArrayComments[j]['id'] = arrayComments[j].from.id;
				}
			}

			// likes
			var numLikes = arrayData[i].likes.count;

			var modal = constructModal( user, photo, fArrayComments, numLikes );

			$('#mContent').html('');
			$('#mContent').append(modal);
			$('.modal').modal('show');
		}
	}
}